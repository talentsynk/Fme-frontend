
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "home",
  description: "dashboard onboarding page for users",
};

// the first page on the mda dashboard

export default function Home() {
    return (
      <>
        <h1>Hello world, MDA Dashboard landing page here</h1>
      </>
    );
  }