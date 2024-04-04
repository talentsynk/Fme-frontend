import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/provider/Provider";

export const metadata: Metadata = {
  title: "Home",
  description: "This is a skills database platform powered by coderina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
