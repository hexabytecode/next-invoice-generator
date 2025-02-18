import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "@utils/logger";

const MONGO_URI = env.MONGO_URI;

let cachedConnection: typeof mongoose | null = null;

export async function connectDb() {
  if (cachedConnection) {
    logger.info("Using cached database connection");
    return cachedConnection;
  }

  try {
    cachedConnection = await mongoose.connect(MONGO_URI, {
      bufferCommands: false, // Disable buffering to prevent unintended behavior
    });

    logger.info(`Connected to MongoDB: ${mongoose.connections[0].db}`);
    return cachedConnection;
  } catch (error) {
    logger.error(`MongoDB connection error: ${error}`);
    throw new Error("Database connection failed");
  }
}
