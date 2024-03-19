"use client";
import { CoatOfArm, FormStyles } from "@/app/recovery/style";
import { SelectAdminComp } from "@/components/auth/auth";
import { Admins, IAdmin } from "@/components/auth/data";
import {
  AdminlistStyle,
  AuthCardStyle,
  AuthFormStyles,
} from "@/components/auth/style";
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
  const [admins, setAdmins] = useState<IAdmin[] | null>(Admins);

  const selectAdmin = (id: string) => {
    const newAdminList = admins?.map((ele) => {
      return { ...ele, isSelected: id === ele.name };
    });
    if (newAdminList) {
      setAdmins(newAdminList);
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
                <button type="button">Next</button>
              </div>
              <div className="btm">
                <p>Already have an account?</p>
                <button type="button" onClick={() => router.push("/admin")}>Sign in</button>
              </div>
            </AuthFormStyles>
          </div>
        </div>
      </AuthCardStyle>
    </>
  );
}
