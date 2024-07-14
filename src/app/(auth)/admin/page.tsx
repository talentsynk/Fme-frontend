"use client";
import { Ierror } from "@/app/recovery/page";
import { CoatOfArm, FormStyles } from "@/app/recovery/style";
import { FullMeaning, SelectAdminComp } from "@/components/auth/auth";
import { Admins, IAdmin } from "@/components/auth/data";
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
import { ButtonLoader } from "@/components/recovery/style";
import { roles } from "@/constants/roleList";
import { BACKEND_URL } from "@/lib/config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { validateEmail } from "@/utils/validateEmail";
import { isStrongPassword } from "@/utils/validatePwd";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import { setSessionExpiration } from "@/redux/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IForm {
  email: string;
  pwd: string;
}
export default function Login() {
  const router = useRouter();

  // for dispatching redux actions
  const dispatch = useAppDispatch();
  // handle first state
  const [admins, setAdmins] = useState<IAdmin[] | null>(Admins);
  const [adminStatus, setAdminStatus] = useState<string | null>(null);
  const handleAdminStatus = () => {
    const status = admins?.find((ele) => ele.isSelected == true)?.name;
    if (status) {
      setAdminStatus(status);
    }
  };
  const selectAdmin = (id: string) => {
    const newAdminList = admins?.map((ele) => {
      return { ...ele, isSelected: id === ele.name };
    });
    if (newAdminList) {
      setAdmins(newAdminList);
    }
  };

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

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    // check if the username and pwd match the DB using the APIendpoint, setup the user session using redux and navigate to the respective dashboard
    if (
      !emailError.active &&
      !pwdError.active &&
      emailError.text !== "" &&
      pwdError.text !== ""
    ) {
      // call signup API

      try {
        const body = {
          Email: form.email,
          Password: form.pwd,
        };
        // console.log(body);
        setIsLoading(true);
        const { data } = await axios.post(`${BACKEND_URL}/user/login`, body);
        if (data) {
          setIsLoading(false);
          if (data.role == 1 || data.role == 2 || data.role == 3) {
            const roleString = roles[data.role - 1];
            dispatch(setSessionExpiration(false));
            let inSetTime = new Date(
              new Date().getTime() + data.expires_in * 1000
            );
            Cookies.set("userRole", roleString, { expires: inSetTime });
            Cookies.set("token", data.jwt, { expires: inSetTime });
            toast.success(`Login successful!`);
            setTimeout(() => {
              if (roleString == "FME") {
                router.push("/fme");
              } else if (roleString == "MDA") {
                router.push("/mda");
              } else if (roleString == "STC") {
                router.push("/stc");
              }
            }, 1200);
          } else {
            toast.error(`This login is meant for just Admins`);
            setTimeout(() => {
              router.push("/auth/login");
            }, 1300);
            // toastify message then redirect to the right login
          }
        }
      } catch (error: any) {
        if (error.response) {
          setPwdError({
            active: true,
            text: error.response.data.message,
          });
          setEmailError({
            active: true,
            text: error.response.data.message,
          });
        } else {
          setPwdError({
            active: true,
            text: error.message,
          });
          setEmailError({
            active: true,
            text: error.message,
          });
        }
        // console.log(error);
        setIsLoading(false);
      }
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
          <ToastContainer />
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
            {adminStatus == null && (
              <AuthFormStyles>
                <div className="backbtn">
                  <BackBtn backFunction={() => router.push("/")} />
                </div>
                <div className="form-head">
                  <h3>Welcome to Login Portal!</h3>
                  <p>
                    This is the login portal for the Federal Ministry of
                    Education (FME), Ministry Department& Agencies (MDA) and
                    Skill Training Centres (STC)
                  </p>
                </div>
                <div className="form-input">
                  <AdminlistStyle>
                    {admins?.map((ele, index) => (
                      <SelectAdminComp
                        key={index}
                        name={ele.name}
                        icon={ele.icon}
                        isSelected={ele.isSelected}
                        handleSelect={() => selectAdmin(ele.name)}
                      />
                    ))}
                  </AdminlistStyle>
                </div>
                <div className="btn">
                  <button
                    type="button"
                    onClick={handleAdminStatus}
                    disabled={
                      admins?.find((ele) => ele.isSelected == true)
                        ?.isSelected !== true
                    }
                  >
                    Next
                  </button>
                </div>
                <div className="btm">
                  <p>Not an Admin user?</p>
                  <button
                    type="button"
                    onClick={() => router.push("/auth/login")}
                  >
                    Sign in
                  </button>
                </div>
              </AuthFormStyles>
            )}
            {adminStatus !== null && (
              <AuthFormStyles>
                <div className="backbtn">
                  <BackBtn backFunction={() => setAdminStatus(null)} />
                </div>
                <div className="form-head">
                  <h3>Welcome to {adminStatus} Portal!</h3>
                  {adminStatus === "FME" && (
                    <p>
                      This is the official login portal for the{" "}
                      {FullMeaning.FME} ({adminStatus}) administrators
                    </p>
                  )}
                  {adminStatus === "MDA" && (
                    <p>
                      This is the only official login portal for the{" "}
                      {FullMeaning.MDA} ({adminStatus}) administrators
                    </p>
                  )}
                  {adminStatus === "STC" && (
                    <p>
                      This is the official login portal for the{" "}
                      {FullMeaning.STC} ({adminStatus}) administrators
                    </p>
                  )}
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
                        <div
                          className="abs"
                          onClick={() => setShowPwd(!showPwd)}
                        >
                          {pwdError.active === false &&
                            pwdError.text === "" && (
                              <EyeIcon isShown={showPwd} />
                            )}
                          {pwdError.active === false &&
                            pwdError.text !== "" && <CheckedIcon />}
                          {pwdError.active === true && (
                            <EyeIcon isShown={showPwd} />
                          )}
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
                      {isLoading ? <ButtonLoader /> : "Continue"}
                    </button>
                  </div>
                </form>
                <div className="btm">
                  <p>Don’t have an account?</p>
                  <button
                    type="button"
                    onClick={() => router.push("/auth/signup")}
                  >
                    Sign up
                  </button>
                </div>
              </AuthFormStyles>
            )}
          </div>
        </div>
      </AuthCardStyle>
    </>
  );
}
