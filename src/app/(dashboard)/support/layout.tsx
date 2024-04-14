

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description: "Having technical issues? Contact us for support",
};

export default function ServerSideLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  )
}
