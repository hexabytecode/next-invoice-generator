import { NextResponse } from "next/server";
import { s3 } from "@/config/storage";

export async function GET() {
  try {
    const result = await s3.listBuckets().promise();
    return NextResponse.json({ success: true, buckets: result.Buckets });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
