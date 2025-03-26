"use client";

import { useStore } from "@/store/invoiceStore";
import { InvoiceType } from "@/types/invoiceTypes";
import { StepProgress } from "@/components/ui/stepProgress";
import { steps, stepsLength } from "@/constants/steps";

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
    if (step < stepsLength) setStep(step + 1);
    else if (step == stepsLength) {
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-6 shadow-lg rounded-2xl">
        {/* Step Progress Bar */}
        <StepProgress />

        {/* Form Component */}
        {StepComponent ? (
          <StepComponent handleNext={handleNext} handleBack={handleBack} />
        ) : (
          <span className="text-red-500">Something went wrong!</span>
        )}
      </div>
    </div>
  );
}
