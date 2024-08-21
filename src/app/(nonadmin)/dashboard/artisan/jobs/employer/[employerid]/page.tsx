"use client";
import { EmployerDetailPageStyle } from "@/components/artisan/Employer/style";
import { UserTabSwitchStyle } from "@/components/fme/mda/styles";
import {
  GreenTick,
  GreyArrowRight,
  RatingIcon,
  StatIcon,
} from "@/components/icons/artisan/icons";
import { PaddedSectionStyles } from "@/components/layout/style";
import Link from "next/link";
import { motion } from "framer-motion";
import { Jobs } from "@/components/artisan/data";
import { useState } from "react";
import { JobGridListAlt } from "../../../style";
import { JobComp } from "@/components/artisan/Job";
import { EmployerProfileTabSwitches } from "@/components/artisan/Employer/data";
import {
  EmployerBannerStyle,
  VerifiedBadge,
} from "@/components/artisan/style";
import Image from "next/image";

const EmployerDetailPage = () => {
  const [artisanTabSwitches, setArtisanTabSwitches] = useState(
    EmployerProfileTabSwitches
  );
  const handleTabSwitch = (tabIndex: number) => {
    const newMdaTabSwitches = artisanTabSwitches.map((ele) => {
      return { ...ele, isSelected: tabIndex == ele.tabIndex };
    });
    setArtisanTabSwitches(newMdaTabSwitches);
  };
// design the reviews compononents
// do the functionality behind the switch btw jobs posted and reviews
  return (
    <EmployerDetailPageStyle>
      <PaddedSectionStyles>
        <div className="x">
          <div className="nav">
            <Link href="/dashboard/artisan/jobs">
              <p className="lit">Job Portal</p>
            </Link>
            <GreyArrowRight />
            <p className="activ">View Employer Profile</p>
          </div>
          <EmployerBannerStyle>
            <div className="img">
              <Image
                src="/images/frame_1.png"
                width={120}
                height={120}
                alt="avatar"
              />
            </div>
            <div className="one">
              <h2>Oluwatimilehin Alarape</h2>
            </div>
            <VerifiedBadge>
              <GreenTick />
              <p>Verified</p>
            </VerifiedBadge>
          </EmployerBannerStyle>
          <div className="body">
            <div className="text-cont">
              <div className="cont-one">
                <div className="options">
                  {artisanTabSwitches.map((ele, index) => (
                    <UserTabSwitchStyle
                      key={index}
                      $tabIndex={ele.tabIndex}
                      $isSelected={ele.isSelected}
                      onClick={() => handleTabSwitch(ele.tabIndex)}
                      $isRowOnMobile={true}
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
                <JobGridListAlt>
                  {Jobs.slice(0, 3).map((ele, index) => (
                    <JobComp key={index} {...ele} />
                  ))}
                </JobGridListAlt>
              </div>
              <div className="cont-two">
                <div className="stat">
                  <StatIcon />
                  <h3>STATS</h3>
                </div>
                <div className="l2">
                  <div className="fr">
                    <h4>Jobs Posted</h4>
                    <p>5</p>
                  </div>
                  <div className="fr">
                    <h4>Project Completed</h4>
                    <p>1</p>
                  </div>
                  <div className="fr">
                    <h4>Rating</h4>
                    <div className="rate">
                      <RatingIcon />
                      <p>4.5/5</p>
                    </div>
                  </div>
                  <div className="fr">
                    <h4>Recommendations</h4>
                    <p>5</p>
                  </div>
                  <div className="fr">
                    <h4>Location</h4>
                    <p>Lagos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PaddedSectionStyles>
    </EmployerDetailPageStyle>
  );
};

export default EmployerDetailPage;
