"use client";
import "../globals.css";
import Head from "next/head";
import {
  CoatOfArm,
  CoderinaLogo,
  FormStyles,
  ImprovisedStyle,
  RecoveryPageStyles,
} from "./style";
import Image from "next/image";
import {
  CheckedIcon,
  EmailIcon,
  FormErrorIcon,
} from "@/components/icons/recovery";
import { BackBtn, CountdownTimer } from "@/components/recovery/recovery";
import { useCallback, useEffect, useState } from "react";
import { OtpComp } from "@/components/recovery/otpInput";
import { useRouter } from "next/navigation";
import { ButtonLoader } from "@/components/recovery/style";
import { validateEmail } from "@/utils/validateEmail";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/redux/hooks/hooks";

export interface Ierror {
  active: boolean;
  text: string;
}
const otpRegex: RegExp = /[a-zA-Z]+.*[^a-zA-Z0-9\s]/;

export default function AccountRecovery() {
  const router = useRouter();
  const backToLogin = () => {
    router.push("/admin");
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
  // sending email loader
  const [isSendLoading, setIsSendLoading] = useState(false);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [hasOtpExpired, setHasOtpExpired] = useState(false);
  // this function would check using the API provided if the email is in the DB and then send a message, if not in the DB, it returns an error
  const getOtp = async () => {
    if (!emailError.active) {
      //when there's no error msg
      try {
        setIsSendLoading(true);
        const { data } = await axios.post(`${BACKEND_URL}/user/otp/request`, {
          Email: email,
        });
        if (data) {
          // comment out later, i am using this to check the otp for testing purposes
          console.log(data)
          Cookies.set("otpRequestTime", new Date().toISOString());
          setCountdownStarted(true);
          setFormStep(1);
          setIsSendLoading(false);
        }
      } catch (error: any) {
        setIsSendLoading(false);
        if (error.response) {
          // if the server responds with an error msg
          setEmailError({
            active: true,
            text: error.response.data.message,
          });
        } else {
          setEmailError({ active: true, text: error.message });
        }
      }
    }
  };

  // form steps
  const [formStep, setFormStep] = useState(0);
  // for otp
  const [userOtp, setUserOtp] = useState("");
  const [otpError, setOtpError] = useState<Ierror>({ active: false, text: "" });

  const dispatch = useAppDispatch();
  // otp button loader state
  const [isLoading, setIsLoading] = useState(false);
  const verifyOtp = async () => {
    if (!otpError.active) {
      //when there's no error msg
      try {
        setIsLoading(true);
        const { data } = await axios.post(`${BACKEND_URL}/user/otp/verify`, {
          Email: email,
          Otp: userOtp,
        });
        if (data) {
          let inSetTime = new Date(new Date().getTime() + 5 * 60 * 1000);
          Cookies.set("otp", "otp is set", { expires: inSetTime });
          Cookies.set("email", email);
          router.push("/recovery/newpwd");
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        if (error.response) {
          // if the server responds with an error msg
          setOtpError({
            active: true,
            text: error.response.data.message,
          });
        } else {
          setOtpError({ active: true, text: error.message });
        }
      }
    }
    // remove Date-fns if there's no particular date-based countdown
  };

  useEffect(() => {
    if (userOtp.length > 0) {
      if (userOtp.length < 5) {
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

  const handleOtpExpiration = useCallback(() => {
    setHasOtpExpired(true);
  }, [setHasOtpExpired]);

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
              priority
            />
          </CoatOfArm>

          <div className="form">
            {formStep == 0 && (
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
                    <label htmlFor="email">E-mail address</label>
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
                    {isSendLoading ? <ButtonLoader /> : "Send mail"}
                  </button>
                </div>
              </FormStyles>
            )}
            {formStep == 1 && (
              <FormStyles>
                <div className="backbtn">
                  <BackBtn
                    backFunction={() => {
                      setFormStep(0);
                      Cookies.remove("otpExpiryTime");
                    }}
                  />
                </div>

                <ImprovisedStyle>
                  <div className="image">
                    <Image
                      alt="check email image"
                      width={144}
                      height={104}
                      sizes="100vw"
                      src="/images/recovery/check_email.svg"
                    />
                  </div>
                  <div className="form-head">
                    <h3>Check your mail</h3>
                    <p>
                      A mail has been sent to {email}. Follow the steps provided
                      in the email to update your password or click back to go
                      to the Login page. The OTP sent expires in 2 mins.
                    </p>
                  </div>
                  <div className="btn">
                    <button type="button" onClick={() => setFormStep(2)}>
                      Next
                    </button>
                  </div>
                </ImprovisedStyle>
                <div className="btm">
                  <p>I Didn’t get the mail?</p>
                  <button type="button" onClick={() => setFormStep(0)}>
                    Resend mail
                  </button>
                </div>
              </FormStyles>
            )}
            {formStep == 2 && (
              <FormStyles>
                <div className="backbtn">
                  <BackBtn
                    backFunction={() => {
                      setFormStep(0);
                      Cookies.remove("otpExpiryTime");
                    }}
                  />
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
                <div className="btn-m">
                  <button
                    type="submit"
                    onClick={verifyOtp}
                    disabled={userOtp.length < 5}
                  >
                    {isLoading ? <ButtonLoader /> : "Verify OTP"}
                  </button>
                </div>
                <div className="btm">
                  <p>
                    {hasOtpExpired
                      ? "OTP has expired!"
                      : "OTP expires shortly!"}
                  </p>
                  <button type="button">
                    {countdownStarted && (
                      <CountdownTimer onExpire={handleOtpExpiration} />
                    )}
                  </button>
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
