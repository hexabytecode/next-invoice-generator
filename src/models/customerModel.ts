import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    homeAddress: { type: String, required: true },
    workAddress: { type: String, required: true },
    gst: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
  },
  { timestamps: true }
);

const Customer =
  mongoose.models.Customer ||
  mongoose.model("Customer", CustomerSchema, "customers");
export default Customer;
