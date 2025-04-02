"use client";

import { useState } from "react";
import { InvoiceTable } from "@/components/ui/invoiceTable";
import { FilterBar } from "@/components/filterBar";
import { SkeletonTable } from "@/components/ui/skeletonTable";
import { useQuery } from "@tanstack/react-query";
import { fetchInvoices } from "@/services/apiService";

export default function Invoices() {
  const [filter, setFilter] = useState("7");

  const { data: invoices, isLoading } = useQuery({
    queryKey: ["invoices", filter],
    queryFn: () => fetchInvoices(filter),
  });

  return (
    <div className="my-4 p-4 flex flex-col justify-center">
      <FilterBar filter={filter} setFilter={setFilter} />
      {isLoading ? (
        <SkeletonTable count={5} />
      ) : (
        <InvoiceTable invoices={invoices} />
      )}
    </div>
  );
}
