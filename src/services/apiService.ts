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

export async function fetchInvoices(filter: string) {
  try {
    const { data } = await axios.get(
      `/api/invoices?filter=${encodeURIComponent(filter)}`
    );
    const { invoices } = data;
    return invoices;
  } catch (error) {
    console.error("Failed to fetch invoices:", error);
  }
}
