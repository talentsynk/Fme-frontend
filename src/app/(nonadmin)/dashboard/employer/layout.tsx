// authentication root-layout
import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Employer",
  description: "Employer Dashboard powered by coderina",
};

export default function ArtisanRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
