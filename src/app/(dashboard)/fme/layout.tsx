import { AccessRestrictionWrapper } from "@/components/layout/dashboardlayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | FME",
  description: "Dashboard for FME account",
};

export default function ServerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AccessRestrictionWrapper userRole="FME" redirectUrl="/admin">
      {children}
    </AccessRestrictionWrapper>
  )
}