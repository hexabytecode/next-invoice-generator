import { NextResponse } from "next/server";
import { createInvoice } from "@/services/invoiceDbService";
import { generateInvoicePdfBuffer } from "@utils/pdfGenerator";
import { uploadInvoiceToS3 } from "@/services/storageService";
import { sendInvoiceEmail } from "@/services/emailService";
import logger from "@utils/logger";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const invoice = await createInvoice(body);
    const pdfBuffer = generateInvoicePdfBuffer(invoice);
    const pdfUrl = await uploadInvoiceToS3(invoice, pdfBuffer);
    await sendInvoiceEmail(invoice, pdfBuffer);

    return NextResponse.json({ success: true, invoice, pdfUrl });
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
