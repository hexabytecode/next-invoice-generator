import { InvoiceStore } from "@/types/invoiceTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create<InvoiceStore>()(
  persist(
    (set) => ({
      step: 0,
      setStep: (step) => set({ step }),
      invoice: {},
      setInvoice: (invoice) => {
        set((state) => ({ invoice: { ...state.invoice, ...invoice } }));
      },
      clearInvoice: () => {
        set({ invoice: {} });
      },
    }),
    { name: "invoiceStore" }
  )
);
