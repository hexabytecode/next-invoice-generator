import { s3 } from "../config/storage";
import { env } from "../config/env";
import { InvoiceType } from "../types/invoiceTypes";

async function uploadInvoiceToS3(invoice: InvoiceType, pdfBuffer: Buffer) {
  const params = {
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: `invoices/${invoice.invoice_no}.pdf`,
    Body: pdfBuffer,
    ContentType: "application/pdf",
  };

  const result = await s3.upload(params).promise();
  return result.Location;
}

async function getInvoiceTemplate(): Promise<string> {
  const params = {
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: "template/invoice_template.docx",
  };

  const s3Object = await s3.getObject(params).promise();

  if (!s3Object.Body) {
    throw new Error(
      "Failed to fetch invoice template from S3: Body is undefined"
    );
  }

  return s3Object?.Body?.toString("binary");
}

export { uploadInvoiceToS3, getInvoiceTemplate };
