import { NextResponse } from "next/server";
import { createInvoice } from "@/services/invoiceDbService";
import { generateInvoiceDocBuffer } from "@utils/docxGenerator";
import { uploadInvoiceToS3 } from "@/services/storageService";
import { sendInvoiceEmail } from "@/services/emailService";
import { logger } from "@utils/logger";
import { fetchUserDetails } from "@/services/userService";
import { hashUserId } from "@utils/hash";

/**
 * REQUIREMENT
 *
 * 1. GET ALL INVOICES - FOR A SPECIFIC USER
 * 2. GET ALL INVOICES BASED ON FILTERS (LIKE CREATED DATE OR INVOICE DATE) - FOR A SPECIFIC USER
 * 3. EDIT 1 INVOICE - FOR A SPECIFIC USER WITH SPECIFIC INVOICE_ID
 * 4. DELETE 1 INVOICE - FOR A SPECIFIC USER WITH SPECIFIC INVOICE_ID
 */

export async function GET() {
  try {
    const { id } = await fetchUserDetails();
    const hashedUserId = hashUserId(id);
    console.log("hashedUserId: ", hashedUserId);
    /**
     * Pass this "user_id" while checking in the DB - this might require me pushing user_id in the db - which can cause an issue.
     * Maybe I can excrypt this userID before pushing in DB if necessary
     * Use this hashedUserId further ahead - add in DB
     */
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
