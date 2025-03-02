// import { useState, useEffect } from "react";
// import { InvoiceTable } from "@/components/ui/invoiceTable";
// import { FilterOptions } from "@/components/ui/filterOptions";
// import { fetchInvoices } from "@/services/invoiceService";
// import { Skeleton } from "@/components/ui/skeleton";

export default function Invoices() {
  // const [invoices, setInvoices] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [filter, setFilter] = useState("30");

  // useEffect(() => {
  // Send API call on every filter
  // const getInvoices = async () => {
  //   setLoading(true);
  //   const data = await fetchInvoices(filter);
  //   setInvoices(data);
  //   setLoading(false);
  // };
  // getInvoices();
  // }, [filter]);

  return (
    <div className="p-4">
      {/* <FilterOptions filter={filter} setFilter={setFilter} />
      {loading ? (
        <Skeleton count={5} />
      ) : invoices.length === 0 ? (
        <p>No invoices found for the selected period.</p>
      ) : (
        <InvoiceTable invoices={invoices} />
      )} */}
      This is the Invoice page
    </div>
  );
}
