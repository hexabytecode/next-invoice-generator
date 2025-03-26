import { InvoiceStore } from "@/types/invoiceTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create<InvoiceStore>()(
  persist(
    (set) => ({
      step: 1,
      isNextDisabled: false,
      isBackDisabled: true,
      setStep: (step) =>
        set({ step, isNextDisabled: step == 5, isBackDisabled: step == 1 }),
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
