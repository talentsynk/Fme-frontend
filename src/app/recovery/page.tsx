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
import { BackBtn } from "@/components/recovery/recovery";
import { useState } from "react";


export default function AccountRecovery() {
  const backFunc = () => {
    console.log("go back");
  };
  const [showOTP, setShowOTP] = useState(false);
  const verifyOtp = () => {
    setShowOTP(true);
  };
  return (
    <>
      <Head>
        <title>account recovery</title>
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
            {!showOTP && (
              <FormStyles>
                <div className="backbtn">
                  <BackBtn backFunction={backFunc} />
                </div>
                <div className="form-head">
                  <h3>Reset Password</h3>
                  <p>
                    Enter your e-mail address and instructions would be sent on
                    how to reset your password
                  </p>
                </div>
                <div className="form-input">
                  <div className="form-ele">
                    <span>E-mail address</span>
                    <div className="inp">
                      <input
                        type="email"
                        name="email"
                        id=""
                        placeholder="Enter Password"
                      />
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
                  <button type="submit" onClick={verifyOtp}>
                    Send mail
                  </button>
                </div>
              </FormStyles>
            )}
            {showOTP && (
              <FormStyles>
                <div className="backbtn">
                  <BackBtn backFunction={backFunc} />
                </div>
                <div className="form-head">
                  <h3>Verify your e-mail address</h3>
                  <p>
                  Input the OTP that was sent to your mail to verify that you own the account 
                  </p>
                </div>
                <div className="form-input">
                  <div className="form-ele">
                    <div className="inp">
                      <p>OTP boxes here</p>
                    </div>
                    <p className="error-msg">
                    OTP is wrong please check your mail to verify it
                    </p>
                  </div>
                </div>
                <div className="btn">
                  <button type="submit">Verify OTP</button>
                </div>
                <div className="btm">
                  <p>Didn’t get OTP in the mail?</p>
                  <button type="button">Resend OTP</button>
                </div>
              </FormStyles>
            )}
          </div>
        </div>

        <div className="flex">
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
