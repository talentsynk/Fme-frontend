import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Login",
  description: "login to account",
};

export default function ClientLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>{children}</>
    )
  }
  