"use client";
import { Ierror } from "@/app/recovery/page";
import { CoatOfArm, FormStyles } from "@/app/recovery/style";
import {
  AdminlistStyle,
  AuthCardStyle,
  AuthFormStyles,
  LinkStyles,
} from "@/components/auth/style";
import {
  CheckedIcon,
  EmailIcon,
  EyeIcon,
  FormErrorIcon,
} from "@/components/icons/recovery";
import { BackBtn } from "@/components/recovery/recovery";
import { validateEmail } from "@/utils/validateEmail";
import { isStrongPassword } from "@/utils/validatePwd";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface IForm {
  email: string;
  pwd: string;
}
export default function Login() {
  const router = useRouter();
  const backFunc = () => {
    router.push("/");
  };

  // for form
  const [form, setForm] = useState<IForm>({ email: "", pwd: "" });
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
      setForm({...form, email : value});
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

  const handlePwd1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setForm({...form,pwd : value});
    }
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    // check if the username and pwd match the DB using the APIendpoint, setup the user session using redux and navigate to the respective dashboard
    if (
      !emailError.active &&
      !pwdError.active &&
      emailError.text !== "" &&
      pwdError.text !== ""
    ) {
      // call signup API
      console.log(form);
      router.push("/fme"); //navigate to FME dashboard for now
    }
  };
  return (
    <>
      <Head>
        <title>New password</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AuthCardStyle>
        <div className="flx">
          <div className="one desktop">
            <div className="loc">
              <CoatOfArm>
                <Image
                  width={110}
                  height={110}
                  alt="coat of arm"
                  src="/images/auth/coatofarmsWhite.svg"
                />
              </CoatOfArm>
            </div>
            <Image
              src="/images/auth/desktop-bg2.svg"
              width={0}
              height={0}
              sizes="100vw"
              alt="desktop-bg"
            />
          </div>
          <div className="two">
            <AuthFormStyles>
              <div className="backbtn">
                <BackBtn backFunction={backFunc} />
              </div>
              <div className="form-head">
                <h3>Welcome to Login Portal!</h3>
                <p>
                  This is the login portal for both the Federal Ministry of
                  Education(FME) and Ministry Department& Agencies
                </p>
              </div>
              <form className="form" onSubmit={handleLogin}>
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
                      <div className="abs">
                        {emailError.active === false &&
                          emailError.text === "" && <EmailIcon />}
                        {emailError.active === false &&
                          emailError.text !== "" && <CheckedIcon />}
                        {emailError.active === true && <FormErrorIcon />}
                      </div>
                    </div>
                    <p
                      role="alert"
                      aria-live="assertive"
                      aria-atomic="true"
                      className={emailError.active ? "error-msg" : "correct"}
                    >
                      {emailError.text}
                    </p>
                  </div>
                  <div className="form-ele">
                    <label htmlFor="pwd">New Password</label>
                    <div className="inp">
                      <input
                        type={showPwd ? "text" : "password"}
                        name="pwd"
                        value={pwd}
                        onChange={handlePwd1Change}
                        placeholder="Enter Password"
                        autoComplete="new-password"
                        className={pwdError.active ? "error-bdr" : ""}
                        onKeyDown={() =>
                          setPwdError({ active: false, text: "" })
                        }
                      />
                      <div className="abs" onClick={() => setShowPwd(!showPwd)}>
                        {pwdError.active === false && pwdError.text === "" && (
                          <EyeIcon isShown={showPwd} />
                        )}
                        {pwdError.active === false && pwdError.text !== "" && (
                          <CheckedIcon />
                        )}
                        {pwdError.active === true && <FormErrorIcon />}
                      </div>
                    </div>
                    <p
                      role="alert"
                      aria-live="assertive"
                      aria-atomic="true"
                      className={pwdError.active ? "error-msg" : "correct"}
                    >
                      {pwdError.text}
                    </p>
                  </div>
                </div>
                <div className="right">
                  <LinkStyles>
                    <Link href="/recovery">
                      <p>Forgot Password?</p>
                    </Link>
                  </LinkStyles>
                </div>
                <div className="btn-m">
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
                <button
                  type="button"
                  onClick={() => router.push("/admin/signup")}
                >
                  Sign up
                </button>
              </div>
            </AuthFormStyles>
          </div>
        </div>
      </AuthCardStyle>
    </>
  );
}
