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
import Cookies from "js-cookie";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

// the first page on the fme dashboard

export default function Home() {
  const [showOptions, setShowOptions] = useState(false);
  const [totalStat, setTotalStat] = useState({
    totalMdas : 0,
    totalStcs : 0,
    totalStudents : 0
  });
  // task left: work on add New Mda and Stc, plug in the APIs on wednesday
  useEffect(() => {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(config);
    axios
      .get(`${BACKEND_URL}/dashboard/summary`, config)
      .then((res) => {
        if(res.data.response){
          // TotalStcs: 7, TotalMdas: 13, TotalStudents: 1}
          const {TotalStcs, TotalMdas, TotalStudents} = res.data.response;
          setTotalStat({
            totalMdas : TotalMdas,
            totalStcs : TotalStcs,
            totalStudents : TotalStudents
          });
        }
      })
      .catch((error) => console.log(error));
  }, []);
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
            <h3>{totalStat.totalMdas || <Skeleton />}</h3>
          </div>
        </div>
        <div className="total">
          <IconWrapper>
            <DashboardStcIcon />
          </IconWrapper>
          <div className="stat">
            <span>Total STCs</span>
            <h3>{totalStat.totalStcs || <Skeleton />}</h3>
          </div>
        </div>
        <div className="total">
          <IconWrapper>
            <DashboardStudentIcon />
          </IconWrapper>
          <div className="stat">
            <span>Total Students</span>
            <h3>{totalStat.totalStudents || <Skeleton />}</h3>
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
