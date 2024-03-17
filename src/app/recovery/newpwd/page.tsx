"use client";
import "../../globals.css";
import Head from "next/head";
import {
  CoatOfArm,
  CoderinaLogo,
  FormStyles,
  RecoveryPageStyles,
} from "../style";
import Image from "next/image";
import { BackBtn } from "@/components/recovery/recovery";
import { EyeIcon } from "@/components/icons/recovery";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isStrongPassword } from "@/utils/validatePwd";
import { Ierror } from "../page";

export default function AccountRecovery() {
  const router = useRouter();
  const backFunc = () => {
    router.push("/recovery");
  };
  const [pwd1Error, setPwd1Error] = useState<Ierror>({
    active: false,
    text: "",
  });
  const [pwd2Error, setPwd2Error] = useState<Ierror>({
    active: false,
    text: "",
  });

  const [showPwd1, setShowPwd1] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  const [pwd1, setPwd1] = useState<string>("");
  const [pwd2, setPwd2] = useState<string>("");

  // i need to handle; match, then error handling and correct state handling
  const handlePwd1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwd1(value);
    let msg: string | null = isStrongPassword(value);
    if (pwd2.length > 0) {
      if (pwd2 == value) {
        setPwd2Error({
          active: false,
          text: "Password is a match!",
        });
      } else {
        setPwd2Error({
          active: true,
          text: "Password is not a match!",
        });
      }
    }
    if (msg !== null) {
      setPwd1Error({
        active: true,
        text: msg,
      });
    } else {
      setPwd1Error({
        active: false,
        text: "Password is Strong",
      });
    }
  };
  const handlePwd2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwd2(value);
    if (value == pwd1) {
      setPwd2Error({
        active: false,
        text: "Password is a match!",
      });
    } else {
      setPwd2Error({
        active: true,
        text: "Password is not a match!",
      });
    }
  };
  
  const handleSubmitPwds =()=>{
    console.log(pwd1, pwd2);
  }

  return (
    <>
      <Head>
        <title>New password</title>
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
              <div className="backbtn">
                <BackBtn backFunction={backFunc} />
              </div>
              <div className="form-head">
                <h3>Reset Password</h3>
                <p>
                  Hey there! You are at the finishing line already, set a new
                  unique password for your account.
                </p>
              </div>
              <div className="form-input">
                <div className="form-ele">
                  <span>New Password</span>
                  <div className="inp">
                    <input
                      type={showPwd1 ? "text" : "password"}
                      name="pwd1"
                      value={pwd1}
                      onChange={handlePwd1Change}
                      placeholder="Enter Password"
                      className={pwd1Error.active ? "error-bdr" : ""}
                    />
                    <div className="abs" onClick={() => setShowPwd1(!showPwd1)}>
                      <EyeIcon isShown={showPwd1} />
                    </div>
                  </div>
                  <p className={pwd1Error.active ? "error-msg" : "correct"}>
                    {pwd1Error.text}
                  </p>
                </div>
                <div className="form-ele">
                  <span>Confirm Password</span>
                  <div className="inp">
                    <input
                      type={showPwd2 ? "text" : "password"}
                      name="pwd2"
                      value={pwd2}
                      className={pwd2Error.active ? "error-bdr" : ""}
                      onChange={handlePwd2Change}
                      placeholder="Confirm Password"
                    />
                    <div className="abs" onClick={() => setShowPwd2(!showPwd2)}>
                      <EyeIcon isShown={showPwd2} />
                    </div>
                  </div>
                  <p className={pwd2Error.active ? "error-msg" : "correct"}>
                    {pwd2Error.text}
                  </p>
                </div>
              </div>
              <div className="btn">
                <button
                  type="submit"
                  onClick={handleSubmitPwds}
                  disabled={
                    pwd1Error.text == "" && pwd2Error.text == ""
                      ? true
                      : pwd1Error.active || pwd2Error.active
                  }
                >
                  Save Password
                </button>
              </div>
            </FormStyles>
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
