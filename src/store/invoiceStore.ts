import { InvoiceStore } from "@/types/invoiceTypes";
import { create } from "zustand";

export const useStore = create<InvoiceStore>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  invoice: JSON.parse(localStorage.getItem("invoiceFormData") ?? "{}"),
  setInvoice: (invoice) => {
    set((state) => ({ invoice: { ...state.invoice, ...invoice } }));
    localStorage.setItem("invoiceFormData", JSON.stringify(invoice));
  },
  clearInvoice: () => {
    set({ invoice: {} });
    localStorage.removeItem("invoiceFormData");
  },
}));
