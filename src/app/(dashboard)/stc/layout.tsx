import { AccessRestrictionWrapper } from "@/components/layout/dashboardlayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | STC",
  description: "Dashboard for STC account",
};

export default function ServerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AccessRestrictionWrapper userRole="STC" redirectUrl="/admin">
      {children}
    </AccessRestrictionWrapper>
  )
}