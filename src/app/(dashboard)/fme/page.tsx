"use client";
import {
  ColoredArrowDown,
  DashboardMdaIcon,
  DashboardStcIcon,
  DashboardStudentIcon,
} from "@/components/icons/fme/main";
import { FMEHomeStyles } from "./style";
import Head from "next/head";
import { AngleDownStyles } from "@/components/icons/header";
import { useEffect, useState } from "react";
import { IconWrapper } from "@/components/icons/fme/mda";

// the first page on the fme dashboard

export default function Home() {
  const [showOptions, setShowOptions] = useState(false);
  
  return (
    <>
      <Head>
        <title>dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <FMEHomeStyles>
        <div className="total">
          <IconWrapper>
            <DashboardMdaIcon />
          </IconWrapper>
          <div className="stat">
            <span>Total MDAs</span>
            <h3>10,000</h3>
          </div>
        </div>
        <div className="total">
          <IconWrapper>
            <DashboardStcIcon />
          </IconWrapper>
          <div className="stat">
            <span>Total STCs</span>
            <h3>700</h3>
          </div>
        </div>
        <div className="total">
          <IconWrapper>
            <DashboardStudentIcon />
          </IconWrapper>
          <div className="stat">
            <span>Total Students</span>
            <h3>100,000</h3>
          </div>
        </div>
        <div className="summary">
          <div className="head">
            <h4>Summary</h4>
            <div className="dropdown">
              <div
                className="dd-head"
                onClick={() => setShowOptions(!showOptions)}
              >
                <p>MDAs</p>
                <AngleDownStyles $isSelected={showOptions}>
                  <ColoredArrowDown />
                </AngleDownStyles>
              </div>
              {showOptions && (
                <div className="options">
                  <p>Option1</p>
                  <p>Option2</p>
                </div>
              )}
            </div>
          </div>
          <div className="graph">
            <h1>Graph Here</h1>
          </div>
        </div>
        <div className="marketing br">5</div>
        <div className="track br">6</div>
      </FMEHomeStyles>
    </>
  );
}
