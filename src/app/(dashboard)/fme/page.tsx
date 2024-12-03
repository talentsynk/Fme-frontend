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
import { useEffect, useRef, useState } from "react";
import { IconWrapper, TickIcon } from "@/components/icons/fme/mda";
import Cookies from "js-cookie";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BarChartComp, CourseItem } from "@/components/fme/index";
import {
  ColorGroup,
  CourseItems,
  GraphOptions,
} from "@/components/fme/index/data";
import { CourseItemSkeleton } from "@/components/fme/skeleton/CourseItemSkeleton";
import { STCCourseCard } from "@/components/stc/index/coursecard";
import { CourseCardSkeleton } from "@/components/fme/skeleton/CourseCardSkeleton";
import { NoDataStyles } from "@/components/fme/mda/styles";
import { WhiteArrowLeft, WhiteArrowRight } from "@/components/icons/main";
import ClickOutsideWrapper from "@/components/auth/wrapper";
import { toast } from "react-toastify";
// the first page on the fme dashboard

export default function Home() {
  const [showOptions, setShowOptions] = useState(false);
  const [totalStat, setTotalStat] = useState<{
    totalMdas: number | null;
    totalStcs: number | null;
    totalStudents: number | null;
  }>({
    totalMdas: null,
    totalStcs: null,
    totalStudents: null,
  });
  const [courseLists, setCourseLists] = useState<
    | {
        CourseName: string;
        TotalStudents: number;
        TotalPercent: number;
        CertifiedCount: number;
        UncertifiedCount: number;
      }[]
    | null
  >(null);

  const [studentResidenceLists, setStudentResidenceLists] = useState<
    | {
        StateOfResidence: string;
        EnrolledStudent: number;
        GraduatedStudent: number;
      }[]
    | null
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
  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  const [isLoadingResidence, setIsLoadingResidence] = useState<boolean | null>(
    null
  );

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
          const { TotalStcs, TotalMdas, TotalStudents } = res.data.response;
          setTotalStat({
            totalMdas: TotalMdas,
            totalStcs: TotalStcs,
            totalStudents: TotalStudents,
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
      .catch((error) => {console.log(error);
        setIsLoading(false);
        toast.error("An error occured while fetching data");
      });

    setIsLoadingResidence(true);
    axios
      .get(`${BACKEND_URL}/student/residence-statistics`, config)
      .then((res) => {
        if (res.data) {
          setStudentResidenceLists(res.data["residence-distribution"]);
          setIsLoadingResidence(true);
          // console.log(res.data["residence-distribution"]);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingResidence(false);
        toast.error("An error occured while fetching data");
      });
  }, []);

  // slider
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (scrollOffset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

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
              <span>Total MDAs</span>
              <h3>
                {totalStat.totalMdas === null ? (
                  <Skeleton />
                ) : (
                  totalStat.totalMdas
                )}
              </h3>
            </div>
          </div>
          <div className="total">
            <IconWrapper>
              <DashboardStcIcon />
            </IconWrapper>
            <div className="stat">
              <span>Total STCs</span>
              <h3>
                {totalStat.totalStcs === null ? (
                  <Skeleton />
                ) : (
                  totalStat.totalStcs
                )}
              </h3>
            </div>
          </div>
          <div className="total">
            <IconWrapper>
              <DashboardStudentIcon />
            </IconWrapper>
            <div className="stat">
              <span>Total Students</span>
              <h3>
                {totalStat.totalStudents === null ? (
                  <Skeleton />
                ) : (
                  totalStat.totalStudents
                )}
              </h3>
            </div>
          </div>
        </div>
        <div className="course-stat">
          <div className="head">
            <h4>State of Residence Info</h4>
          </div>
          <div className="cont" ref={containerRef}>
            <div className="coursecards">
              {studentResidenceLists &&
                studentResidenceLists.map((ele, index) => (
                  <STCCourseCard
                    key={index}
                    name={ele.StateOfResidence}
                    noGraduated={ele.GraduatedStudent}
                    noEnrolled={ele.EnrolledStudent}
                    $bgColor={colorGroup[index % 5].lightColor}
                    $lightColor={colorGroup[index % 5].bgColor}
                    $thickColor={colorGroup[index % 5].thickColor}
                  />
                ))}
              {studentResidenceLists === null &&
                isLoadingResidence &&
                [1, 2, 3, 4, 5, 6].map((ele, index) => (
                  <CourseCardSkeleton key={index} />
                ))}
              {studentResidenceLists === null && isLoadingResidence === false && (
                <NoDataStyles>
                  {" "}
                  <h2>No State residency info Found</h2>
                </NoDataStyles>
              )}
            </div>
          </div>
          {courseLists && (
            <div className="slide-r">
              <button type="button" onClick={() => handleScroll(150)}>
                <WhiteArrowRight />{" "}
              </button>
            </div>
          )}
          {courseLists && (
            <div className="slide-l">
              <button type="button" onClick={() => handleScroll(-150)}>
                <WhiteArrowLeft />{" "}
              </button>
            </div>
          )}
        </div>
        <div className="summary">
          <div className="head">
            <h4>Statistics</h4>
            <ClickOutsideWrapper onClickOutside={() => setShowOptions(false)}>
              <div className="dropdown">
                <div className="dd-head" onClick={() => setShowOptions(true)}>
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
            </ClickOutsideWrapper>
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
              courseLists.map((ele, index: number) => (
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
