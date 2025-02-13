import { sgMail } from "@/config/email";
import { InvoiceType } from "../types/invoiceTypes";

export async function sendInvoiceEmail(invoice: InvoiceType) {
  const msg = {
    to: "recipient@example.com",
    from: "your-email@example.com",
    subject: `Invoice ${invoice.invoice_no}`,
    text: `Dear ${invoice.buyer_name}, your invoice total is ${invoice.total_cost}.`,
    html: `<p>Dear ${invoice.buyer_name}, your invoice total is <strong>${invoice.total_cost}</strong>.</p>`,
  };

  await sgMail.send(msg);
}
