export interface InvoiceType {
  user_id: string;
  buyer_name: string;
  buyer_homeAddress: string;
  buyer_workAddress: string;
  buyer_gst: string;
  buyer_contact: string;
  transport_name: string;
  transport_gst: string;
  invoice_no: string;
  invoice_date: Date;
  items: {
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
  status: boolean;
}

export interface InvoiceStore {
  step: number;
  setStep: (step: number) => void;
  invoice: Partial<InvoiceType>;
  setInvoice: (invoice: Partial<InvoiceType>) => void;
  clearInvoice: () => void;
  isNextDisabled: boolean;
  isBackDisabled: boolean;
}

export interface FilterQueryType {
  user_id: string;
  created_at?: { $gte: Date };
  status?: string;
  total_cost?: { $gte?: number; $lte?: number };
}
