import { InvoiceStore } from "@/types/invoiceTypes";
import { create } from "zustand";

export const useStore = create<InvoiceStore>((set) => ({
  invoice: {},
  setInvoice: (invoice) =>
    set((state) => ({ invoice: { ...state.invoice, ...invoice } })),
  clearInvoice: () => set({ invoice: {} }),
}));
