import { NextResponse } from "next/server";
import {
  createCustomer,
  getCustomerById,
  getAllCustomers,
  deleteCustomer,
} from "@/services/customerDbService";
import { logger } from "@utils/logger";

export async function POST(req: Request) {
  const body = await req.json();
  if (!body)
    return NextResponse.json(
      { success: false, message: "Request body is required" },
      { status: 400 }
    );

  try {
    const customer = await createCustomer(body);
    return NextResponse.json({ success: true, customer });
  } catch (error) {
    const err = error as Error;
    logger.error(`Error creating customer: ${err}`);
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
      const customer = await getCustomerById(id);
      return NextResponse.json({ success: true, customer });
    }
    const customers = await getAllCustomers();
    return NextResponse.json({ success: true, customers });
  } catch (error) {
    const err = error as Error;
    logger.error(`Error fetching customer(s): ${err}`);
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
    await deleteCustomer(id);
    return NextResponse.json({ success: true, message: "Customer deleted" });
  } catch (error) {
    const err = error as Error;
    logger.error(`Error deleting customer: ${err}`);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
