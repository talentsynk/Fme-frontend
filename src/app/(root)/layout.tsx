// non-Auth root-layout
"use client";
import "../globals.css";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { RootHeader } from "@/components/root/header/header";
import { RootFooter } from "@/components/root/footer/footer";

// client layout comp unlike other ones because there's no meta data here

export default function ServerSideLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // set cookie to empty string for ordinary viewers by default so they can't view protected pages
  useEffect(() => {
    Cookies.set("userRole", "");
    Cookies.set("token", "");
  });
  return (
    <main>
      <RootHeader />
      <>{children}</>
      <RootFooter />
    </main>
  );
}
