import { NextResponse } from "next/server";
import { createInvoice, filterInvoices } from "@/services/invoiceDbService";
import { generateInvoiceDocBuffer } from "@utils/docxGenerator";
import { uploadInvoiceToS3 } from "@/services/storageService";
import { sendInvoiceEmail } from "@/services/emailService";
import { logger } from "@utils/logger";

export async function GET() {
  // const { searchParams } = new URL(req.url);
  // const filter = searchParams.get("filter");

  try {
    // const parsedFilter = filter ? JSON.parse(filter) : {};
    const invoices = await filterInvoices({});
    return NextResponse.json(invoices);
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
    const invoice = await createInvoice(body);
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
