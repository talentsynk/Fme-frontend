import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Students-List",
  description: "Manage all students",
};

export default function StudentsClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  )
}
