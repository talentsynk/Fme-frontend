
// dashboard root-layout


// authentication root-layout

import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Dashboard layout",
  description: "skill database platform dashboards powered by coderina",
};

export default function DashboardRootLayout({
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
