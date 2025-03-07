import Invoice from "../models/invoiceModel";
import { InvoiceType } from "../types/invoiceTypes";
import { InvoiceFilter } from "@/types/filterTypes";
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

export async function getInvoiceByFilter(user_id: string, filter: string) {
  await ensureDbConnection();
  try {
    console.log(filter);
    // extract filters from the string
    // find invoices based on filters as well
    const invoice = await Invoice.find({ user_id: user_id });
    // Add error handing => if (!invoice) logger.warn(`Invoice not found: ${id}`);
    return invoice;
  } catch (error) {
    logger.error(`Error fetching invoice: ${error}`);
    throw error;
  }
}

export async function getAllInvoices(user_id: string) {
  await ensureDbConnection();
  try {
    return await Invoice.find({ user_id: user_id });
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

export async function filterInvoices(filters: InvoiceFilter) {
  await ensureDbConnection();
  try {
    const invoices = await Invoice.find(filters);
    if (!invoices.length) {
      logger.warn("No invoices found with the given filters");
    }
    return invoices;
  } catch (error) {
    logger.error(`Error filtering invoices: ${error}`);
    throw error;
  }
}
