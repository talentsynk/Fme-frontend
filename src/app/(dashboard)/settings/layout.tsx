

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage User settings",
};

export default function ServerSideLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  )
}
