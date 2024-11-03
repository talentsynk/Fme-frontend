interface IArtisan{
  AverageRating:number;
  BusinessDescription:string;
  BusinessName:string;
  ID:number;
  Skill:string;
}
interface IStats{
  rating:any;
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
import { ContactCard, SmallRedIcon } from "@/components/landing/faqs/Svgs";
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
import { AirplaneIcon } from "@/components/landing/faqs/Svgs";
import { CloseHireArtisanComp,SelectArtisanComp,HireProfessionalComp } from "@/components/fme/students/modal";

const ArtisanDetailPage = ({ params }: { params: { artisan: string } }) => {
  const lol=params.artisan
  const [artisanTabSwitches, setArtisanTabSwitches] = useState(
    ArtisanProfileTabSwitches
  );
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showHireArtisanModal, setShowHireArtisanModal] = useState(false);
  const [showHireSelectModal, setShowHireSelectModal] = useState(false);
  const [showHireProfessionalModal, setShowHireProfessionalModal] = useState(false);
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
  
  const handleModalAction = () => {
    // Here you should update the job status based on the modal's action
    // setHiringStatus(prevState => !prevState); // Toggle the job status
    setShowHireArtisanModal(false);
  };
  const handleModAction = () => {
    // Here you should update the job status based on the modal's action
    // setHiringStatus(prevState => !prevState); // Toggle the job status
    setShowSuspendModal(false);
  };
  const handleSelectAction = () => {
    // Here you should update the job status based on the modal's action
    // setHiringStatus(prevState => !prevState); // Toggle the job status
    setShowHireSelectModal(false);
  };
  const handleProfessionalAction = () => {
    // Here you should update the job status based on the modal's action
    // setHiringStatus(prevState => !prevState); // Toggle the job status
    setShowHireProfessionalModal(false);
  };
  console.log(data)
  return (
    <EmployerDetailPageStyle>
      <PaddedSectionStyles>
        <div className="x">
          <div className="nav">
            <Link href="/dashboard/employer/hire">
              <p className="lit">Hire Professionals</p>
            </Link>
            <GreyArrowRight />
            <p className="activ">View Professionals Profile</p>
          </div>
          <EmployerBannerStyle>
            <div className="relative flex justify-center items-center w-10 h-10 rounded-[50%] bg-[rgba(52,202,165,0.1)]">
              {/* <Image
                src="/images/frame_2.png"
                width={120}
                height={120}
                alt="avatar"
              /> */}
              <p>{data?.BusinessName.slice(0, 2).toUpperCase()}</p>
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
                  {/* <div className="desktop">
                    <div className="review">
                      <ReviewBtnStyle onClick={() => setShowReviewModal(true)}>
                        <ReviewIcon />
                        <p>Review Professional</p>
                      </ReviewBtnStyle>
                    </div>
                  </div> */}
                </div>
                {/* <div className="mobile">
                  <div className="review">
                    <ReviewBtnStyle>
                      <ReviewIcon />
                      <p>Review Professional</p>
                    </ReviewBtnStyle>
                  </div>
                </div> */}
                <JobGridListAlt>
                  {currentTab == "Recommendations" &&
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
                      <p>{data?.Skill}</p>
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
                      <p>{Math.round(stats?.rating)}</p>
                    </div>
                  </div>
                  <div className="fr">
                    <h4>Recommendations</h4>
                    <p>{stats?.total_job_recommendations}</p>
                  </div>
                  {/* <div className="fr">
                    <h4>Location</h4>
                    <p>Lagos</p>
                  </div> */}
                </div>
                {/* <div className="flex gap-2 pt-8 justify-center">
                    <button onClick={() => setShowSuspendModal(true)} className="rounded-md text-sm gap-2 font-bold text-[#FA0000]  bg-[#FFE5E5] md:w-[200px] md:h-[48px] w-[160px] h-[40px] flex justify-center items-center"><SmallRedIcon /> <p className="">Decline Artisan</p></button>
    <button onClick={() => setShowHireSelectModal(true)} className=" rounded-md  gap-2 text-sm font-bold text-white bg-[#00932E] md:w-[90%] md:h-[48px] w-[90%] h-[40px] flex justify-center items-center"> <p className="">Select Professional</p><AirplaneIcon /></button>
                </div> */}
                <div className=" flex gap-1">
    <button onClick={() => setShowHireArtisanModal(true)} className=" rounded-md  gap-2 text-sm font-bold text-white bg-[#00932E] md:w-[90%] md:h-[48px] w-[90%] h-[40px] flex justify-center items-center"> <p className="">Contact Professional</p><AirplaneIcon /></button>
                    {/* <div onClick={() => setShowHireArtisanModal(true)} className=" flex justify-center items-center w-12 h-12 rounded-[12px] bg-[#E7F6EC] "><ContactCard /></div> */}
                </div>
                {showHireSelectModal && <SelectArtisanComp handleModAction={handleSelectAction} cancelModal={() => setShowHireSelectModal(false)} />}
                {showSuspendModal && <CloseHireArtisanComp handleModAction={handleModAction} cancelModal={() => setShowSuspendModal(false)} />}
                {showHireProfessionalModal && <HireProfessionalComp artisanId={data?.ID} handleModAction={handleProfessionalAction} cancelModal={() => setShowHireProfessionalModal(false)} />}
  {showHireArtisanModal && <HireArtisanComp artisanId={data?.ID} handleModalAction={handleModalAction} cancelModal={() => setShowHireArtisanModal(false)} />}
              </div>
            </div>
          </div>
          {/* <div className="similar">
            <h3 className="head">Similar Professionals</h3>
            <SimilarCompGridList>
              {[1, 2, 3].map((ele, index) => (
                <SimilarComp key={index} />
              ))}
            </SimilarCompGridList>
          </div> */}
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
