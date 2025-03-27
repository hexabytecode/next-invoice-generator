import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "VyaparBill - Simplify Your Billing",
  description:
    "VyaparBill helps businesses manage invoices, track expenses, and streamline their billing process with ease.",
  keywords: ["billing", "invoicing", "business management", "VyaparBill"],
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
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen w-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 flex">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
