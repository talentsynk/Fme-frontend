import { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "New Password",
  description: "Change your old password",
};

export default function AccountRecovery() {
    return (
      <>
        <h1>Hello world, Setup your new password here</h1>
      </>
    );
  }