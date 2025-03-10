// src/models/invoiceModel.ts
import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  item_no: { type: Number, required: true },
  item_name: { type: String, required: true },
  item_hsn: { type: Number, required: true },
  item_qty: { type: Number, required: true },
  item_unitWeight: { type: Number, required: true },
  item_unitRate: { type: Number, required: true },
  item_cost: { type: Number, required: true },
});

const InvoiceSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    buyer_name: { type: String, required: true },
    buyer_homeAddress: { type: String, required: true },
    buyer_workAddress: { type: String, required: true },
    buyer_gst: { type: String, required: true },
    buyer_contact: { type: Number, required: true },
    transport_name: { type: String, required: true },
    transport_gst: { type: String, required: true },
    invoice_no: { type: String, required: true },
    invoice_date: { type: String, required: true },
    items: { type: [ItemSchema], required: true },
    subtotal_cost: { type: Number, required: true },
    cgst_cost: { type: Number, required: true },
    sgst_cost: { type: Number, required: true },
    total_cost: { type: Number, required: true },
    totalCost_toWords: { type: String, required: true },
  },
  { timestamps: true }
);

InvoiceSchema.index({ user_id: 1, invoice_no: 1 }, { unique: true });

const Invoice =
  mongoose.models.Invoice ||
  mongoose.model("Invoice", InvoiceSchema, "invoices");
export default Invoice;
