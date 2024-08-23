"use client";
import {
  EmployerDetailPageStyle,
  SWitchTabStyles,
} from "@/components/artisan/Employer/style";
import {
  FlexAbsoluteModalStyles,
  UserTabSwitchStyle,
} from "@/components/fme/mda/styles";
import {
  GreenTick,
  GreyArrowRight,
  RatingIcon,
  ReviewIcon,
  SendIcon,
  StatIcon,
} from "@/components/icons/artisan/icons";
import { PaddedSectionStyles } from "@/components/layout/style";
import Link from "next/link";
import { motion } from "framer-motion";
import { Jobs } from "@/components/artisan/data";
import { useState } from "react";
import { JobComp } from "@/components/artisan/Job";
import {
  EmployerBannerStyle,
  ReviewBtnStyle,
  TagStyle,
  VerifiedBadge,
} from "@/components/artisan/style";
import Image from "next/image";
import {
  ReviewComp,
  ReviewModal,
  SimilarComp,
} from "@/components/artisan/Employer";
import { JobGridListAlt, SimilarCompGridList } from "../../../artisan/style";
import { ArtisanProfileTabSwitches } from "@/components/employer/data";

const ArtisanDetailPage = () => {
  const [artisanTabSwitches, setArtisanTabSwitches] = useState(
    ArtisanProfileTabSwitches
  );
  const [currentTab, setCurrentTab] = useState(
    artisanTabSwitches.find((ele) => ele.isSelected)?.text
  );
  const handleTabSwitch = (tabIndex: number) => {
    const newTabSwitches = artisanTabSwitches.map((ele) => {
      return { ...ele, isSelected: tabIndex == ele.tabIndex };
    });
    const selectedElement = newTabSwitches.find((ele) => ele.isSelected);
    if (selectedElement) {
      setCurrentTab(selectedElement.text);
    }
    setArtisanTabSwitches(newTabSwitches);
  };
  const [showReviewModal, setShowReviewModal] = useState(false);
  return (
    <EmployerDetailPageStyle>
      <PaddedSectionStyles>
        <div className="x">
          <div className="nav">
            <Link href="/dashboard/artisan/jobs">
              <p className="lit">Hire Artisan</p>
            </Link>
            <GreyArrowRight />
            <p className="activ">View Artisan Profile</p>
          </div>
          <EmployerBannerStyle>
            <div className="img">
              <Image
                src="/images/frame_2.png"
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
                  <SWitchTabStyles>
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
                  </SWitchTabStyles>
                  <div className="desktop">
                    <div className="review">
                      <ReviewBtnStyle onClick={() => setShowReviewModal(true)}>
                        <ReviewIcon />
                        <p>Review Artisan</p>
                      </ReviewBtnStyle>
                    </div>
                  </div>
                </div>
                <div className="mobile">
                  <div className="review">
                    <ReviewBtnStyle>
                      <ReviewIcon />
                      <p>Review Artisan</p>
                    </ReviewBtnStyle>
                  </div>
                </div>
                <JobGridListAlt>
                  {currentTab == "Reviews" &&
                    [1, 2, 3].map((ele, index) => (
                      <ReviewComp key={index} role="employer" />
                    ))}
                </JobGridListAlt>
              </div>
              <div className="cont-two">
                <div className="skill">
                  <h3>SKILLS</h3>
                  <div className="tg">
                    <TagStyle>
                      <p>#fashiondesigner</p>
                    </TagStyle>
                    <TagStyle>
                      <p>#creative</p>
                    </TagStyle>
                  </div>
                </div>
                <div className="stat">
                  <StatIcon />
                  <h3>STATS</h3>
                </div>
                <div className="l2">
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
                <div className="btn">
                    <button type="button">
                        <p>Hire Artisan</p>
                        <SendIcon />
                    </button>
                </div>
              </div>
            </div>
          </div>
          <div className="similar">
            <h3 className="head">Similar Artisans</h3>
            <SimilarCompGridList>
              {[1, 2, 3].map((ele, index) => (
                <SimilarComp key={index} />
              ))}
            </SimilarCompGridList>
          </div>
        </div>
      </PaddedSectionStyles>
      {showReviewModal && (
        <FlexAbsoluteModalStyles>
          <ReviewModal
            role="artisan"
            closeModal={() => setShowReviewModal(false)}
          />
        </FlexAbsoluteModalStyles>
      )}
    </EmployerDetailPageStyle>
  );
};

export default ArtisanDetailPage;
