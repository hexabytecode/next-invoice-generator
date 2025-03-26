import { useStore } from "@/store/invoiceStore";
import { steps } from "@/constants/steps";

export const StepProgress = () => {
  const { step } = useStore();

  return (
    <>
      <div className="flex justify-between mb-6">
        {steps.map((s, index) => (
          <div
            key={s.id}
            className={`flex-1 h-2 rounded-full mx-1 transition-all ${
              step > index + 1
                ? "bg-green-500"
                : step === index + 1
                ? "bg-blue-500"
                : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </>
  );
};
