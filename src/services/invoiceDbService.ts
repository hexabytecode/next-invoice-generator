// src/services/invoiceDbService.ts
import Invoice from "../models/invoiceModel";
import { InvoiceType } from "../types/invoiceTypes";

export async function createInvoice(data: InvoiceType) {
  const invoice = new Invoice(data);
  return await invoice.save();
}

export async function getInvoiceById(id: string) {
  return await Invoice.findById(id);
}

export async function getAllInvoices() {
  return await Invoice.find();
}

export async function deleteInvoice(id: string) {
  return await Invoice.findByIdAndDelete(id);
}
