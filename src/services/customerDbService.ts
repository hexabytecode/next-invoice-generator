import Customer from "../models/customerModel";
import { CustomerType } from "../types/customerTypes";
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

export async function createCustomer(data: CustomerType) {
  await ensureDbConnection();
  try {
    const customer = new Customer(data);
    const savedCustomer = await customer.save();
    logger.info(`Customer created: ${savedCustomer._id}`);
    return savedCustomer;
  } catch (error) {
    logger.error(`Error creating customer: ${error}`);
    throw error;
  }
}

export async function getCustomerById(id: string) {
  await ensureDbConnection();
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      logger.warn(`Customer not found: ${id}`);
      throw new Error("Customer not found");
    }
    return customer;
  } catch (error) {
    logger.error(`Error fetching customer: ${error}`);
    throw error;
  }
}

export async function getAllCustomers() {
  await ensureDbConnection();
  try {
    return await Customer.find();
  } catch (error) {
    logger.error(`Error fetching customers: ${error}`);
    throw error;
  }
}

export async function deleteCustomer(id: string) {
  await ensureDbConnection();
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      logger.warn(`Customer not found for deletion: ${id}`);
      throw new Error("Customer not found");
    }
    logger.info(`Customer deleted: ${id}`);
    return deletedCustomer;
  } catch (error) {
    logger.error(`Error deleting customer: ${error}`);
    throw error;
  }
}
