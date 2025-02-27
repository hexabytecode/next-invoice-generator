import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "VyaparBill - Simplify Your Billing",
  description:
    "VyaparBill helps businesses manage invoices, track expenses, and streamline their billing process with ease.",
  keywords: ["billing", "invoicing", "business management", "VyaparBill"],
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
