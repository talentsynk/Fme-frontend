
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "dashboard",
  description: "dashboard onboarding page for users",
};


// the first page on the fme dashboard

export default function Home() {
    return (
      <>
        <h1>Hello world, FME Dashboard landing page here</h1>
      </>
    );
  }