import { NextResponse } from "next/server";
import {
  createItem,
  getItemById,
  getAllItems,
  deleteItem,
} from "@/services/itemDbService";
import { logger } from "@utils/logger";

export async function POST(req: Request) {
  const body = await req.json();
  if (!body)
    return NextResponse.json(
      { success: false, message: "Request body is required" },
      { status: 400 }
    );

  try {
    const item = await createItem(body);
    return NextResponse.json({ success: true, item });
  } catch (error) {
    const err = error as Error;
    logger.error(`Error creating item: ${err}`);
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
      const item = await getItemById(id);
      return NextResponse.json({ success: true, item });
    }
    const items = await getAllItems();
    return NextResponse.json({ success: true, items });
  } catch (error) {
    const err = error as Error;
    logger.error(`Error fetching item(s): ${err}`);
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
    await deleteItem(id);
    return NextResponse.json({ success: true, message: "Item deleted" });
  } catch (error) {
    const err = error as Error;
    logger.error(`Error deleting item: ${err}`);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
