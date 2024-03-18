
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "dashboard",
  description: "dashboard for viewing and setting all students",
};


// the first page on the fme dashboard

export default function Home() {
    return (
      <>
        <h1>Hello world, FME All-students</h1>
      </>
    );
  }