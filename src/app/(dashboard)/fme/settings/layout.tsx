

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage FME settings",
};

export default function SettingsClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  )
}
