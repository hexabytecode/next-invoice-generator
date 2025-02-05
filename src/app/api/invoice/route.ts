import { NextRequest, NextResponse } from "next/server";

interface Invoice {
  id: number;
  name: string;
}

// Would be eventually swapped for noSQL DB
const invoices: Invoice[] = [{ id: 1, name: "invoice #1" }];

export async function GET() {
  return NextResponse.json(invoices);
}

export async function POST(req: NextRequest) {
  const newInvoice = await req.json();
  invoices.push({ id: invoices.length + 1, ...newInvoice });
  return NextResponse.json(invoices);
}
