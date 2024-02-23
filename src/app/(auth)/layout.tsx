
// authentication root-layout

import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "authentication layout",
  description: "authentication process powered by coderina",
};

export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
