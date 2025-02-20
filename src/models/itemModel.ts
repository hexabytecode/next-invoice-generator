import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    hsn: { type: Number, required: true },
    unitWeight: { type: Number, required: true },
    unitRate: { type: Number, required: true },
  },
  { timestamps: true }
);

const Item =
  mongoose.models.Item || mongoose.model("Item", ItemSchema, "items");
export default Item;
