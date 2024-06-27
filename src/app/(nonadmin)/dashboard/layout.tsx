// dashboard root-layout
import { UserDashboardLayout } from "@/components/layout/dashboardlayout";
import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Learn about the skills database platform dashboards powered by coderina",
};

export default function ServerSideLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserDashboardLayout>{children}</UserDashboardLayout>
    </>
  );
}
