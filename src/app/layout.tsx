import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Skills database platform",
  description: "This is a skills database platform powered by coderina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
