import Item from "../models/itemModel";
import { ItemType } from "../types/itemTypes";
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

export async function createItem(data: ItemType) {
  await ensureDbConnection();
  try {
    const item = new Item(data);
    const savedItem = await item.save();
    logger.info(`Item created: ${savedItem._id}`);
    return savedItem;
  } catch (error) {
    logger.error(`Error creating item: ${error}`);
    throw error;
  }
}

export async function getItemById(id: string) {
  await ensureDbConnection();
  try {
    const item = await Item.findById(id);
    if (!item) {
      logger.warn(`Item not found: ${id}`);
      throw new Error("Item not found");
    }
    return item;
  } catch (error) {
    logger.error(`Error fetching item: ${error}`);
    throw error;
  }
}

export async function getAllItems() {
  await ensureDbConnection();
  try {
    return await Item.find();
  } catch (error) {
    logger.error(`Error fetching items: ${error}`);
    throw error;
  }
}

export async function deleteItem(id: string) {
  await ensureDbConnection();
  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      logger.warn(`Item not found for deletion: ${id}`);
      throw new Error("Item not found");
    }
    logger.info(`Item deleted: ${id}`);
    return deletedItem;
  } catch (error) {
    logger.error(`Error deleting item: ${error}`);
    throw error;
  }
}
