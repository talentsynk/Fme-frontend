"use client";
import { Banner } from "@/components/artisan/comps";
import { ArtisanJobPageStyle } from "../style";
import { JobPageIcon } from "@/components/icons/artisan/icons";
import { PaddedSectionStyles } from "@/components/layout/style";
import { Paginator } from "@/components/fme/paginator/Paginator";
import { useState } from "react";
import { ArtisanTabSwitches } from "@/components/artisan/data";
import {
  TabSwitchStyle,
  UserTabSwitchStyle,
} from "@/components/fme/mda/styles";
import { motion } from "framer-motion";

const ArtisanJobs = () => {
  const [pageNo, setPageNo] = useState(1);
  const [artisanTabSwitches, setArtisanTabSwitches] =
    useState(ArtisanTabSwitches);
  const handleTabSwitch = (tabIndex: number) => {
    const newMdaTabSwitches = artisanTabSwitches.map((ele) => {
      return { ...ele, isSelected: tabIndex == ele.tabIndex };
    });
    setArtisanTabSwitches(newMdaTabSwitches);
  };
  return (
    <ArtisanJobPageStyle>
      <Banner
        head="Job Portal"
        desc="Discover suitable jobs for your skills and what is next"
        icon={<JobPageIcon />}
      />
      <PaddedSectionStyles>
        <div className="cont">
          <div className="tabs">
            <div className="options">
              {artisanTabSwitches.map((ele, index) => (
                <UserTabSwitchStyle
                  key={index}
                  $tabIndex={ele.tabIndex}
                  $isSelected={ele.isSelected}
                  onClick={() => handleTabSwitch(ele.tabIndex)}
                >
                  <div className="no">
                    <p>{ele.text}</p>
                    <div className="num">
                      <span>{20}</span>
                    </div>
                  </div>
                  {ele.isSelected && (
                    <motion.div
                      className="underline"
                      layoutId="underline"
                    ></motion.div>
                  )}
                </UserTabSwitchStyle>
              ))}
            </div>
          </div>
          <div className="search">search</div>
          <div className="jobs">Jobs here</div>
          <Paginator
            value={pageNo}
            incrementFunc={() => setPageNo(pageNo + 1)}
            decrementFunc={() => {
              if (pageNo - 1 > 0) {
                setPageNo(pageNo - 1);
              }
            }}
          />
        </div>
      </PaddedSectionStyles>
    </ArtisanJobPageStyle>
  );
};

export default ArtisanJobs;
