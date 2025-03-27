import { CustomerDetails } from "@/components/invoice-form/CustomerDetails";
import { ItemDetails } from "@/components/invoice-form/ItemDetails";
import { TransportDetails } from "@/components/invoice-form/TransportDetails";
import { InvoiceConfirmation } from "@/components/invoice-form/InvoiceConfirmation";

export const steps = [
  { id: 1, title: "Customer Details", component: CustomerDetails },
  { id: 2, title: "Item Details", component: ItemDetails },
  { id: 3, title: "Transport Details", component: TransportDetails },
  { id: 4, title: "Invoice Confirmation", component: InvoiceConfirmation },
];

export const stepsLength = steps.length;
