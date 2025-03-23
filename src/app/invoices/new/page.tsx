"use client";

import { useStore } from "@/store/invoiceStore";
import { CustomerDetails } from "@/components/invoice-form/CustomerDetails";
import { ItemDetails } from "@/components/invoice-form/ItemDetails";
import { TransportDetails } from "@/components/invoice-form/TransportDetails";
import { InvoiceConfirmation } from "@/components/invoice-form/InvoiceConfirmation";
import { InvoiceType } from "@/types/invoiceTypes";

const steps = [
  { id: 1, component: CustomerDetails },
  { id: 2, component: ItemDetails },
  { id: 3, component: TransportDetails },
  { id: 4, component: InvoiceConfirmation },
];

export default function InvoiceFormController() {
  const { step, setStep, setInvoice } = useStore();
  const StepComponent = steps?.[step - 1]?.component;

  console.log("Step:", step);
  console.log("Store state:", { step });
  console.log(StepComponent);

  /**
   *
   * @param data
   * While invoking this function, I'll be using type assertion & pass the type (used as "T" here) as an argument.
   * This will help me to pass the type of the data that I'm going to pass to the function.
   *
   * handleNext<TypeToBePassed>(data);
   */
  function handleNext<T extends Partial<InvoiceType>>(data: T): void {
    setInvoice(data);

    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="space-y-6">
      {StepComponent ? (
        <StepComponent handleNext={handleNext} handleBack={handleBack} />
      ) : (
        <span>Something went wrong!</span>
      )}
    </div>
  );
}
