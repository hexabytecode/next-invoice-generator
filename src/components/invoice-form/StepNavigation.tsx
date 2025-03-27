import { Button } from "../ui/button";
import { useStore } from "@/store/invoiceStore";
import { stepsLength } from "@/constants/steps";
import { ArrowLeft, ArrowRight } from "lucide-react";
interface StepNavigationButtonsProps {
  handleBack?: () => void;
}

export const StepNavigationButtons = ({
  handleBack,
}: StepNavigationButtonsProps) => {
  const { step, isNextDisabled, isBackDisabled } = useStore();

  return (
    <div className="flex justify-end gap-4 mt-6">
      <Button
        disabled={isBackDisabled}
        type="button"
        onClick={handleBack}
        variant="outline"
      >
        <ArrowLeft />
        Back
      </Button>
      <Button disabled={isNextDisabled} type="submit" className="px-6">
        {step === stepsLength ? "Submit" : "Next"}
        <ArrowRight />
      </Button>
    </div>
  );
};
