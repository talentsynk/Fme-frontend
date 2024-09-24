"use client";
import { Ierror } from "@/app/recovery/page";
import { CoatOfArm, FormStyles } from "@/app/recovery/style";
import { SelectAdminComp } from "@/components/auth/auth";
import { Admins, IAdmin } from "@/components/auth/data";
import {
  AdminlistStyle,
  AuthCardStyle,
  AuthFormStyles,
} from "@/components/auth/style";
import { CreateUserIcon } from "@/components/icons/auth";
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
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface IForm {
  adminStatus: string | null;
  email: string;
  name: string;
  pwd1: string;
  pwd2: string;
}
export default function Login() {
  const router = useRouter();
  const backFunc = () => {
    router.back();
  };

  // edit this to student / user signup

  const backToPrev = () => {
    setAdmins(Admins);
    setAdminStatus(null);
  };

  // handle first state
  const [admins, setAdmins] = useState<IAdmin[] | null>(Admins);
  const [adminStatus, setAdminStatus] = useState<string | null>(null);
  const handleAdminStatus = () => {
    const status = admins?.find((ele) => ele.isSelected == true)?.name;
    if (status) {
      setAdminStatus(status);
      setForm({ ...form, adminStatus: status });
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

  // todo: use reacthookform for handling form state, setup redux, add animations to forms & pages

  // handle second state
  // to handle hiding and showing passwords
  const [showPwd1, setShowPwd1] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  // form data
  const [form, setForm] = useState<IForm>({
    adminStatus: adminStatus,
    name: "",
    email: "",
    pwd1: "",
    pwd2: "",
  });
  // for name
  const [name, setName] = useState<string>("");
  // error
  const [nameError, setNameError] = useState<Ierror>({
    active: false,
    text: "",
  });
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    // Perform email validation
    if (value.trim().length < 1) {
      setNameError({ active: true, text: "Invalid Name." });
    } else {
      setNameError({ active: false, text: "Name Entered" });
      setForm({ ...form, name: value });
    }
  };

  // For Email
  const [email, setEmail] = useState<string>("");
  // error
  const [emailError, setEmailError] = useState<Ierror>({
    active: false,
    text: "",
  });
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

  // for pwds
  const [pwd1, setPwd1] = useState<string>("");
  const [pwd2, setPwd2] = useState<string>("");
  // errors
  const [pwd1Error, setPwd1Error] = useState<Ierror>({
    active: false,
    text: "",
  });
  const [pwd2Error, setPwd2Error] = useState<Ierror>({
    active: false,
    text: "",
  });
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
        setForm({ ...form, pwd2: pwd2 });
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
      setForm({ ...form, pwd1: value });
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
      setForm({ ...form, pwd2: value });
    } else {
      setPwd2Error({
        active: true,
        text: "Password is not a match!",
      });
    }
  };

  // handle signup form
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    if (
      !nameError.active &&
      !emailError.active &&
      !pwd1Error.active &&
      !pwd2Error.active &&
      nameError.text !== "" &&
      emailError.text !== "" &&
      pwd1Error.text !== "" &&
      pwd2Error.text !== ""
    ) {
      // call signup API
      console.log(form);
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
            {adminStatus == null && (
              <AuthFormStyles>
                <div className="backbtn">
                  <BackBtn backFunction={backFunc} />
                </div>
                <div className="form-head">
                  <h3>Welcome to Signup Portal!</h3>
                  <p>
                    This is the official signup portal for both Students
                    (Trained Artisans) and Employers of Skilled Labour
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
                  <p>Already have an account?</p>
                  <button type="button" onClick={() => router.push("/admin")}>
                    Sign in
                  </button>
                </div>
              </AuthFormStyles>
            )}
            {adminStatus !== null && (
              <AuthFormStyles>
                <div className="backbtn">
                  <BackBtn backFunction={backToPrev} text="Previous page" />
                </div>
                <div className="form-head">
                  <h3>Welcome to {adminStatus} Signup!</h3>
                  <p>
                    This is the signup portal for both the Federal Ministry of
                    Education(FME) and Ministry Department& Agencies
                  </p>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                  <div className="form-input">
                    <div className="form-ele">
                      <label htmlFor="name">Name of {adminStatus}</label>
                      <div className="inp">
                        <input
                          type="text"
                          name="name"
                          value={name}
                          onChange={handleNameChange}
                          placeholder="Please type in your name here"
                          className={nameError.active ? "error-bdr" : ""}
                        />
                        <div className="abs">
                          {nameError.active === false &&
                            nameError.text === "" && <CreateUserIcon />}
                          {nameError.active === false &&
                            nameError.text !== "" && <CheckedIcon />}
                          {nameError.active === true && <FormErrorIcon />}
                        </div>
                      </div>
                      <p
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                        className={nameError.active ? "error-msg" : "correct"}
                      >
                        {nameError.text}
                      </p>
                    </div>
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
                      <label htmlFor="pwd1">Password</label>
                      <div className="inp">
                        <input
                          type={showPwd1 ? "text" : "password"}
                          name="pwd1"
                          value={pwd1}
                          onChange={handlePwd1Change}
                          placeholder="Enter Password"
                          className={pwd1Error.active ? "error-bdr" : ""}
                          autoComplete="new-password"
                        />
                        <div
                          className="abs"
                          onClick={() => setShowPwd1(!showPwd1)}
                        >
                          {pwd1Error.active === false &&
                            pwd1Error.text === "" && (
                              <EyeIcon isShown={showPwd1} />
                            )}
                          {pwd1Error.active === false &&
                            pwd1Error.text !== "" && <CheckedIcon />}
                          {pwd1Error.active === true && (
                            <EyeIcon isShown={showPwd1} />
                          )}
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
                          placeholder="Confirm Password"
                          value={pwd2}
                          className={pwd2Error.active ? "error-bdr" : ""}
                          onChange={handlePwd2Change}
                          autoComplete="new-password"
                          onKeyDown={() =>
                            setPwd2Error({ active: false, text: "" })
                          }
                        />
                        <div
                          className="abs"
                          onClick={() => setShowPwd2(!showPwd2)}
                        >
                          {pwd2Error.active === false &&
                            pwd2Error.text === "" && (
                              <EyeIcon isShown={showPwd2} />
                            )}
                          {pwd2Error.active === false &&
                            pwd2Error.text !== "" && <CheckedIcon />}
                          {pwd2Error.active === true && <FormErrorIcon />}
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
                      onClick={() => console.log("submit form")}
                      disabled={
                        nameError.active ||
                        emailError.active ||
                        pwd1Error.active ||
                        pwd2Error.active ||
                        nameError.text == "" ||
                        emailError.text == "" ||
                        pwd1Error.text == "" ||
                        pwd2Error.text == ""
                      }
                    >
                      Next
                    </button>
                  </div>
                </form>
                <div className="btm">
                  <p>Already have an account?</p>
                  <button type="button" onClick={() => router.push("/admin")}>
                    Sign in
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
