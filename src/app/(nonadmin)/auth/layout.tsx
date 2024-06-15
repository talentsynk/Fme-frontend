// authentication root-layout
import "@/app/globals.css";
import type { Metadata } from "next";
import { UserAuthLayout } from "@/components/layout/userAuthLayout";


export const metadata: Metadata = {
  title: "User Authentication",
  description: "authentication process powered by coderina",
};

export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserAuthLayout>{children}</UserAuthLayout>
    </>
  );
}
