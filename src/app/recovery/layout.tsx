import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
     {children}
    </>
  );
}
