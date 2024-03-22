// authentication root-layout

import type { Metadata } from "next";
import "../globals.css";
import { AuthLayout } from "@/components/layout/authlayout";

export const metadata: Metadata = {
  title: "authentication",
  description: "authentication process powered by coderina",
};

export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthLayout>{children}</AuthLayout>
    </>
  );
}
