interface IArtisan{
  AverageRating:number;
  BusinessDescription:string;
  BusinessName:string;
  ID:number;
  Skill:string;
}
interface IStats{
  rating:number;
  total_job_recommendations:number;
  total_jobs_completed:number;
}
interface IReviews{

  CreatedAt:string;
  Rating:number;
  EmployerID:number;
  Description:string;
  FirstName:string;
  LastName:string;
}
"use client";
import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
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
import { HireArtisanComp } from "@/components/fme/students/modal";

const ArtisanDetailPage = ({ params }: { params: { artisan: string } }) => {
  const lol=params.artisan
  const [showHireArtisanModal, setShowHireArtisanModal] = useState(false);
  const [artisanTabSwitches, setArtisanTabSwitches] = useState(
    ArtisanProfileTabSwitches
  );
  const cancelModal=()=>{
    console.log(1)
  }
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
  const [data,setData]= useState<IArtisan|null>(null)
  const [stats,setStats]= useState<IStats|null>(null)
  const [reviews,setReviews]= useState<IReviews[]|null>(null)
  useEffect(() => {
		let token = Cookies.get("token");
    console.log(token)
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios
			.get(`${BACKEND_URL}/artisan/profile-stats/${lol}`, config)
			.then((res) => {
       console.log(res)
				const data = res.data;
				setStats(data);
			})
			.catch((error) => console.log(error));
		axios
			.get(`${BACKEND_URL}/artisan/ratings/${lol}`, config)
			.then((res) => {
       
				const data = res.data.ratings;
				setReviews(data);
			})
			.catch((error) => console.log(error));
      
		axios
			.get(`${BACKEND_URL}/artisan/${lol}`, config)
			.then((res) => {
        console.log(res)
				const data = res.data.artisan;
				setData(data);
			})
			.catch((error) => console.log(error));
	}, []);
  console.log(reviews)
  return (
    <EmployerDetailPageStyle>
      <PaddedSectionStyles>
        <div className="x">
          <div className="nav">
            <Link href="/dashboard/artisan/jobs">
              <p className="lit">Hire Professionals</p>
            </Link>
            <GreyArrowRight />
            <p className="activ">View Professionals Profile</p>
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
              <h2> {data?.BusinessName}</h2>
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
                            <span>{reviews&&reviews.length}</span>
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
                        <p>Review Professional</p>
                      </ReviewBtnStyle>
                    </div>
                  </div>
                </div>
                <div className="mobile">
                  <div className="review">
                    <ReviewBtnStyle>
                      <ReviewIcon />
                      <p>Review Professional</p>
                    </ReviewBtnStyle>
                  </div>
                </div>
                <JobGridListAlt>
                  {currentTab == "Reviews" &&
                    reviews && reviews?.map((ele, index) => (
                      <ReviewComp key={index} {...ele} />
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
                    <p>{stats?.total_jobs_completed}</p>
                  </div>
                  <div className="fr">
                    <h4>Rating</h4>
                    <div className="rate">
                      <RatingIcon />
                      <p>{stats?.rating}</p>
                    </div>
                  </div>
                  <div className="fr">
                    <h4>Recommendations</h4>
                    <p>{stats?.total_job_recommendations}</p>
                  </div>
                  <div className="fr">
                    <h4>Location</h4>
                    <p>Lagos</p>
                  </div>
                </div>
                <div className="btn">
                    <button type="button" onClick={() => setShowHireArtisanModal(true)}>
                        <p>Hire Professional</p>
                        <SendIcon />
                    </button>
                </div>
                {showHireArtisanModal && <HireArtisanComp handleModalAction={cancelModal} cancelModal={() => setShowHireArtisanModal(false)} />}
              </div>
            </div>
          </div>
          <div className="similar">
            <h3 className="head">Similar Professionals</h3>
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
