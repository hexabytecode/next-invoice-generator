import { z } from "zod";
import { Validator } from "format-utils";

export const CustomerDetailsSchema = z.object({
  buyer_name: z.string().min(1, "Buyer name is required"),
  buyer_homeAddress: z.string().min(1, "Home address is required"),
  buyer_workAddress: z.string().min(1, "Work address is required"),
  buyer_gst: z
    .string()
    .min(15, "GST number must be 15 characters")
    .refine((value) => Validator.gst(value), "Invalid GST number"),
  buyer_contact: z
    .number()
    .positive("Contact number must be positive")
    .refine(
      (value) => Validator.mobile(value.toString()),
      "Invalid contact number"
    ),
});

export const TransportDetailsSchema = z.object({
  transport_name: z.string().min(1, "Transport name is required"),
  transport_gst: z
    .string()
    .min(15, "GST number must be 15 characters")
    .refine((value) => Validator.gst(value), "Invalid GST number"),
});

export const ItemDetailsSchema = z.object({
  items: z
    .array(
      z.object({
        item_no: z.number().positive(),
        item_name: z.string().min(1),
        item_hsn: z.number().positive(),
        item_qty: z.number().positive(),
        item_unitWeight: z.number().positive(),
        item_unitRate: z.number().positive(),
        item_cost: z.number().positive(),
      })
    )
    .min(1, "At least one item is required"),
});

export const InvoiceConfirmationSchema = z.object({
  invoice_no: z.string().min(1, "Invoice number is required"),
  invoice_date: z.string().date(),
  subtotal_cost: z.number().positive(),
  cgst_cost: z.number().nonnegative(),
  sgst_cost: z.number().nonnegative(),
  total_cost: z.number().positive(),
  totalCost_toWords: z.string().min(1, "Total cost in words is required"),
  status: z.boolean(),
});
