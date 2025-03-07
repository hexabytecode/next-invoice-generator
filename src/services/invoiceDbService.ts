import Invoice from "../models/invoiceModel";
import { InvoiceType, FilterQueryType } from "../types/invoiceTypes";
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

export async function getInvoiceByFilter(
  user_id: string,
  filters: Record<string, string>
) {
  await ensureDbConnection();
  try {
    // extract filters from the string
    const filterQuery: FilterQueryType = { user_id };

    // filters duration
    if (filters.duration) {
      const days = parseInt(filters.duration);
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - days);
      filterQuery.created_at = { $gte: fromDate };
    }

    // filters status
    if (filters.status) {
      filterQuery.status = filters.status;
    }

    // filters amount
    if (filters.amountMin) {
      const minAmount = parseFloat(filters.amountMin);
      filterQuery.total_cost = { $gte: minAmount };
    }

    // filters amountMax
    if (filters.amountMax) {
      filterQuery.total_cost = {
        ...filterQuery.total_cost,
        $lte: parseFloat(filters.amountMax),
      };
    }

    // find invoices based on filters as well
    const invoices = await Invoice.find(filterQuery);

    if (!invoices.length) {
      logger.warn(
        `No invoices found for user: ${user_id} with filters: ${JSON.stringify(
          filters
        )}`
      );
    }

    return invoices;
  } catch (error) {
    logger.error(`Error fetching invoice: ${error}`);
    throw error;
  }
}

export async function getAllInvoices(user_id: string) {
  await ensureDbConnection();
  try {
    return await Invoice.find({ user_id });
  } catch (error) {
    logger.error(`Error fetching invoices: ${error}`);
    throw error;
  }
}

export async function deleteInvoice(id: string) {
  await ensureDbConnection();
  // adding user_id check here is necessary
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
  // adding user_id check here is necessary
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
