"use client";

import { CoatOfArm, CoderinaLogo } from "@/app/recovery/style";
import { AuthLayoutStyles } from "./style";
import Image from "next/image";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <AuthLayoutStyles>
        <div className="cont">
          <div className="mobile center">
            <CoatOfArm>
              <Image
                width={110}
                height={110}
                alt="coat of arm"
                src="/images/coatofarm.svg"
                priority
              />
            </CoatOfArm>
          </div>
          <div className="main">{children}</div>
          <div className="desktop">
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
          </div>
        </div>
      </AuthLayoutStyles>
  );
};
