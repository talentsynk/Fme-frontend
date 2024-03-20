"use client";
import { CoatOfArm, FormStyles } from "@/app/recovery/style";
import { SelectAdminComp } from "@/components/auth/auth";
import { Admins, IAdmin } from "@/components/auth/data";
import {
  AdminlistStyle,
  AuthCardStyle,
  AuthFormStyles,
} from "@/components/auth/style";
import { CreateUserIcon } from "@/components/icons/auth";
import { EmailIcon, EyeIcon } from "@/components/icons/recovery";
import { BackBtn } from "@/components/recovery/recovery";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const backFunc = () => {
    router.back();
  };

  const backToPrev =()=>{
    setAdmins(Admins);
    setAdminStatus(null);
  }
  
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

  // todo: use reacthookform for handling form state, setup redux, add animations to forms & pages
  // handle second state
  // to handle hiding and showing passwords
  const [showPwd1, setShowPwd1] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

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
                    This is the signup portal for both the Federal Ministry of
                    Education(FME) and Ministry Department& Agencies
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
                <form className="form">
                  <div className="form-input">
                    <div className="form-ele">
                      <label htmlFor="name">Name of {adminStatus}</label>
                      <div className="inp">
                        <input
                          type="text"
                          name="name"
                          placeholder="Please type in your name here"
                        />
                        <div className="abs">
                          <CreateUserIcon />
                        </div>
                      </div>
                      <p className="error-msg">Name cannot be empty</p>
                    </div>
                    <div className="form-ele">
                      <label htmlFor="email">E-mail address</label>
                      <div className="inp">
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter Email Address"
                        />
                        <div className="abs">
                          <EmailIcon />
                        </div>
                      </div>
                      <p className="error-msg">Email cannot be empty</p>
                    </div>
                    <div className="form-ele">
                      <label htmlFor="pwd1">Password</label>
                      <div className="inp">
                        <input
                          type={showPwd1 ? "text" : "password"}
                          name="pwd1"
                          placeholder="Enter Password"
                        />
                        <div
                          className="abs"
                          onClick={() => setShowPwd1(!showPwd1)}
                        >
                          <EyeIcon isShown={showPwd1} />
                        </div>
                      </div>
                      <p className="error-msg">Password cannot be empty</p>
                    </div>
                    <div className="form-ele">
                      <label htmlFor="pwd2">Confirm Password</label>
                      <div className="inp">
                        <input
                          type={showPwd2 ? "text" : "password"}
                          name="pwd2"
                          placeholder="Confirm Password"
                        />
                        <div
                          className="abs"
                          onClick={() => setShowPwd2(!showPwd2)}
                        >
                          <EyeIcon isShown={showPwd2} />
                        </div>
                      </div>
                      <p className="error-msg">Password cannot a match</p>
                    </div>
                  </div>
                  <div className="btn-m">
                    <button
                      type="submit"
                      onClick={() => console.log("submit form")}
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
