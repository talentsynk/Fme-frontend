"use client";
import "../../globals.css";
import {
  CoatOfArm,
  CoderinaLogo,
  FormStyles,
  RecoveryPageStyles,
} from "../style";
import Image from "next/image";
import { BackBtn } from "@/components/recovery/recovery";
import {
  CheckedIcon,
  EyeIcon,
  FormErrorIcon,
} from "@/components/icons/recovery";
import { FormEvent, useEffect, useState } from "react";
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

  // to handle hiding and showing passwords
  const [showPwd1, setShowPwd1] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  const [pwd1, setPwd1] = useState<string>("");
  const [pwd2, setPwd2] = useState<string>("");

  // i need to handle; match, then error handling and correct state handling
  const handlePwd1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwd1(value);
    let msg: string | null = isStrongPassword(value);

    // this handles when the password is a match and then pwd1 value changes
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

  
  const handleSubmitPwds = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    if (
      !pwd1Error.active &&
      !pwd2Error.active &&
      pwd1Error.text !== "" &&
      pwd2Error.text !== ""
    ) {
      // call changePassword API
      console.log(pwd1,pwd2);
    }
  };

  return (
    <>
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
              <form className="form" onSubmit={handleSubmitPwds}>
              <div className="form-input">
                <div className="form-ele">
                  <label htmlFor="pwd1">New Password</label>
                  <div className="inp">
                    <input
                      type={showPwd1 ? "text" : "password"}
                      name="pwd1"
                      value={pwd1}
                      onChange={handlePwd1Change}
                      placeholder="Enter Password"
                      autoComplete="new-password"
                      className={pwd1Error.active ? "error-bdr" : ""}
                      
                    />
                    <div className="abs" onClick={() => setShowPwd1(!showPwd1)}>
                      {pwd1Error.active === false && pwd1Error.text === "" && (
                        <EyeIcon isShown={showPwd1} />
                      )}
                      {pwd1Error.active === false && pwd1Error.text !== "" && (
                        <CheckedIcon />
                      )}
                      {pwd1Error.active === true && <EyeIcon isShown={showPwd1} />}
                    </div>
                  </div>
                  <p
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    className={pwd1Error.active ? "error-msg" : "correct"}
                  >
                    {pwd1Error.text}
                  </p>
                </div>
                <div className="form-ele">
                  <label htmlFor="pwd2">Confirm Password</label>
                  <div className="inp">
                    <input
                      type={showPwd2 ? "text" : "password"}
                      name="pwd2"
                      value={pwd2}
                      className={pwd2Error.active ? "error-bdr" : ""}
                      onChange={handlePwd2Change}
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                    />
                    <div className="abs" onClick={() => setShowPwd2(!showPwd2)}>
                      {pwd2Error.active === false && pwd2Error.text === "" && (
                        <EyeIcon isShown={showPwd2} />
                      )}
                      {pwd2Error.active === false && pwd2Error.text !== "" && (
                        <CheckedIcon />
                      )}
                      {pwd2Error.active === true && <EyeIcon isShown={showPwd2} />}
                    </div>
                  </div>
                  <p
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    className={pwd2Error.active ? "error-msg" : "correct"}
                  >
                    {pwd2Error.text}
                  </p>
                </div>
              </div>
              <div className="btn-m">
                <button
                  type="submit"
                  disabled={
                    pwd1Error.text == "" ||
                    pwd2Error.text == "" ||
                    pwd1Error.active ||
                    pwd2Error.active
                  }
                >
                  Save Password
                </button>
              </div>
              </form>
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
