"use client";
import { CoderinaLogo } from "@/app/recovery/style";
import { FGLogo, FullLogo } from "../icons/sidebar";
import { PoweredByStyles, UserAuthLayoutStyles } from "./style";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Words = [
  "The home to skilled artisans",
  "We connect You to skilled artisans",
];

export const UserAuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [words, setWords] = useState(Words);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);
  return (
    <UserAuthLayoutStyles>
      <div className="one desktop">
        <div className="abs">
          <FullLogo textcolor="#fff" link="/"  />
        </div>
        <div className="text">
          <h3>
            {" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                className="f"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.5 }}
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </h3>
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
