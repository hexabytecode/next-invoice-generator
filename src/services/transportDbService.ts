import Transport from "../models/transportModel";
import { TransportType } from "../types/transportTypes";
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

export async function createTransport(data: TransportType) {
  await ensureDbConnection();
  try {
    const transport = new Transport(data);
    const savedTransport = await transport.save();
    logger.info(`Transport created: ${savedTransport._id}`);
    return savedTransport;
  } catch (error) {
    logger.error(`Error creating transport: ${error}`);
    throw error;
  }
}

export async function getTransportById(id: string) {
  await ensureDbConnection();
  try {
    const transport = await Transport.findById(id);
    if (!transport) {
      logger.warn(`Transport not found: ${id}`);
      throw new Error("Transport not found");
    }
    return transport;
  } catch (error) {
    logger.error(`Error fetching transport: ${error}`);
    throw error;
  }
}

export async function getAllTransports() {
  await ensureDbConnection();
  try {
    return await Transport.find();
  } catch (error) {
    logger.error(`Error fetching transports: ${error}`);
    throw error;
  }
}

export async function deleteTransport(id: string) {
  await ensureDbConnection();
  try {
    const deletedTransport = await Transport.findByIdAndDelete(id);
    if (!deletedTransport) {
      logger.warn(`Transport not found for deletion: ${id}`);
      throw new Error("Transport not found");
    }
    logger.info(`Transport deleted: ${id}`);
    return deletedTransport;
  } catch (error) {
    logger.error(`Error deleting transport: ${error}`);
    throw error;
  }
}
