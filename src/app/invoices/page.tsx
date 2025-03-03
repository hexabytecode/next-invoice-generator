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
          `/api/invoice?filter=${encodeURIComponent(filter)}`
        );
        const data = await res.json();
        setInvoices(data);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      } finally {
        setLoading(false);
      }
    };
    getInvoices();
  }, [filter]);

  return (
    <div className="p-4">
      <FilterBar filter={filter} setFilter={setFilter} />
      {loading ? (
        <SkeletonTable count={5} />
      ) : invoices.length === 0 ? (
        <p>No invoices found for the selected period.</p>
      ) : (
        <InvoiceTable invoices={invoices} />
      )}
    </div>
  );
}
