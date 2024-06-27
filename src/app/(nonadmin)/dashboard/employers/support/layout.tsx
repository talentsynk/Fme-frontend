// dashboard root-layout

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "About",
  description: "Learn about the skills database platform dashboards powered by coderina",
};

export default function ServerSideLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <>
      <>{children}</>
    </>
  );
}
