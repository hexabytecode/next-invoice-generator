import { s3 } from "../config/storage";
import { env } from "../config/env";
import { InvoiceType } from "../types/invoiceTypes";

export async function uploadInvoiceToS3(invoice: InvoiceType) {
  const params = {
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: `invoices/${invoice.invoice_no}.json`,
    Body: JSON.stringify(invoice),
    ContentType: "application/json",
  };

  await s3.upload(params).promise();
}
