"use client";

import {
  SearchAndResultStyle,
  StatListItemStyle,
  StatListStyle,
  TabSwitchStyle,
  TopStyles,
  WhiteContainer,
} from "@/components/fme/mda/styles";
import { StudentsTabSwitches } from "@/components/fme/students/data";
import {
  ActiveIcon,
  CancelInputIcon,
  FilterIcon,
  InactiveIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  SortIcon,
  TotalIcon,
  UploadIcon,
} from "@/components/icons/fme/mda";
import { motion } from "framer-motion";
import { useState } from "react";

// the first page on the fme dashboard

export default function Home() {
  const [showCancel, setShowCancel] = useState(false);
  const [studentTabSwitches, setStudentTabSwitches] = useState(StudentsTabSwitches);
  const handleTabSwitch = (tabIndex: number) => {
    const newMdaTabSwitches = studentTabSwitches.map((ele) => {
      return { ...ele, isSelected: tabIndex == ele.tabIndex };
    });
    setStudentTabSwitches(newMdaTabSwitches);
  };
  const handleSelect = () => {
    console.log("I was selected");
  };

  return (
    <>
      <TopStyles>
        <div className="text">
          <h1>Students List</h1>
          <p>
            Take a look at your policies and the new policy to see what is
            covered
          </p>
        </div>
        <div className="buttons">
          <button type="button" className="add">
            <PlusIcon />
            <span>Add New Student</span>
          </button>
          <button type="button" className="import">
            <UploadIcon />
            <span>Import CSV</span>
          </button>
        </div>
      </TopStyles>
      <WhiteContainer>
        <StatListStyle>
          <StatListItemStyle>
            <div className="stat">
              <span>Total No of Students</span>
              <p>4000</p>
            </div>
            <TotalIcon />
          </StatListItemStyle>
          <StatListItemStyle>
            <div className="stat">
              <span>Certified Students</span>
              <p>3000</p>
            </div>
            <ActiveIcon />
          </StatListItemStyle>
          <StatListItemStyle>
            <div className="stat">
              <span>Non-Certified Students</span>
              <p>1000</p>
            </div>
            <InactiveIcon />
          </StatListItemStyle>
        </StatListStyle>
        <SearchAndResultStyle>
          <div className="searchbar">
            <div className="input">
              <div className="glass">
                <MagnifyingGlassIcon />
              </div>
              <input
                type="text"
                name="query"
                id=""
                placeholder="Search MDAs"
                onFocus={() => setShowCancel(true)}
                onBlur={() => setShowCancel(false)}
              />
              {showCancel && (
                <div className="abs">
                  <CancelInputIcon />
                </div>
              )}
            </div>
            <div className="filsort">
              <button type="button" className="filter">
                <FilterIcon />
                <span>Filter</span>
              </button>
              <button type="button" className="sort">
                <SortIcon />
                <span>Sort</span>
              </button>
            </div>
          </div>
          <div className="pad">
            <div className="options">
              {studentTabSwitches.map((ele, index) => (
                <TabSwitchStyle
                  key={index}
                  $tabIndex={ele.tabIndex}
                  $isSelected={ele.isSelected}
                  onClick={() => handleTabSwitch(ele.tabIndex)}
                >
                  <p>{ele.text}</p>
                  {ele.isSelected && (
                    <motion.div
                      className="underline"
                      layoutId="underline"
                    ></motion.div>
                  )}
                </TabSwitchStyle>
              ))}
            </div>
          </div>
          <div className="pad">
            <div className="result">
              <h3>Table herre</h3>
            </div>
          </div>
        </SearchAndResultStyle>
      </WhiteContainer>
    </>
  );
}
