import AWS from "aws-sdk";
import dotenv from "dotenv";
import { InvoiceType } from "@/types/invoiceTypes";

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function uploadInvoiceToS3(invoice: InvoiceType) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: `invoices/${invoice.invoice_no}.json`,
    Body: JSON.stringify(invoice),
    ContentType: "application/json",
  };

  await s3.upload(params).promise();
}
