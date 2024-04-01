// authentication root-layout

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin-Login",
  description: "Login into an Admin Account",
};

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  )
}
