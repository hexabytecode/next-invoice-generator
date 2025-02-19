import { sgMail } from "@/config/email";
import { InvoiceType } from "../types/invoiceTypes";
import { env } from "@/config/env";

export async function sendInvoiceEmail(invoice: InvoiceType, pdfUrl: string) {
  try {
    const recipients = env.INVOICE_RECIPIENTS?.split(",") || [];
    if (recipients.length === 0) {
      throw new Error("No recipients defined in environment variables");
    }

    const msg = {
      to: recipients,
      from: process.env.INVOICE_SENDER || "invoices.generation@gmail.com",
      subject: `Pradi Chemica | Invoice ${invoice.invoice_no}`,
      text: `Dear ${invoice.buyer_name}, your invoice total is ₹ ${invoice.total_cost}. You can download your invoice here: ${pdfUrl}`,
      html: `<p>Dear ${invoice.buyer_name}, your invoice total is <strong>${invoice.total_cost}</strong>.</p>
             <p>You can download your invoice <a href="${pdfUrl}" target="_blank">here</a>.</p>`,
    };

    await sgMail.sendMultiple(msg);
  } catch (error) {
    console.log(`Error on sendInvoiceEmail: ${error}`);
  }
}
