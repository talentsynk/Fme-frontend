
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "stcs",
  description: "FME page for setting STCs",
};


// the first page on the fme dashboard

export default function Home() {
    return (
      <>
        <h1>Hello world, FME page for setting STCs</h1>
      </>
    );
  }