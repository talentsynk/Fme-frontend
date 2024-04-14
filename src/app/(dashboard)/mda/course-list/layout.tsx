import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses-List",
  description: "For MDA to Manage its Courses",
};

export default function ServerSideLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
