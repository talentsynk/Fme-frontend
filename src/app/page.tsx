import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home",
  description: "General Landing Page",
};

export default function Home() {
    return (
      <>
        <h1>Hello world, This is the Landing Page</h1>
      </>
    );
  }