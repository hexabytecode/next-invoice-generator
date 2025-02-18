import Invoice from "../models/invoiceModel";
import { InvoiceType } from "../types/invoiceTypes";
import { connectDb } from "@/config/db";
import { logger } from "@utils/logger";

async function ensureDbConnection() {
  try {
    await connectDb();
  } catch (error) {
    logger.warn("Database is not connected yet. Retrying...");
    throw error;
  }
}

export async function createInvoice(data: InvoiceType) {
  await ensureDbConnection();
  try {
    const invoice = new Invoice(data);
    const savedInvoice = await invoice.save();
    logger.info(`Invoice created: ${savedInvoice._id}`);
    return savedInvoice;
  } catch (error) {
    logger.error(`Error creating invoice: ${error}`);
    throw error;
  }
}

export async function getInvoiceById(id: string) {
  await ensureDbConnection();
  try {
    const invoice = await Invoice.findById(id);
    if (!invoice) logger.warn(`Invoice not found: ${id}`);
    return invoice;
  } catch (error) {
    logger.error(`Error fetching invoice: ${error}`);
    throw error;
  }
}

export async function getAllInvoices() {
  await ensureDbConnection();
  try {
    return await Invoice.find();
  } catch (error) {
    logger.error(`Error fetching invoices: ${error}`);
    throw error;
  }
}

export async function deleteInvoice(id: string) {
  await ensureDbConnection();
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(id);
    if (!deletedInvoice) {
      logger.warn(`Invoice not found for deletion: ${id}`);
      throw new Error("Invoice not found");
    }
    logger.info(`Invoice deleted: ${id}`);
    return deletedInvoice;
  } catch (error) {
    logger.error(`Error deleting invoice: ${error}`);
    throw error;
  }
}
