
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "dashboard",
  description: "dashboard for setting courses",
};


// the first page on the fme dashboard

export default function Home() {
    return (
      <>
        <h1>Hello world, FME Course lists</h1>
      </>
    );
  }