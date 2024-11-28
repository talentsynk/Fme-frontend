interface IEmployerData{
  Name:string;
  Description:string;
  ApplicationStatus:string;
  Id:number|null|undefined;
}
interface IArtisanStats{
  total_applied_jobs: number,
  total_job_recommendations: number;
  total_jobs_completed: number;
}
interface ISavedData{
  Name:string;
  Description:string;
  Id:number|null|undefined;
  Amount:number;
  JobType:string;
  Location:string
}
interface IUser{
  Email:string;
  FirstName:string;
  LastName:string;
}
'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/config";
import ProgressBar from "@/components/artisan/ProgressBar";
import { OragonCard, SavedOragonCard } from "@/components/landing/OragonCard";
import { Bag, BigStar, Bigtar, GreenBag, Like, X } from "@/components/landing/faqs/Svgs";
import { Paginator } from "@/components/fme/paginator/Paginator";



export default function ArtisansHome(){
  
  const [userData,setUserData]=useState<IUser|null>(null)

  const router = useRouter();
  const [data,setData]= useState<IEmployerData[]|null>(null)
  const [savedData,setSavedData]= useState<ISavedData[]|null>(null)
  const [artisanStats,setArtisanStats]=useState<IArtisanStats|null>(null)
  console.log(1)
	useEffect(() => {
		let token = Cookies.get("token");
    
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios
			.get(`${BACKEND_URL}/artisan/job-stats`, config)
			.then((res) => {
        
				const data = res.data;
				setArtisanStats(data)
			})
			.catch((error) => console.log(error));
		axios
			.get(`${BACKEND_URL}/job/applied-jobs`, config)
			.then((res) => {
        
				const data = res.data.jobs;
				setData(data);
			})
			.catch((error) => console.log(error));
		axios
			.get(`${BACKEND_URL}/job/saved-jobs`, config)
			.then((res) => {
        
				const data = res.data.jobs;
				setSavedData(data);
			})
			.catch((error) => console.log(error));
		axios
			.get(`${BACKEND_URL}/artisan/me`, config)
			.then((res) => {
        
				const data = res.data.artisan;
				setUserData(data);
			})
			.catch((error) => console.log(error));
	}, []);
  console.log(userData)
 
  
  
const  [showProfile,setShowProfile]=useState(true)

const cancelProfile=()=>{
  setShowProfile(false)
}

const [pageNo, setPageNo] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (pageNo - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data&&data.slice(startIndex, endIndex);

const [SpageNo, setSPageNo] = useState(1);
  const SitemsPerPage = 5;
  const SstartIndex = (SpageNo - 1) * SitemsPerPage;
  const SendIndex = SstartIndex + SitemsPerPage;
  const SpaginatedData = savedData&&savedData.slice(SstartIndex, SendIndex);


    return (
        <section className="bg-white md:px-10 p-4">
        <h2 className=" text-[#191b1c] text-[24px] leading-[32px] font-bold">👋 Hello {userData?.FirstName},</h2>
        <p className=" text-[#626C70] my-4 font-medium text-sm leading-[20px]">Welcome to your dashboard, this is where you get an overview and analytics of all your activities.</p>
       {/* {showProfile&& <section className=" bg-black humanity md:h-[270px] h-[330px] rounded-[10px] py-4 p-2 flex flex-col justify-between">
          <div className=" flex justify-between">
            <div className=" flex flex-col md:flex-row md:items-center gap-2">
            <ProgressBar progress={80} />
            <h3 className=" md:text-[18px] text-[16px] text-white leading-[24px] font-bold">80% completed</h3>
            </div>
            <div onClick={cancelProfile} className=""><X /></div>
          </div>
          <div className=" flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 md:items-center">
          <div className=" space-y-2">
            <h3 className="md:text-[24px] text-[18px] leading-[24px] font-medium md:leading-[32px] text-white md:font-bold">Update your profile</h3>
            <p className=" md:text-[16px] text-[12px] leading-[17px]  md:leading-[24px] text-white font-medium">To gain more visibility and credibility, update your profile here to gain a higher chance of being eligible to employers</p>
          </div>
          <Link href="/dashboard/profile"><button className="w-fit bg-[#00932E] rounded-md px-4 py-2 text-sm md:text-[16px] leading-[24px] text-white font-medium md:font-bold">Update Profile</button></Link>
          </div>
        </section>} */}
        <section className="border border-[#E4F5EA] border-solid p-4 py-6 rounded-[10px]">
          <h3 className=" text-[24px] mb-2 font-bold leading-[32px] text-black">Dashboard</h3>
          <div className=" flex flex-col md:flex-row md:justify-between gap-4 items-center md:items-start">
            <div className="md:w-[33%] border border-[#E4F5EA] border-solid w-[95%] flex flex-col gap-4 p-4 bg-white rounded-[12px]">
              <div className=" w-[37px] h-[36px] bg-[#E7F6EC] rounded flex justify-center items-center"><Bag /></div>
              <h6 className=" text-sm text-black font-medium">Total Jobs applied</h6>
              <h5 className=" text-[20px] font-medium leading-[30px]">{artisanStats?.total_applied_jobs}</h5>
              </div>
            <div className="md:w-[33%] border border-[#E4F5EA] border-solid w-[95%] flex flex-col gap-4 p-4 bg-white rounded-[12px]">
            <div className=" w-[37px] h-[36px] bg-[#E7F6EC] rounded flex justify-center items-center"><Like /></div>

              <h6 className=" text-sm text-black font-medium">Total Recommendations</h6>
              <h5 className="">{artisanStats?.total_job_recommendations}</h5>
              </div>
            <div className="md:w-[33%] border border-[#E4F5EA] border-solid w-[95%] flex flex-col gap-4 p-4 bg-white rounded-[12px]">
            <div className=" w-[37px] h-[36px] bg-[#E7F6EC] rounded flex justify-center items-center"><Bag /></div>
              <h6 className=" text-sm text-black font-medium">Total Jobs completed</h6>
              <h5 className="text-[20px] font-medium leading-[30px]">{artisanStats?.total_jobs_completed}</h5>
              </div>
          </div>
        </section>
        <section className=" flex flex-col md:flex-row justify-between py-8">
          <section className={`p-4 md:w-[55%] bg-[#E7F6EC] rounded-[10px] ${data && data?.length>0?"h-fit":""}  `}>
            <h4 className=" text-[18px] leading-[24px] mb-4 font-bold text-black">Jobs applied for</h4>
            <section className={`${data?.length==0&&" flex w-full justify-center items-center my-auto h-full"}`}>

            <div className={`w-full flex flex-col gap-2 ${data?.length==0&&" justify-center items-center"}`}>
              
            {paginatedData && paginatedData.length>0?(
                paginatedData?.map(dum=>(<OragonCard key={dum.Id} {...dum} />))
              ):(
                <section className=" flex justify-center items-center flex-col gap-8">
                    <div className=" h-[100px] w-[100px] flex justify-center items-center rounded-[32px] bg-customColorWithOpacity ">
                      <GreenBag />
                      {/* <Image src="/images/landing/Suitcase.svg" width={48} height={48} alt="" /> */}
                    </div>
                      <p className=" md:w-1/2 text-center text-[16px] leading-[24px] text-black font-medium">Sorry but you haven’t applied for any job yet.
To apply for a job click on this button </p>
                      <button onClick={()=>router.push('/dashboard/artisan/jobs')} className="w-[200px] h-[48px] rounded-[6px] bg-[#00932E] text-white font-bold">Apply for Jobs</button>
                </section>
              )}
              
            </div>
           {data ? <Paginator
            value={pageNo}
           incrementFunc={() => {
    if (data && endIndex < data.length) {
      setPageNo(pageNo + 1);
    }
  }}
            decrementFunc={() => {
          if (pageNo > 1) {
            setPageNo(pageNo - 1);
          }
        }}
          />:""}
            </section>
          </section>
          <section className="p-4 md:w-[42%]  rounded-[10px]  ">
            <h4 className=" text-[18px] leading-[24px] mb-4 font-bold flex text-black"><BigStar />Jobs saved for later</h4>
            <section className={`${savedData?.length==0&&" flex justify-center items-center my-auto h-full"}`}>

            <div className={`flex flex-col gap-2 ${savedData?.length==0&&" justify-center items-center"}`}>
              
              {SpaginatedData && SpaginatedData.length>0?(
                SpaginatedData.map(dum=>(<SavedOragonCard key={dum.Id} {...dum} />))
              ):(
                <section className=" flex justify-center items-center flex-col gap-8">
                    <div className=" h-[100px] w-[100px] flex justify-center items-center rounded-[32px] bg-customColorWithOpacity ">
                      <Bigtar />
                    </div>
                      <p className=" md:w-1/2 text-center text-[16px] leading-[24px] text-black font-medium">Sorry but you haven’t saved any job for later yet.
To get started click on this button</p>
                      <button onClick={()=>router.push('/dashboard/artisan/jobs')} className="w-[200px] h-[48px] rounded-[6px] bg-[#00932E] text-white font-bold">Apply for Jobs</button>
                </section>
              )}
            </div>
            {savedData?<Paginator
            value={SpageNo}
           incrementFunc={() => {
    if (savedData && SendIndex < savedData.length) {
      setSPageNo(SpageNo + 1);
    }
  }}
            decrementFunc={() => {
          if (SpageNo > 1) {
            setSPageNo(SpageNo - 1);
          }
        }}
          />:""}
            </section>
            
          </section>
        </section>
      </section>

    )
}