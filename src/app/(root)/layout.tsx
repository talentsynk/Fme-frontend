// non-Auth root-layout
"use client";
import { RootLayoutStyles } from "@/components/layout/style";
import "../globals.css";
import Cookies from "js-cookie";
import { useEffect } from "react";


// client layout comp unlike other ones because there's no meta data here

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // set cookie to empty string for ordinary viewers by default so they can't view protected pages
  useEffect(()=>{
    Cookies.set("userRole","");
    Cookies.set("token","");
  })
  return (
    <RootLayoutStyles>
      <div className="header">I am header</div>
      {children}
      <div className="footer">I am footer</div>
    </RootLayoutStyles>
  );
}
