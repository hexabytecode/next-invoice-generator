import { InvoiceStore } from "@/types/invoiceTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { steps } from "@/constants/steps";

export const useStore = create<InvoiceStore>()(
  persist(
    (set) => ({
      step: 1,
      maxStep: 1,
      isNextDisabled: false,
      isBackDisabled: true,
      setStep: (step) =>
        set((state) => ({
          step,
          maxStep: Math.max(step, state.maxStep),
          isNextDisabled: step == steps.length + 1,
          isBackDisabled: step == 1,
        })),
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
