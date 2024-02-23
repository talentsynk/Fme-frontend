
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "support",
  description: "support page for FME",
};


// the first page on the fme dashboard

export default function Home() {
    return (
      <>
        <h1>Hello world, FME support page here</h1>
      </>
    );
  }