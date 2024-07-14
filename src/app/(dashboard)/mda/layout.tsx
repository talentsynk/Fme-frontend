import { AccessRestrictionWrapper } from "@/components/layout/dashboardlayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | MDA",
  description: "Dashboard for MDA accounts",
};

export default function ServerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AccessRestrictionWrapper userRole="MDA" redirectUrl="/admin">
      {children}
    </AccessRestrictionWrapper>
  )
}