"use client";
import "../globals.css";
import Head from "next/head";
import {
  CoatOfArm,
  CoderinaLogo,
  FormStyles,
  RecoveryPageStyles,
} from "./style";
import Image from "next/image";
import { EmailIcon } from "@/components/icons/recovery";

export default function AccountRecovery() {
  return (
    <>
      <Head>
        <title>dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <RecoveryPageStyles>
        <div className="head">
          <CoatOfArm>
            <Image
              width={110}
              height={110}
              alt="coat of arm"
              src="/images/coatofarm.svg"
            />
          </CoatOfArm>

          <div className="form">
          <FormStyles>
            <div className="backbtn">Backbtn here</div>
            <div className="form-head">
              <h3>Reset Password</h3>
              <p>
                Enter your e-mail address and instructions would be sent on how
                to reset your password
              </p>
            </div>
            <div className="form-input">
              <div className="form-ele">
                <span>Email</span>
                <div className="inp">
                  <input type="email" name="email" id="" />
                  <div className="abs">
                    <EmailIcon />
                  </div>
                </div>
                <p className="error-msg">
                  The e-mail is not registered on this portal
                </p>
              </div>
            </div>
            <div className="btn">
              <button type="submit">Send mail</button>
            </div>
          </FormStyles>
          </div>
        </div>

        <div className="pc">
          <p>Powered by</p>
          <CoderinaLogo>
            <Image
              width={152}
              height={33}
              alt="coderina logo"
              src="/images/coderina.png"
            />
          </CoderinaLogo>
        </div>
      </RecoveryPageStyles>
    </>
  );
}
