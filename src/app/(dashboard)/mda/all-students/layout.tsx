import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Students-List",
    description: "For MDA Manage all its students",
  };

export default function ServerSideLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
