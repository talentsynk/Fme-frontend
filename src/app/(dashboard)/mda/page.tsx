"use client";
import {
  ColoredArrowDown,
  DashboardMdaIcon,
  DashboardStcIcon,
  DashboardStudentIcon,
} from "@/components/icons/fme/main";
import Head from "next/head";
import { AngleDownStyles } from "@/components/icons/header";
import { useEffect, useState } from "react";
import { IconWrapper, TickIcon } from "@/components/icons/fme/mda";
import Cookies from "js-cookie";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BarChartComp, CourseItem } from "@/components/fme/index";

import { CourseItemSkeleton } from "@/components/fme/skeleton/CourseItemSkeleton";
import {
  ColorGroup,
  CourseItems,
  GraphOptions,
} from "@/components/mda/index/data";
import { FMEHomeStyles } from "../fme/style";
import { NoDataStyles } from "@/components/fme/mda/styles";
// the first page on the fme dashboard

export default function Home() {
  const [showOptions, setShowOptions] = useState(false);
  const [totalStat, setTotalStat] = useState<{
    GraduatedCount: number | null;
    NonGraduatedCount: number | null;
    STCsCount: number | null;
  }>({
    GraduatedCount: null,
    NonGraduatedCount: null,
    STCsCount: null,
  });
  const [courseLists, setCourseLists] = useState<
    { CourseName: string; StudentCount: number; TotalPercent: number }[] | null
  >(null);
  const [colorGroup, setColorGroup] = useState(ColorGroup);
  const [graphOptions, setGraphOptions] = useState(GraphOptions);
  const [selectedGraphOption, setSelectedGraphOption] = useState(
    GraphOptions.find((ele) => ele.isSelected === true)
  );
  const handleSelectOption = (name: string) => {
    const newGraphOptions = graphOptions.map((ele) => {
      return { ...ele, isSelected: ele.name === name };
    });
    setGraphOptions(newGraphOptions);
    setSelectedGraphOption(
      newGraphOptions.find((ele) => ele.isSelected === true)
    );
    setShowOptions(false);
  };
  // task left: work on add New Mda and Stc, plug in the APIs on wednesday
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
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
        if (res.data) {
          console.log(res.data);
          // change to res.data.response
          const { GraduatedCount, NonGraduatedCount, STCsCount } = res.data.response;
          setTotalStat({
            GraduatedCount: GraduatedCount,
            NonGraduatedCount: NonGraduatedCount,
            STCsCount: STCsCount,
          });
        }
      })
      .catch((error) => console.log(error));

    // simulating get-request for the top course tracker API
    setIsLoading(true);
    axios
      .get(`${BACKEND_URL}/dashboard/course-percentage`, config)
      .then((res) => {
        if (res.data) {
          setCourseLists(res.data.coursePercentages);
          setIsLoading(false);
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
        <div className="totals">
          <div className="total">
            <IconWrapper>
              <DashboardMdaIcon />
            </IconWrapper>
            <div className="stat">
              <span>Total STCs</span>
              <h3>
                {totalStat.STCsCount === null ? (
                  <Skeleton />
                ) : (
                  totalStat.STCsCount
                )}
              </h3>
            </div>
          </div>
          <div className="total">
            <IconWrapper>
              <DashboardStcIcon />
            </IconWrapper>
            <div className="stat">
              <span>Total Graduated Students</span>
              <h3>
                {totalStat.GraduatedCount === null ? (
                  <Skeleton />
                ) : (
                  totalStat.GraduatedCount
                )}
              </h3>
            </div>
          </div>
          <div className="total">
            <IconWrapper>
              <DashboardStudentIcon />
            </IconWrapper>
            <div className="stat">
              <span>Total UnGraduated Students</span>
              <h3>
                {totalStat.NonGraduatedCount === null ? (
                  <Skeleton />
                ) : (
                  totalStat.NonGraduatedCount
                )}
              </h3>
            </div>
          </div>
        </div>
        <div className="summary">
          <div className="head">
            <h4>Statistics</h4>
            <div className="dropdown">
              <div
                className="dd-head"
                onClick={() => setShowOptions(!showOptions)}
              >
                <p>{selectedGraphOption?.name}</p>
                <AngleDownStyles $isSelected={showOptions}>
                  <ColoredArrowDown />
                </AngleDownStyles>
              </div>
              {showOptions && (
                <div className="options">
                  {graphOptions.map((ele, index) => (
                    <div
                      key={index}
                      className="option"
                      onClick={() => handleSelectOption(ele.name)}
                    >
                      <p>{ele.name}</p>
                      {ele.isSelected && <TickIcon />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="graph">
            <BarChartComp
              option={selectedGraphOption?.name}
              api={selectedGraphOption?.api}
            />
          </div>
        </div>
        <div className="top-courses">
          <h5>Top Course Tracker</h5>
          <div className="content">
            {courseLists &&
              courseLists.map((ele, index) => (
                <CourseItem
                  key={index}
                  percent={ele.TotalPercent}
                  name={ele.CourseName}
                  $bgColor={colorGroup[index % 5].bgColor}
                  $lightColor={colorGroup[index % 5].lightColor}
                  $thickColor={colorGroup[index % 5].thickColor}
                  $textColor={colorGroup[index % 5].textColor}
                />
              ))}
            {courseLists === null &&
              isLoading &&
              [1, 2, 3, 4, 5].map((ele, index) => (
                <CourseItemSkeleton key={index} />
              ))}
            {courseLists === null && isLoading === false && (
              <NoDataStyles>
                {" "}
                <h2>No Courses Found</h2>
              </NoDataStyles>
            )}
          </div>
        </div>
        {/* <div className="track br">6</div> */}
      </FMEHomeStyles>
    </>
  );
}
