

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
  description: "Manage all courses",
};

export default function CourseClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  )
}
