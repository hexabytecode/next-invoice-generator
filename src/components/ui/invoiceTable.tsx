"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { InvoiceType } from "@/types/invoiceTypes";

export const InvoiceTable = ({ invoices }: { invoices: InvoiceType[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice #</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice: InvoiceType) => (
          <TableRow key={invoice.invoice_no}>
            <TableCell>{invoice.invoice_no}</TableCell>
            <TableCell>{invoice.buyer_name}</TableCell>
            <TableCell>${invoice.total_cost}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
