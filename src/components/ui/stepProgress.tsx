import { useStore } from "@/store/invoiceStore";
import { steps } from "@/constants/steps";

export const StepProgress = () => {
  const { step, maxStep, setStep } = useStore();

  return (
    <>
      <div className="flex justify-between mb-6">
        {steps.map((s, index) => {
          const stepNumber = index + 1;
          const isClickable = stepNumber <= maxStep;

          return (
            <div
              key={s.id}
              className={`flex-1 h-2 rounded-full mx-1 transition-all ${
                step > stepNumber
                  ? "bg-green-500"
                  : step === stepNumber
                  ? "bg-blue-500"
                  : "bg-gray-300"
              } ${
                isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              }`}
              onClick={() => isClickable && setStep(stepNumber)}
            ></div>
          );
        })}
      </div>
    </>
  );
};
