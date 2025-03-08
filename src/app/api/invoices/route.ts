import { NextRequest, NextResponse } from "next/server";
import {
  getAllInvoices,
  getInvoiceByFilter,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "@/services/invoiceDbService";
import { generateInvoiceDocBuffer } from "@utils/docxGenerator";
import { uploadInvoiceToS3 } from "@/services/storageService";
import { sendInvoiceEmail } from "@/services/emailService";
import { logger } from "@utils/logger";
import { fetchUserDetails } from "@/services/userService";
import { hashUserId } from "@utils/hash";
import { InvoiceType } from "@/types/invoiceTypes";

export async function GET(req: NextRequest) {
  try {
    // Sample API with filter -> /invoice?duration=30&status=paid&amountMin=100&amountMax=500
    const filters = Object.fromEntries(
      req.nextUrl?.searchParams.entries() || []
    );

    const { id } = await fetchUserDetails();
    if (!id)
      return NextResponse.json({
        success: false,
        message: "User not found",
        status: 404,
      });

    const hashedUserId = hashUserId(id);

    const invoices = Object.keys(filters).length
      ? await getInvoiceByFilter(hashedUserId, filters)
      : await getAllInvoices(hashedUserId);

    return NextResponse.json({ success: true, invoices });
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = await fetchUserDetails();
    if (!id)
      return NextResponse.json({
        success: false,
        message: "User not found",
        status: 404,
      });

    const hashedUserId = hashUserId(id);
    const data: InvoiceType = { ...body, user_id: hashedUserId };

    const invoice = await createInvoice(data);
    const docBuffer = await generateInvoiceDocBuffer(invoice);
    const docUrl = await uploadInvoiceToS3(invoice, docBuffer);
    await sendInvoiceEmail(invoice, docUrl);

    return NextResponse.json({ success: true, invoice, docUrl });
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req?.json();
    const { invoice_no, ...updates } = body;

    const { id } = await fetchUserDetails();
    if (!id)
      return NextResponse.json({
        success: false,
        message: "User not found",
        status: 404,
      });

    const hashedUserId = hashUserId(id);
    const updatedInvoice = await updateInvoice(
      hashedUserId,
      invoice_no,
      updates
    );

    return NextResponse.json({
      success: true,
      message: "Invoice updated!",
      updatedInvoice,
    });
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    return NextResponse.json({
      success: false,
      message: err.message,
      status: 500,
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { invoice_id } = await req?.json();
    const { id } = await fetchUserDetails();
    if (!id)
      return NextResponse.json({
        success: false,
        message: "User not found",
        status: 404,
      });

    const hashedUserId = hashUserId(id);
    const deletedInvoice = await deleteInvoice(hashedUserId, invoice_id);
    return NextResponse.json({
      success: true,
      message: "Invoice deleted!",
      deletedInvoice,
    });
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    return NextResponse.json({
      success: false,
      message: err.message,
      status: 500,
    });
  }
}
