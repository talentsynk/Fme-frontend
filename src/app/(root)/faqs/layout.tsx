import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Faqs",
  description: "Have questions about NASIC? We have answers",
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