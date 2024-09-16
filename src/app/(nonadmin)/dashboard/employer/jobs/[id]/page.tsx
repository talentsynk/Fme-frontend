interface IEmployerData{
  Status:string;
  Skills:string;
  Responsibilities:string;
  Description:string;
  EmployerFirstName:string;
  EmployerId:string;
  HiringStatus:boolean;
  Id:number;
  JobTitle:string;
  JobType:string;
  Location:string;
  Requirements:string;
  CreatedAt:string;
  ApplicationStatus:string
}
"use client";
import { FlexAbsoluteModalStyles } from "@/components/fme/mda/styles";
import { ReviewModal } from "@/components/artisan/Employer";
import { JobDetailPageStyle } from "@/components/artisan/Jobdetails/style";
import { LargeSVGBg, TagStyle } from "@/components/artisan/style";
import { useSearchParams } from 'next/navigation'
import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import { CloseJobComp, SuspendStudentComp } from "@/components/fme/students/modal";
import {
  GreyArrowRight,
  SmallBriefCaseIcon,
  TinyLocationIcon,
} from "@/components/icons/artisan/icons";
import { VerifiedTick } from "@/components/landing/faqs/Svgs";
import { PaddedSectionStyles } from "@/components/layout/style";
import Link from "next/link";
import { useRouter } from "next/navigation";

const JobDetailPage = ({ params }: { params: { id: string } }) => {
  const lol=params.id
  console.log(lol)
  const [HiringStatus, setHiringStatus] = useState<boolean|null>(null);
  const router = useRouter();
  const [data, setData] = useState<IEmployerData|null>(null);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
	useEffect(() => {
		let token = Cookies.get("token");
		let role = Cookies.get("userRole");
    console.log(role)
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios
			.get(`${BACKEND_URL}/job/general/${lol}`, config)
			.then((res) => {
				const data = res.data;
        setHiringStatus(res.data.HiringStatus)
				setData(data);
			})
			.catch((error) => console.log(error));
	}, []);
  console.log(data)
  
  const responsibilitiesArray = data?.Responsibilities
    .split("\n")
    .filter(line => line.trim() !== "") // Remove empty lines
    .map(line => line.replace(/^[-\s]+/, "")); // Remove leading dashes and spaces
  const requirementsArray = data?.Requirements
    .split("\n")
    .filter(line => line.trim() !== "") // Remove empty lines
    .map(line => line.replace(/^[-\s]+/, "")); // Remove leading dashes and spaces

  const handleModalAction = () => {
    // Here you should update the job status based on the modal's action
    setHiringStatus(prevState => !prevState); // Toggle the job status
    setShowSuspendModal(false);
  };
  return (
    <JobDetailPageStyle>
      <PaddedSectionStyles>
        <div className="x">
          <div className="nav">
            <Link href="/dashboard/employer">
              <p className="lit">Job Portal</p>
            </Link>
            <GreyArrowRight />
            <p className="activ">View Job Details</p>
          </div>
          <div className="body">
            <div className="head">
              <LargeSVGBg>
                <SmallBriefCaseIcon />
              </LargeSVGBg>
              <h3>
                {data?.JobTitle}
              </h3>
              <div className=" flex gap-3 items-center">
              <div className="relative flex justify-center items-center w-10 h-10 rounded-[50%] bg-[rgba(52,202,165,0.1)] ">
									{/* <p>{fullName.slice(0, 2).toUpperCase()}</p> */}
									<p className="font-semibold text-[16px] leading-[24px] text-[#101928]">OM</p>
                  <VerifiedTick />
								</div>
                <p className=" font-bold text-[16px] leading-[24px] text-[#1A1A1A]">Posted by me</p>
                <Link href={`/dashboard/employer/jobs/${data?.EmployerId}/applications`} className=" px-4 py-2 rounded bg-[#00932E] text-white text-sm font-bold" >
                  View Applications
                </Link>
              </div>
            </div>
            <div className="text-cont">
              <div className="cont-one">
                <p>{data?.Description}
                </p>
                <div className="my-4">
                <h5 className=" text-black font-medium">Responsibilities</h5>
               
              <ul className="list-disc list-inside pl-4">
      {responsibilitiesArray && responsibilitiesArray.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
                </div>
              <div className="">
              <h5 className=" text-black font-medium">Requirements and skills</h5>
              <ul className="list-disc list-inside pl-4">
      {requirementsArray && requirementsArray.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
              </div>

              </div>
              <div className="cont-two">
                <div className="gas">
                  <h4>JOB TYPE</h4>
                  <TagStyle>
                    <p>{data?.JobType}</p>
                  </TagStyle>
                </div>
                <div className="gas">
                  <h4>LOCATION</h4>
                  <TagStyle>
                    <TinyLocationIcon />
                    <p>{data?.Location}</p>
                  </TagStyle>
                </div>
                <div className="gas">
                  <h4>DATE POSTED</h4>
                  <TagStyle>
                    <p>{data?.CreatedAt.substring(0, 10)}</p>
                  </TagStyle>
                </div>
                <div className="gas">
                  <h4>SKILL REQUIRED</h4>
                  <div className="sk">
                    <TagStyle>
                      <p>{data?.Skills}</p>
                    </TagStyle>
                    <TagStyle>
                      <p>{data?.Skills}</p>
                    </TagStyle>
                  </div>
                </div>
              {data?.Status=="ongoing"&&<div className=" bg-[#E7f6EC] rounded-[12px] p-4 space-y-4">
                <h3 className=" text-[#101928] font-bold ">Recommend Artisan</h3>
                <p className=" text-sm text-black leading-5 font-normal">Add reviews about the artisans services and job delivery to help boost their credential and competence.</p>
                <button onClick={() => setShowReviewModal(true)}  className=" text-sm text-[#00932E] leading-5 font-bold">Write a Recommendation</button>
              </div>}
              {showReviewModal && (
        <FlexAbsoluteModalStyles>
          <ReviewModal
            role="employer"
            closeModal={() => setShowReviewModal(false)}
            id={data?.Id}
            
          />
        </FlexAbsoluteModalStyles>
      )}
              </div>
            </div>
            <div className="btns">
              <button type="button" className="apply" disabled={data?.Status=="completed"||data?.Status=="ongoing"}  onClick={() => setShowSuspendModal(true)}>
              {HiringStatus ? "Close Job Application" : "Open Job Application"}
              </button>
            </div>
          </div>
          {showSuspendModal && <CloseJobComp id={data?.Id}    handleModalAction={handleModalAction}
          HiringStatus={HiringStatus} cancelModal={() => setShowSuspendModal(false)} />}
        </div>
      </PaddedSectionStyles>
    </JobDetailPageStyle>
  );
};

export default JobDetailPage;
