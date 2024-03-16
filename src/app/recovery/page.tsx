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
import {
  CheckedIcon,
  EmailIcon,
  FormErrorIcon,
} from "@/components/icons/recovery";
import { BackBtn } from "@/components/recovery/recovery";
import { useEffect, useState } from "react";
import { OtpComp } from "@/components/recovery/otpInput";
import { useRouter } from "next/navigation";
import { ButtonLoader } from "@/components/recovery/style";
import { validateEmail } from "@/utils/validateEmail";

interface Ierror {
  active: boolean;
  text: string;
}
const otpRegex: RegExp = /[a-zA-Z]+.*[^a-zA-Z0-9\s]/;

export default function AccountRecovery() {
  const router = useRouter();
  const backToLogin = () => {
    router.push("/login");
  };

  // For Email
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<Ierror>({
    active: false,
    text: "",
  });

  // handle validation as user types
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // Perform email validation
    if (!validateEmail(value)) {
      setEmailError({ active: true, text: "Invalid email address." });
    } else {
      setEmailError({ active: false, text: "Valid Email" });
    }
  };

  // this function would check using the API provided if the email is in the DB and then send a message, if not in the DB, it returns an error
  const getOtp = () => {
    setShowOTP(true);
  };



  // for otp
  const [showOTP, setShowOTP] = useState(false);
  const [userOtp, setUserOtp] = useState("");
  const [otpError, setOtpError] = useState<Ierror>({ active: false, text: "" });

  // otp button loader state
  const [isLoading, setIsLoading] = useState(false);
  const verifyOtp = () => {
    if (!otpError.active) {
      //when there's no error msg
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        console.log(userOtp);
        router.push("/recovery/newpwd");
      }, 2000);
    }
    // verify using the api values
    // add loader to improve UX
    // if verification is successful, move to next
  };
  useEffect(() => {
    if (userOtp.length > 0) {
      if (userOtp.length < 4) {
        setOtpError({ active: true, text: "Enter complete OTP digits" });
      } else {
        if (otpRegex.test(userOtp)) {
          setOtpError({
            active: true,
            text: "OTP should only contain numbers",
          });
        } else {
          setOtpError({ active: false, text: "" });
        }
      }
    }
  }, [userOtp]);

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
                  <BackBtn backFunction={backToLogin} />
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
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter Email Address"
                        className={emailError.active ? "error-bdr" : ""}
                      />
                      <div className="abs">
                        {emailError.active === false &&
                          emailError.text === "" && <EmailIcon />}
                        {emailError.active === false &&
                          emailError.text !== "" && <CheckedIcon />}
                        {emailError.active === true && <FormErrorIcon />}
                      </div>
                    </div>
                    <p className={emailError.active ? "error-msg" : "correct"}>
                      {emailError.text}
                    </p>
                  </div>
                </div>
                <div className="btn">
                  <button
                    type="submit"
                    onClick={getOtp}
                    disabled={!validateEmail(email)}
                  >
                    Send mail
                  </button>
                </div>
              </FormStyles>
            )}
            {showOTP && (
              <FormStyles>
                <div className="backbtn">
                  <BackBtn backFunction={() => setShowOTP(false)} />
                </div>
                <div className="form-head">
                  <h3>Verify your e-mail address</h3>
                  <p>
                    Input the OTP that was sent to your mail to verify that you
                    own the account
                  </p>
                </div>
                <div className="form-input">
                  <div className="form-ele">
                    <div className="xxx">
                      <OtpComp
                        setUserOtp={setUserOtp}
                        isError={otpError.active}
                      />
                    </div>
                    <p
                      className={
                        otpError.active ? "error-msg center" : "correct center"
                      }
                    >
                      {otpError.active && otpError.text}
                    </p>
                  </div>
                </div>
                <div className="btn">
                  <button
                    type="submit"
                    onClick={verifyOtp}
                    disabled={userOtp.length < 4}
                  >
                    {isLoading ? <ButtonLoader /> : "Verify OTP"}
                  </button>
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
              src="/images/coderina.svg"
            />
          </CoderinaLogo>
        </div>
      </RecoveryPageStyles>
    </>
  );
}
