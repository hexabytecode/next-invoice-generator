export interface InvoiceType {
  buyer_name: string;
  buyer_homeAddress: string;
  buyer_workAddress: string;
  buyer_gst: string;
  buyer_contact: number;
  transport_name: string;
  transport_gst: string;
  invoice_no: string;
  invoice_date: string;
  items: {
    item_no: number;
    item_name: string;
    item_hsn: number;
    item_qty: number;
    item_unitWeight: number;
    item_unitRate: number;
    item_cost: number;
  }[];
  subtotal_cost: number;
  cgst_cost: number;
  sgst_cost: number;
  total_cost: number;
  totalCost_toWords: string;
}
