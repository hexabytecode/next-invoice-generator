import dotenv from "dotenv";

dotenv.config();

export const env = {
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || "",
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
  AWS_REGION: process.env.AWS_REGION || "us-east-1",
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || "",
  LOG_LEVEL: process.env.NODE_ENV,
  NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
  MONGO_URI: process.env.MONGO_URI || "",
};
