"use client";

import { useState, useEffect } from "react";
import { InvoiceTable } from "@/components/ui/invoiceTable";
import { FilterBar } from "@/components/filterBar";
import { SkeletonTable } from "@/components/ui/skeletonTable";
import { InvoiceType } from "@/types/invoiceTypes";

export default function Invoices() {
  const [invoices, setInvoices] = useState<InvoiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("7");

  useEffect(() => {
    const getInvoices = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/invoices?filter=${encodeURIComponent(filter)}`
        );
        const { invoices } = await res.json();
        setInvoices(invoices);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      } finally {
        setLoading(false);
      }
    };
    getInvoices();
  }, [filter]);

  return (
    <div className="my-4 p-4 flex flex-col justify-center">
      <FilterBar filter={filter} setFilter={setFilter} />
      {loading ? (
        <SkeletonTable count={5} />
      ) : (
        <InvoiceTable invoices={invoices} />
      )}
    </div>
  );
}
