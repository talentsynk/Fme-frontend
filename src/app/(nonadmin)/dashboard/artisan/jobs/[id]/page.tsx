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
"use client";
import {useState,useEffect} from 'react';
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { useRouter } from "next/navigation";
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
import { ButtonLoader, GreenButtonLoader } from '@/components/recovery/style';

const JobDetailPage = () => {

 
  const [data,setData]= useState<IEmployerData|null>(null)
  const router = useRouter();
  useEffect(() => {
		let token = Cookies.get("token");
    console.log(token)
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios
			.get(`${BACKEND_URL}/job/1`, config)
			.then((res) => {
        console.log(res)
				const data = res.data;
        // setHiringStatus(res.data.HiringStatus)
				setData(data);
			})
			.catch((error) => console.log(error));
	}, []);
  const [loading, setLoading] = useState(false); // Loading state
  const [applyLoading, setApplyLoading] = useState(false); // Loading state
  const handleSaveJob = async () => {
    let token = Cookies.get("token");
    setLoading(true); // Set loading 
    try {
      const response = await axios.post(
        `${BACKEND_URL}/job/save-apply/${data?.Id}`,
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
    setApplyLoading(true); // Set loading 
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

      console.log('Job saved successfully:', response.data);
      // Handle success (e.g., show a message to the user)
    } catch (error) {
      console.error('Error saving job:', error);
      // Handle error (e.g., show an error message to the user)
    }finally {
      setApplyLoading(false); // Set loading to false when request completes
    }
  };
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
              <button onClick={handleApplyJob} type="button" className="rounded-md w-[200px] h-[48px] font-bold flex justify-center items-center bg-[#E7F6EC] text-[#00932E]">
              {applyLoading ? <GreenButtonLoader /> : 'Apply Job for now'}
              </button>
              <button onClick={handleSaveJob} type="button" className="rounded-md font-bold w-[200px] h-[48px] flex justify-center items-center bg-[#EFF1F3] text-[#000000]">
                {loading ? <GreenButtonLoader /> : 'Save job for later'}
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
