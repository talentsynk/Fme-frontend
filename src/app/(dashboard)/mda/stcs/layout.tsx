
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "STCs",
  description: "For MDA to Manage its STCs",
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
