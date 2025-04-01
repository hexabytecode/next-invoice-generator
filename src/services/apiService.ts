"use client";

import { InvoiceType } from "@/types/invoiceTypes";
import axios from "axios";

export async function createInvoice(invoiceData: Partial<InvoiceType>) {
  try {
    const response = await axios.post("/api/invoices", invoiceData);
    console.log("Invoice Response:", response.data);
  } catch (error) {
    console.error("Error creating invoice:", error);
  }
}
