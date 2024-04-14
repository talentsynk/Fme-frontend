import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "STCs",
  description: "Manage all STCs",
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
