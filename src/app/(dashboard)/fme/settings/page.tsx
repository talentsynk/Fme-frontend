
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "settings",
  description: "settings for FMEs",
};


// the first page on the fme dashboard

export default function Home() {
    return (
      <>
        <h1>Hello world, FME settings page here</h1>
      </>
    );
  }