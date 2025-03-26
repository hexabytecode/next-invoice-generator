import { CustomerDetails } from "@/components/invoice-form/CustomerDetails";
import { ItemDetails } from "@/components/invoice-form/ItemDetails";
import { TransportDetails } from "@/components/invoice-form/TransportDetails";
import { InvoiceConfirmation } from "@/components/invoice-form/InvoiceConfirmation";

export const steps = [
  { id: 1, component: CustomerDetails },
  { id: 2, component: ItemDetails },
  { id: 3, component: TransportDetails },
  { id: 4, component: InvoiceConfirmation },
];
