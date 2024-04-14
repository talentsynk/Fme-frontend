import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses-List",
  description: "For STC to Manage its courses",
};

export default function ServerSideLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
