import mongoose from "mongoose";
import { env } from "./env";
export async function connectDb() {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log(
      "Connected to MongoDB:",
      mongoose.connection.db?.databaseName || "Unknown DB"
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
