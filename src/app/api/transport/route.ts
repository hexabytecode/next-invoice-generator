import { NextResponse } from "next/server";
import {
  createTransport,
  getTransportById,
  getAllTransports,
  deleteTransport,
} from "@/services/transportDbService";
import { logger } from "@utils/logger";

export async function POST(req: Request) {
  const body = await req.json();
  if (!body)
    return NextResponse.json(
      { success: false, message: "Request body is required" },
      { status: 400 }
    );

  try {
    const transport = await createTransport(body);
    return NextResponse.json({ success: true, transport });
  } catch (error) {
    const err = error as Error;
    logger.error(`Error creating transport: ${err}`);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const transport = await getTransportById(id);
      return NextResponse.json({ success: true, transport });
    }
    const transports = await getAllTransports();
    return NextResponse.json({ success: true, transports });
  } catch (error) {
    const err = error as Error;
    logger.error(`Error fetching transport(s): ${err}`);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json(
      { success: false, message: "ID is required" },
      { status: 400 }
    );

  try {
    await deleteTransport(id);
    return NextResponse.json({ success: true, message: "Transport deleted" });
  } catch (error) {
    const err = error as Error;
    logger.error(`Error deleting transport: ${err}`);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
