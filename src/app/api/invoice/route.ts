// src/app/api/invoice/route.ts
import { NextResponse } from "next/server";
import { createInvoice } from "@/services/invoiceService";
import { sendInvoiceEmail } from "@/services/emailService";
import { uploadInvoiceToS3 } from "@/services/storageService";
import logger from "@utils/logger";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const invoice = await createInvoice(body);
    // missing step that would crea
    await uploadInvoiceToS3(invoice);
    await sendInvoiceEmail(invoice);

    return NextResponse.json({ success: true, invoice });
  } catch (error) {
    const err = error as Error; // Type assertion
    logger.error(err.message);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
