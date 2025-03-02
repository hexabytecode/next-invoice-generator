"use server";

import { ActionCard } from "@/components/ui/actionCard";
import { WelcomeBanner } from "@/components/ui/welcomeBanner";

export default async function Dashboard() {
  return (
    <div className="bg-background text-foreground flex flex-col items-center justify-start">
      <main className="p-4 w-full max-w-4xl">
        <WelcomeBanner />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <ActionCard
            id="invoices/new"
            iconName="FilePlus"
            title="Create Invoice"
            description="Quickly create and send new invoices."
            buttonText="Create Invoice"
          />

          <ActionCard
            id="invoices"
            iconName="FileText"
            title="View Invoices"
            description="Manage and track all your invoices in one place."
            buttonText="View Invoices"
          />
        </div>
      </main>
    </div>
  );
}
