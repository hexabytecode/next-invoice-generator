import { InvoiceType } from "../invoiceTypes";

export interface FormChildProps {
  handleNext: <T extends Partial<InvoiceType>>(data: T) => void;
  handleBack: () => void;
}
