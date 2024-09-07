interface IEmployerData{
  Status:string;
  Skills:string;
  Responsibilities:string;
  Description:string;
  EmployerFirstName:string;
  EmployerLastName:string;
  EmployerId:number;
  HiringStatus:boolean;
  Id:string;
  JobTitle:string;
  JobType:string;
  Location:string;
  Requirements:string;
  CreatedAt:string;
}
interface ISimilarJobs{
      Id: number;
      JobTitle: string;
      Description: string;
      Amount: string;
      JobType: string;
      Status: string;
}

"use client";
import { JobComp } from "@/components/artisan/Job";
import { JobDetailPageStyle } from "@/components/artisan/Jobdetails/style";
import { LargeSVGBg, TagStyle } from "@/components/artisan/style";
import {
  GreyArrowRight,
  SmallBriefCaseIcon,
  TinyLocationIcon,
} from "@/components/icons/artisan/icons";
import { PaddedSectionStyles } from "@/components/layout/style";
import { GreenButtonLoader } from '@/components/recovery/style';
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { JobGridList } from "../../style";

const JobDetailPage = ({ params }: { params: { id: string } }) => {
  const lol=params.id
 
 
  const [data,setData]= useState<IEmployerData|null>(null)
  const [similarJobs,setSimilarJobs]=useState<ISimilarJobs[]|null>(null)
  const router = useRouter();
  useEffect(() => {
		let token = Cookies.get("token");
    
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		axios
			.get(`${BACKEND_URL}/job/similar/${lol}`, config)
			.then((res) => {
        
				const data = res.data.jobs;
        // setHiringStatus(res.data.HiringStatus)
				setSimilarJobs(data);
			})
			.catch((error) => console.log(error));

		axios
			.get(`${BACKEND_URL}/job/${lol}`, config)
			.then((res) => {
       
				const data = res.data;
        // setHiringStatus(res.data.HiringStatus)
				setData(data);
			})
			.catch((error) => console.log(error));
	}, []);

  const responsibilitiesArray = data?.Responsibilities
  .split("\n")
  .filter(line => line.trim() !== "") // Remove empty lines
  .map(line => line.replace(/^[-\s]+/, "")); // Remove leading dashes and spaces
const requirementsArray = data?.Requirements
  .split("\n")
  .filter(line => line.trim() !== "") // Remove empty lines
  .map(line => line.replace(/^[-\s]+/, "")); // Remove leading dashes and spaces

  const [loading, setLoading] = useState(false); // Loading state
  const [applyLoading, setApplyLoading] = useState(false); // Loading state
  const handleSaveJob = async () => {
    let token = Cookies.get("token");
    setLoading(true); // Set loading 
    try {
      const response = await axios.post(
        `${BACKEND_URL}/job/save/${data?.Id}`,
        {
          job_id: data?.Id, 
          action: 'save',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Job saved successfully:', response.data);
      // Handle success (e.g., show a message to the user)
    } catch (error) {
      console.error('Error saving job:', error);
      // Handle error (e.g., show an error message to the user)
    }finally {
      setLoading(false); // Set loading to false when request completes
    }
  };
  const handleApplyJob = async () => {
    let token = Cookies.get("token");
    setApplyLoading(true); // Set loading state to true

    try {
      const response = await axios.post(
        `${BACKEND_URL}/job/apply/${data?.Id}`, 
        {
          job_id: data?.Id, 
          action: 'apply',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Job application submitted:', response.data);
      setInReview(true); 

    } catch (error) {
      console.error('Error applying for job:', error);

    } finally {
      setApplyLoading(false); 
    }
  };
console.log(data)
let buttonText: React.ReactNode='';
  let isDisabled = false;
  const [inReview, setInReview] = useState(false);

  if (inReview) {
    buttonText = 'In Review';
    isDisabled = true;
  } else {
    switch (data?.Status) { // Assuming `data.status` holds the value you are checking ("open", "completed", "closed")
      case 'open':
        buttonText = applyLoading ? <GreenButtonLoader /> : 'Apply Job for now';
        break;
      case 'completed':
        buttonText = 'Applied for Job';
        isDisabled = true;
        break;
      case 'closed':
        buttonText = 'Job Application Closed';
        isDisabled = true;
        break;
      default:
        buttonText = 'Apply Job for now'; // Fallback text
    }
  }


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
                {data?.JobTitle}
              </h3>
              <div className="btm">
                <p>Posted by {data?.EmployerFirstName} {data?.EmployerLastName}</p>
                <button
                  type="button"
                  onClick={() => router.push(`/dashboard/artisan/jobs/${data?.EmployerId}/profile`)}
                >
                  View Profile
                </button>
              </div>
            </div>
            <div className="text-cont">
              <div className="cont-one">
                <p>
                  {data?.Description}
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
                  <h4>JOB LOCATION</h4>
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
              </div>
            </div>
            <div className=" flex gap-4">
            <button
      onClick={handleApplyJob}
      type="button"
      className={`rounded-md w-[200px] h-[48px] font-bold flex justify-center items-center bg-[#E7F6EC] text-[#00932E] ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={isDisabled || applyLoading}
    >
      {buttonText}
    </button>
              <button onClick={handleSaveJob} type="button" className="rounded-md font-bold w-[200px] h-[48px] flex justify-center items-center bg-[#EFF1F3] text-[#000000]">
                {loading ? <GreenButtonLoader /> : 'Save job for later'}
              </button>
            </div>
          </div>
          <div className="similar">
            <h3 className="head">Similar Job posts</h3>
            <JobGridList>
              {similarJobs && similarJobs.slice(0, 3).map((ele, index) => (
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
