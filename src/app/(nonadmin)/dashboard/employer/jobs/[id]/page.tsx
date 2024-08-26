"use client";
import { JobDetailPageStyle } from "@/components/artisan/Jobdetails/style";
import { LargeSVGBg, TagStyle } from "@/components/artisan/style";
import { useState } from "react";
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

const JobDetailPage = () => {
  const router = useRouter();
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const cancelModal=()=>{
    console.log(1)
  }
  // const { id } = router.query;

  const responsibilities=["Gather and evaluate user requirements in collaboration with product managers and engineers","Illustrate design ideas using storyboards, process flows and sitemaps","Design graphic user interface elements, like menus, tabs and widgets","Build page navigation buttons and search fields","Develop UI mockups and prototypes that clearly illustrate how sites function and look like"]
  const requirements=["Proven work experience as a UI/UX Designer or similar role","Portfolio of design projects","Knowledge of wireframe tools (e.g. Wireframe.cc and InVision)","Up-to-date knowledge of design software like Adobe Illustrator and Photoshop","Team spirit; strong communication skills to collaborate with various stakeholders"]
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
                Looking for a skilled Fashion Designer for a Couture Dress
              </h3>
              <div className=" flex gap-3 items-center">
              <div className="relative flex justify-center items-center w-10 h-10 rounded-[50%] bg-[rgba(52,202,165,0.1)] ">
									{/* <p>{fullName.slice(0, 2).toUpperCase()}</p> */}
									<p className="font-semibold text-[16px] leading-[24px] text-[#101928]">OM</p>
                  <VerifiedTick />
								</div>
                <p className=" font-bold text-[16px] leading-[24px] text-[#1A1A1A]">Posted by me</p>
                <Link href={`/dashboard/employer/jobs/1/applications`} className=" px-4 py-2 rounded bg-[#00932E] text-white text-sm font-bold" >
                  View Applications
                </Link>
              </div>
            </div>
            <div className="text-cont">
              <div className="cont-one">
                <p>
                  We are looking for a UI/UX Designer to turn our software into
                  easy-to-use products for our clients. UI/UX Designer
                  responsibilities include gathering user requirements,
                  designing graphic elements and building navigation components.
                  To be successful in this role, you should have experience with
                  design software and wireframe tools. If you also have a
                  portfolio of professional design projects that includes work
                  with web/mobile applications, we’d like to meet you.
                  Ultimately, you’ll create both functional and appealing
                  features that address our clients’ needs and help us grow our
                  customer base.
                  <br />
                  Responsibilities: Gather and evaluate user requirements in
                  collaboration with product managers and engineers Illustrate
                  design ideas using storyboards, process flows and sitemaps
                  Design graphic user interface elements, like menus, tabs and
                  widgets Build page navigation buttons and search fields
                  Develop UI mockups and prototypes that clearly illustrate how
                  sites function and look like Create original graphic designs
                  (e.g. images, sketches and tables) Prepare and present rough
                  drafts to internal teams and key stakeholders Identify and
                  troubleshoot UX problems (e.g. responsiveness) Conduct layout
                  adjustments based on user feedback Adhere to style standards
                  on fonts, colors and images
                </p>
                <div className="my-4">
                <h5 className=" text-black font-medium">Responsibilities</h5>
                <ul className="list-disc list-inside pl-4">
                  {responsibilities.map(res=>(<li key={res}>{res}</li>))}
              </ul>
                </div>
              <div className="">
              <h5 className=" text-black font-medium">Requirements and skills</h5>
                <ul className="list-disc list-inside pl-4">
                  {requirements.map(req=>(<li key={req}>{req}</li>))}
              </ul>
              </div>

              </div>
              <div className="cont-two">
                <div className="gas">
                  <h4>JOB TYPE</h4>
                  <TagStyle>
                    <p>Short-term role</p>
                  </TagStyle>
                </div>
                <div className="gas">
                  <h4>JOB LOCATION</h4>
                  <TagStyle>
                    <TinyLocationIcon />
                    <p>Oyo State</p>
                  </TagStyle>
                </div>
                <div className="gas">
                  <h4>DATE POSTED</h4>
                  <TagStyle>
                    <p>21st June, 2024</p>
                  </TagStyle>
                </div>
                <div className="gas">
                  <h4>SKILL REQUIRED</h4>
                  <div className="sk">
                    <TagStyle>
                      <p>#FashionDesign</p>
                    </TagStyle>
                    <TagStyle>
                      <p>#Tailoring</p>
                    </TagStyle>
                  </div>
                </div>
              </div>
            </div>
            <div className="btns">
              <button type="button" className="apply"  onClick={() => setShowSuspendModal(true)}>
                Close Job Application
              </button>
            </div>
          </div>
          {showSuspendModal && <CloseJobComp handleModalAction={cancelModal} cancelModal={() => setShowSuspendModal(false)} />}
        </div>
      </PaddedSectionStyles>
    </JobDetailPageStyle>
  );
};

export default JobDetailPage;
