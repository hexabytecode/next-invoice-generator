import { s3 } from "../config/storage";
import { env } from "../config/env";
import { InvoiceType } from "../types/invoiceTypes";

export async function uploadInvoiceToS3(
  invoice: InvoiceType,
  pdfBuffer: Buffer
) {
  const params = {
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: `invoices/${invoice.invoice_no}.pdf`,
    Body: pdfBuffer,
    ContentType: "application/pdf",
  };

  const result = await s3.upload(params).promise();
  return result.Location;
}
