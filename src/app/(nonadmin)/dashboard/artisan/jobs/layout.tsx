import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Jobs",
  description: "Artisan Dashboard powered by coderina",
};

export default function ArtisanRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
