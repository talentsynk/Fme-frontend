// authentication root-layout
import "@/app/globals.css";
import { AccessRestrictionWrapper } from "@/components/layout/dashboardlayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Employer",
  description: "Employer Dashboard powered by coderina",
};

export default function ArtisanRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AccessRestrictionWrapper userRole="EMPLOYER" redirectUrl="/auth/login">
      {children}
    </AccessRestrictionWrapper>
  );
}
