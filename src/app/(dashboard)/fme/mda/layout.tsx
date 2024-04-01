

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MDAs",
  description: "Manage all MDAs",
};

export default function MDAClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  )
}
