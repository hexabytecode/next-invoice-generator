"use client";

import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex justify-between p-4 border-b">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <Button variant="outline">Settings</Button>
      </header>
      <main className="p-4">
        <p>Welcome to your dashboard!</p>
      </main>
    </div>
  );
}
