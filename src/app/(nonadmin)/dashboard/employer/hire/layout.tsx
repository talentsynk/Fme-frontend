import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire Professionals",
  description: "Employer Dashboard powered by coderina",
};

export default function EmployerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
