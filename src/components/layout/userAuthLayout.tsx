"use client";
import { CoderinaLogo } from "@/app/recovery/style";
import { FGLogo, FullLogo } from "../icons/sidebar";
import { PoweredByStyles, UserAuthLayoutStyles } from "./style";
import Image from "next/image";

export const UserAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserAuthLayoutStyles>
      <div className="one desktop">
        <div className="abs">
          <FullLogo textcolor="#fff" />
        </div>
        <div className="text">
          <h3>The home to skilled artisans</h3>
          <p>
            Our comprehensive design system offers you an unparalleled range of
            components, sparking creativity and boosting efficiency.
          </p>
        </div>
        <PoweredByStyles color="#fff">
          <p>Powered by</p>
          <CoderinaLogo color="#fff">
            <Image
              width={152}
              height={33}
              alt="coderina logo"
              src="/images/coderina.svg"
            />
          </CoderinaLogo>
        </PoweredByStyles>
      </div>
      <div className="two">
        <div className="mobile">
          <FullLogo textcolor="#fff" />
        </div>
        <div className="main">{children}</div>
        <div className="mobile">
          <PoweredByStyles color="#fff" className="btm">
            <p>Powered by</p>
            <CoderinaLogo color="#fff">
              <Image
                width={152}
                height={33}
                alt="coderina logo"
                src="/images/coderina.svg"
              />
            </CoderinaLogo>
          </PoweredByStyles>
        </div>
      </div>
    </UserAuthLayoutStyles>
  );
};
