
// dashboard root-layout

import type { Metadata } from "next";
import "../globals.css";
import { GenericDasboardLayout } from "@/components/layout/dashboardlayout";

export const metadata: Metadata = {
  title: "Dashboard layout",
  description: "skill database platform dashboards powered by coderina",
};

export default function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GenericDasboardLayout>
        {children}
      </GenericDasboardLayout>
    </html>
  );
}
