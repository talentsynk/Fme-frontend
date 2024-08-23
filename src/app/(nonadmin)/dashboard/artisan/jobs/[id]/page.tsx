"use client";
import { Jobs } from "@/components/artisan/data";
import { JobComp } from "@/components/artisan/Job";
import { JobDetailPageStyle } from "@/components/artisan/Jobdetails/style";
import { LargeSVGBg, TagStyle } from "@/components/artisan/style";
import {
  GreyArrowRight,
  SmallBriefCaseIcon,
  TinyLocationIcon,
} from "@/components/icons/artisan/icons";
import { JobGridList } from "../../style";
import { PaddedSectionStyles } from "@/components/layout/style";
import Link from "next/link";
import { useRouter } from "next/navigation";

const JobDetailPage = () => {
  const router = useRouter();
  return (
    <JobDetailPageStyle>
      <PaddedSectionStyles>
        <div className="x">
          <div className="nav">
            <Link href="/dashboard/artisan/jobs">
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
              <div className="btm">
                <p>Posted by Oragon Confectionaries</p>
                <button
                  type="button"
                  onClick={() => router.push("/dashboard/artisan/jobs/employer/0")}
                >
                  View Profile
                </button>
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
              <button type="button" className="apply">
                Apply for job now
              </button>
              <button type="button" className="save">
                <p>Save job for later</p>
              </button>
            </div>
          </div>
          <div className="similar">
            <h3 className="head">Similar Job posts</h3>
            <JobGridList>
              {Jobs.slice(0, 3).map((ele, index) => (
                <JobComp key={index} {...ele} />
              ))}
            </JobGridList>
          </div>
        </div>
      </PaddedSectionStyles>
    </JobDetailPageStyle>
  );
};

export default JobDetailPage;
