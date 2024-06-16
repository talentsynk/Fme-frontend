"use client";

import { Ierror } from "@/app/recovery/page";
import { LinkStyles, UserLoginStyles } from "@/components/auth/style";
import {
  CheckedIcon,
  EmailIcon,
  EyeIcon,
  FormErrorIcon,
} from "@/components/icons/recovery";
import { validateEmail } from "@/utils/validateEmail";
import { isStrongPassword } from "@/utils/validatePwd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IForm {
  email: string;
  pwd: string;
}
export default function Login() {
  const router = useRouter();
  // for form
  const [form, setForm] = useState<IForm>({ email: "", pwd: "" });
  // For Email
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<Ierror>({
    active: false,
    text: "",
  });

  // login button loader state
  const [isLoading, setIsLoading] = useState(false);

  // handle validation as user types
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // Perform email validation
    if (!validateEmail(value)) {
      setEmailError({ active: true, text: "Invalid email address." });
    } else {
      setEmailError({ active: false, text: "Valid Email" });
      setForm({ ...form, email: value });
    }
  };

  //   for pwd
  const [pwd, setPwd] = useState<string>("");
  // to handle hiding and showing passwords
  const [showPwd, setShowPwd] = useState(false);
  //  for error handling
  const [pwdError, setPwdError] = useState<Ierror>({
    active: false,
    text: "",
  });
  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwd(value);

    let msg: string | null = isStrongPassword(value);
    if (msg !== null) {
      setPwdError({
        active: true,
        text: msg,
      });
    } else {
      setPwdError({
        active: false,
        text: "Password is Strong",
      });
      setForm({ ...form, pwd: value });
    }
  };

  return (
    <UserLoginStyles>
      <form className="form">
        <div className="head">
          <h3>Welcome, Login Here!</h3>
          <p>
            Welcome back to your account,This is the portal for Artisans and
            Employers
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
                autoComplete="email"
              />
              <div className="ind">
                {emailError.active === false && emailError.text === "" && (
                  <EmailIcon />
                )}
                {emailError.active === false && emailError.text !== "" && (
                  <CheckedIcon />
                )}
                {emailError.active === true && <FormErrorIcon />}
              </div>
            </div>
          </div>
          <div className="form-ele">
            <label htmlFor="pwd">Password</label>
            <div className="inp">
              <input
                type={showPwd ? "text" : "password"}
                name="pwd"
                value={pwd}
                onChange={handlePwdChange}
                placeholder="Enter Password"
                autoComplete="new-password"
                className={pwdError.active ? "error-bdr" : ""}
              />
              <div className="ind" onClick={() => setShowPwd(!showPwd)}>
                {pwdError.active === false && pwdError.text === "" && (
                  <EyeIcon isShown={showPwd} />
                )}
                {pwdError.active === false && pwdError.text !== "" && (
                  <CheckedIcon />
                )}
                {pwdError.active === true && <EyeIcon isShown={showPwd} />}
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <LinkStyles>
            <Link href="/recovery">
              <p>Forgot Password?</p>
            </Link>
          </LinkStyles>
        </div>
        <div className="btn">
          <button
            type="submit"
            disabled={
              pwdError.text == "" ||
              emailError.text == "" ||
              pwdError.active !== false ||
              emailError.active !== false
            }
          >
            Continue
          </button>
        </div>
      </form>
      <div className="btm">
        <p>Don’t have an account?</p>
        <button type="button" onClick={() => router.push("/auth/signup")}>
          Sign up
        </button>
      </div>
    </UserLoginStyles>
  );
}
