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

  /**
   * While invoking this function, I'll be using type assertion & pass the type (used as "T" here) as an argument.
   * This will help me to pass the type of the data that I'm going to pass to the function.
   * handleNext<TypeToBePassed>(data);
   */
  function handleNext<T extends Partial<InvoiceType>>(data: T): void {
    setInvoice(data);
    /**
     * step ranges from [1, length of the steps array]
     * We're setting the StepComponent based off the step value.
     * The confusion happened because step is a 1-based index and the array is 0-based.
     */
    if (step < steps.length) setStep(step + 1);
    else if (step == steps.length - 1) {
      /**
       * This is where I handle the submittion of the multi page form.
       * We can show some Animation, push the user to a different page or do something else.
       * Consoling the data for now
       */
      console.log("Invoice Data: ", data);
    }
  }

  function handleBack() {
    if (step > 0) setStep(step - 1);
  }

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
