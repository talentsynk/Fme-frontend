interface IEmployerProfile{
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    NIN: string;
    LGA: string;
    UserId: number;
}
interface ISavedData{
  JobTitle:string;
  Description:string;
  Id:number|null|undefined;
  Amount:number;
  JobType:string;
  Location?:string
  Status:string;
}
interface IStats{
  rating: any;
  total_jobs_completed: number;
  total_jobs_posted: number;
  total_recommendations: number;
}
interface ISimilarEmployer{
  FirstName:string;
  LGA:string;
  LastName:string;
  NIN:string;
  PhoneNumber:string;
  State:string;
  UserId:number;
  Id:number;
}
interface IReview{
  CreatedAt:string;
  Rating:number;
  EmployerID:number;
  Description:string;
  FirstName:string;
  LastName:string;
}

'use client'
import { useState,useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { GreyArrowRight } from "@/components/icons/artisan/icons";
import { SmallRedIcon } from "@/components/landing/faqs/Svgs";
import { RecommendArtisans } from "@/components/landing/faqs/Svgs";
import { GoldStar, SmallVerified } from "@/components/landing/faqs/Svgs";
import SimilarEmployer from "@/components/employer/SimilarEmployer";
import { Stats,Bigtar } from "@/components/landing/faqs/Svgs";
import { JobsPostedCard, SavedOragonCard } from "@/components/landing/OragonCard";
import { Paginator } from "@/components/fme/paginator/Paginator";
import Recommendations from "@/components/employer/Recommendations";
import { VerifiedTick } from "@/components/landing/faqs/Svgs";


const EmployersProfile = ({ params }: { params: { id: string } }) => {
  const router=useRouter()
  const [savedData,setSavedData]= useState<IEmployerProfile|null>(null)
  const [similarEmployers,setSimilarEmployers]= useState<ISimilarEmployer[]|null>(null)
  const [review,setReview]= useState<IReview[]|null>(null)
  const lol= params.id
    const [activeTab, setActiveTab] = useState('reviews');
      const [data,setData]= useState<ISavedData[]|null>(null)
      const [stats,setStats]=useState<IStats|null>(null)
      useEffect(() => {
        let token = Cookies.get("token");
        console.log(token)
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .get(`${BACKEND_URL}/employer/similar/${lol}`, config)
          .then((res) => {
           console.log(res)
            const data = res.data.employers;
            setSimilarEmployers(data);
          })
          .catch((error) => console.log(error));
          
        axios
          .get(`${BACKEND_URL}/employer/profile-stats/${lol}`, config)
          .then((res) => {
           
            const data = res.data;
            setStats(data);
          })
          .catch((error) => console.log(error));

          axios
          .get(`${BACKEND_URL}/employer/${lol}`, config)
          .then((res) => {
            
            const data = res.data.employer;
            setSavedData(data);
          })
          .catch((error) => console.log(error));
          
        axios
          .get(`${BACKEND_URL}/employer/jobs/${lol}`, config)
          .then((res) => {
            
            const data = res.data.jobs;
            setData(data);
          })
          .catch((error) => console.log(error));

        axios
          .get(`${BACKEND_URL}/artisan/ratings/${lol}`, config)
          .then((res) => {
            
            const data = res.data.ratings;
            setReview(data);
          })
          .catch((error) => console.log(error));
      }, []);
      console.log(review)

      const [pageNo, setPageNo] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (pageNo - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data&&data.slice(startIndex, endIndex);
      
   
  return (
    <section className="">
        <div className=" flex gap-2 items-center p-2 ">
            <Link href="/dashboard/artisan/jobs">
              <p className="text-[#BFBFBF] text-[12px] md:text-[16px] font-medium leading-6">Job Portal</p>
            </Link>
            <GreyArrowRight />
            <Link href={`/dashboard/artisan/jobs/${lol}`}>
              <p className="text-[#BFBFBF] text-[12px] md:text-[16px] font-medium leading-6">View job details</p>
            </Link>
            <GreyArrowRight />
            <p  className="text-[#00932E] text-[12px] md:text-[16px] font-bold leading-6">View Employer profile</p>
          </div>
        <div className="spiral mb-4 bg-[#00932E] p-4 rounded-lg flex flex-col justify-center items-center gap-4">
    {/* <Image src="/images/landing/detective.png" width={120} height={120} alt="review " /> */}
    <div className="relative flex justify-center items-center w-10 h-10 rounded-[50%] bg-[#E7F6EC] ">
                                    {/* <p>{fullName.slice(0, 2).toUpperCase()}</p> */}
                                    <p className="font-semibold text-[16px] leading-[24px] text-[#101928]">{savedData?.FirstName[0]}{savedData?.LastName[0]}</p>
                <VerifiedTick />
        </div>
    <h4 className=" text-white font-bold text-lg">{savedData?.FirstName} {savedData?.LastName}</h4>
    <div className=" rounded-[5px] bg-[#E4F5EA] w-[82px] h-[26px] flex gap-1 justify-center items-center"><SmallVerified /><p className=" text-[12px] text-[#00932E]  font-medium">Verified</p></div>
  </div>
  <section className="">
  
  <section className=" flex gap-2 flex-col md:flex-row p-2">
  <div className=" space-y-2 md:w-[60%]">
  <div className=" flex justify-between items-center py-2">
  <div className="flex  items-center p-2">
      <button
        className={`text-lg font-semibold px-4 py-2 ${
          activeTab === 'jobs' ? 'text-[#00932E] border-b-[#00932E] border-solid border-b-[1px]'  : 'text-gray-400'
        }`}
        onClick={() => setActiveTab('jobs')}
      >
        Jobs Posted ({data&&data.length})
      </button>
      <button
        className={`text-lg font-semibold px-4 py-2 ${
          activeTab === 'reviews' ? 'text-[#00932E] border-b-[#00932E] border-solid border-b-[1px]' : 'text-gray-400'
        }`}
        onClick={() => setActiveTab('reviews')} 
      >
        Reviews ({review&&review.length})
      </button>
  
    </div>
    
  </div>
  {
      activeTab=='jobs'?(<div className={`flex flex-col gap-2 ${data?.length==0&&" justify-center items-center"}`}>
              
      {paginatedData && paginatedData.length>0?(
        paginatedData.map(dum=>(<JobsPostedCard key={dum.Id} {...dum} />))
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
      <Paginator
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
          />
    </div>):(<div>{review && review.map(rev=>(<Recommendations key={rev.CreatedAt} {...rev} />))}</div>)
    }

</div>
<div className="p-4 space-y-4 rounded-[10px] border-solid border-[1px] border-[#EFF1F3] md:w-[40%]">

  <div className=" flex gap-1 items-center">
    <Stats />
  <h5 className=" text-black font-bold text-[15px] ">STATS</h5>
  </div>
  <div className=" flex justify-between text-black text-[13px] font-medium">
    <p className="">Jobs Posted</p>
    <p className="">{stats?.total_jobs_posted}</p>
  </div>
  <div className=" flex justify-between text-black text-[13px] font-medium">
    <p className="">Project Completed</p>
    <p className="">{stats?.total_jobs_completed}</p>
    
  </div>
  <div className=" flex justify-between text-black text-[13px] font-medium">
    <p className="">Ratings</p>
    <div className="flex gap-1 items-center">
      <GoldStar />
    <p className="">{Math.round(stats?.rating)}</p>
    </div>
  </div>
  <div className=" flex justify-between text-black text-[13px] font-medium">
    <p className="">Recommendations</p>
    <p className="">{stats?.total_recommendations}</p>
  </div>
  </div>
  </section>
  </section>
  <div className="">
    <h3 className="leading-8 font-bold px-4 text-[#979797] text-[24px] my-2">Similar Employer Profile</h3>
    
    <div className="grid-container grid gap-8 px-4">
    {similarEmployers && similarEmployers.map(ele=>(<SimilarEmployer key={ele.Id} {...ele} />))}
    </div>
  </div>
       </section>
  )
}

export default EmployersProfile;
