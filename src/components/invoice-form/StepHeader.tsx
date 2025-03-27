import { steps } from "@/constants/steps";
import { useStore } from "@/store/invoiceStore";

export const StepHeader = () => {
  const { step } = useStore();
  return (
    <h1 className="text-2xl font-bold text-center text-gray-800">
      {steps?.[step - 1]?.title}
    </h1>
  );
};
