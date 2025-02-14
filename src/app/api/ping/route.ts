import { NextRequest, NextResponse } from "next/server";

// Use endpoint as '<PROTOCOL>/<URL>/api/ping?abc=bhaya'

export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: "Pong!",
    query: req.nextUrl.searchParams.get("abc"),
  });
}
