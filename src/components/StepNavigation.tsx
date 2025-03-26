import { Button } from "./ui/button";
import { useStore } from "@/store/invoiceStore";
import { steps } from "@/constants/steps";

interface StepNavigationButtonsProps {
  handleBack?: () => void;
}

export const StepNavigationButtons = ({
  handleBack,
}: StepNavigationButtonsProps) => {
  const { step, isNextDisabled, isBackDisabled } = useStore();

  return (
    <div className="flex gap-2">
      <Button disabled={isBackDisabled} type="button" onClick={handleBack}>
        Back
      </Button>
      <Button disabled={isNextDisabled} type="submit">
        {steps.length == step ? "Submit" : "Next"}
      </Button>
    </div>
  );
};
