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
import { IconWrapper, TickIcon } from "@/components/icons/fme/mda";
import Cookies from "js-cookie";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CourseItem } from "@/components/fme/index";
import { ColorGroup, CourseItems } from "@/components/fme/index/data";

// the first page on the fme dashboard

export default function Home() {
  const [showOptions, setShowOptions] = useState(false);
  const [totalStat, setTotalStat] = useState({
    totalMdas: 0,
    totalStcs: 0,
    totalStudents: 0,
  });
  const [courseLists, setCourseLists] = useState(CourseItems);
  const [colorGroup, setColorGroup] = useState(ColorGroup);
  const [graphOptions, setGraphOptions] = useState([
    { name: "MDAs", isSelected: true },
    { name: "STCs", isSelected: false },
    { name: "Students", isSelected: false },
  ]);
  const handleSelectOption =(name : string)=>{
    const newGraphOptions = graphOptions.map(ele => {
      return {...ele,isSelected : ele.name === name}
    });
    setGraphOptions(newGraphOptions);
    setShowOptions(false);
  }
  // task left: work on add New Mda and Stc, plug in the APIs on wednesday
  useEffect(() => {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${BACKEND_URL}/dashboard/summary`, config)
      .then((res) => {
        if (res.data.response) {
          // TotalStcs: 7, TotalMdas: 13, TotalStudents: 1}
          const { TotalStcs, TotalMdas, TotalStudents } = res.data.response;
          setTotalStat({
            totalMdas: TotalMdas,
            totalStcs: TotalStcs,
            totalStudents: TotalStudents,
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
                <p>{graphOptions.find((ele)=> ele.isSelected === true)?.name}</p>
                <AngleDownStyles $isSelected={showOptions}>
                  <ColoredArrowDown />
                </AngleDownStyles>
              </div>
              {showOptions && (
                <div className="options">
                  {
                    graphOptions.map((ele,index)=>(
                      <div key={index} className="option" onClick={() => handleSelectOption(ele.name)}>
                        <p>{ele.name}</p>
                        {ele.isSelected && <TickIcon />}
                      </div>
                    ))
                  }
                </div>
              )}
            </div>
          </div>
          <div className="graph">
            <h1>Graph Here</h1>
          </div>
        </div>
        <div className="top-courses">
          <h5>Top Course Tracking</h5>
          <div className="content">
            {courseLists.map((ele, index) => (
              <CourseItem
                key={index}
                percent={ele.percent}
                name={ele.name}
                $bgColor={colorGroup[index % 5].bgColor}
                $lightColor={colorGroup[index % 5].lightColor}
                $thickColor={colorGroup[index % 5].thickColor}
                $textColor={colorGroup[index % 5].textColor}
              />
            ))}
          </div>
        </div>
        <div className="track br">6</div>
      </FMEHomeStyles>
    </>
  );
}
