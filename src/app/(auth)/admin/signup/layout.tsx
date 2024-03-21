// authentication root-layout

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
  description: "Create an Admin Account",
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
