import dotenv from "dotenv";

dotenv.config();

export const env = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
  AWS_REGION: process.env.AWS_REGION || "ap-south-1",
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || "",
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || "",
  LOG_LEVEL: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI || "",
  INVOICE_RECIPIENTS: process.env.INVOICE_RECIPIENTS,
  INVOICE_SENDER: process.env.INVOICE_SENDER,
};
