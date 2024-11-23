interface IEmployerData{
  JobTitle:string;
  Description:string;
  Status:string;
  Id:number|null|undefined;
  Amount:number;
  JobType:string;
}
interface IEmployerStats{
  total_jobs_completed: number,
  total_job_posted: number;
  total_artisan_employed: number;
}
interface IUser{
  Email:string;
  FirstName:string;
  LastName:string;
  PhoneNumber:string;
}
'use client'
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { BACKEND_URL } from "@/lib/config";
import Cookies from "js-cookie";
import Image from "next/image";
import { EmployersOragonCard } from "@/components/landing/OragonCard";
import { Bag, Hands, Like, Search, WhiteBag } from "@/components/landing/faqs/Svgs";
import { Paginator } from "@/components/fme/paginator/Paginator";


const EmployerHome = () => {
  
  const router=useRouter()


  const [employerStats,setEmployerStats]=useState<IEmployerStats|null>(null)
  const [data,setData]= useState<IEmployerData[]|null>(null)
  const [user,setUser]=useState<IUser|null>(null)


	useEffect(() => {
		let token = Cookies.get("token");

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios
			.get(`${BACKEND_URL}/employer/dash-stats`, config)
			.then((res) => {
       
				
				setEmployerStats(res.data);
			})
			.catch((error) => console.log(error));

		axios
			.get(`${BACKEND_URL}/job/my-jobs`, config)
			.then((res) => {
				const data = res.data.jobs;
				setData(data);
			})
			.catch((error) => console.log(error));
		axios
			.get(`${BACKEND_URL}/employer/get-employer`, config)
			.then((res) => {
				const data = res.data.employer;
				setUser(data);
			})
			.catch((error) => console.log(error));
	}, []);

  const [pageNo, setPageNo] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (pageNo - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data&&data.slice(startIndex, endIndex);

  return (
    <section className=" p-4 md:px-10">
    <h2 className="text-[#191b1c] text-[24px] leading-[32px] font-bold">👋 Hey, {user?.FirstName}.</h2>
    <p className="text-[#626C70] my-4 font-medium text-sm leading-[20px]">Here is all your Relik analytics overview</p>
    <section className="border border-[#E4F5EA] border-solid p-4 py-6 rounded-[10px]">
      <h2 className="text-[24px] mb-2 font-bold leading-[32px] text-black">Dashboard</h2>
      <div className=" flex  flex-col md:flex-row md:justify-between gap-4 md:gap-0 items-center md:items-start">
        <div className="md:w-[33%] border border-[#E4F5EA] border-solid w-[95%] flex flex-col gap-4 p-4 bg-white rounded-[12px]">
        <div className=" w-[37px] h-[36px] bg-[#E7F6EC] rounded flex justify-center items-center"><Bag /></div>
          <h6 className=" text-sm text-black font-medium">Total Artisans employed</h6>
          <h5 className=" text-[20px] font-medium leading-[30px]">{employerStats?.total_artisan_employed}</h5>
          </div>
        <div className="md:w-[33%] border border-[#E4F5EA] border-solid w-[95%] flex flex-col gap-4 p-4 bg-white rounded-[12px]">
        <div className=" w-[37px] h-[36px] bg-[#E7F6EC] rounded flex justify-center items-center"><Like /></div>
          <h6 className=" text-sm text-black font-medium">Total Jobs Posted</h6>
          <h5 className="">{employerStats?.total_job_posted}</h5>
          </div>
        <div className="md:w-[33%] border border-[#E4F5EA] border-solid w-[95%] flex flex-col gap-4 p-4 bg-white rounded-[12px]">
        <div className=" w-[37px] h-[36px] bg-[#E7F6EC] rounded flex justify-center items-center"><Bag /></div>
          <h6 className=" text-sm text-black font-medium">Total Jobs Completed</h6>
          <h5 className="text-[20px] font-medium leading-[30px]">{employerStats?.total_jobs_completed}</h5>
          </div>
      </div>
    </section>
    <section className=" flex flex-col md:flex-row justify-between py-8">
      <section className={`md:p-4  md:w-[55%] rounded-[10px] ${data&&data?.length>0?"h-fit":""}  `}>
            <h4 className=" text-[18px] leading-[24px] mb-4 font-bold text-black">Jobs Posted</h4>
            <section className={`${data && data.length==0&&" flex justify-center items-center my-auto h-full"}`}>

            <div className={`flex flex-col gap-4 ${data?.length==0&&" justify-center items-center"}`}>
              
              {paginatedData && paginatedData.length>0?(
                paginatedData?.map(dum=>(<EmployersOragonCard key={dum.Id} {...dum} />))
              ):(
                <section className=" flex justify-center items-center flex-col gap-8">
                    <div className=" h-[100px] w-[100px] flex justify-center items-center rounded-[32px] bg-customColorWithOpacity ">
                      <Search />
                 
                    </div>
                      <p className=" md:w-1/2 text-center text-[16px] leading-[24px] text-black font-medium">Sorry but you haven’t created any job yet.
To post a job “click on this button”</p>
                      <button onClick={()=>{router.push('/dashboard/employer/post-a-job')}} className="w-[200px] h-[48px] rounded-[6px] bg-[#00932E] text-white font-bold">Post a Job</button>
                </section>
              )}
            </div>
            </section>
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
          </section>
      <section className="p-4 md:w-[42%] bg-[#E7F6EC] rounded-[10px] flex flex-col gap-4  ">
        <h3 className=" text-[24px] leading-[32px] text-black font-bold">Quick Links</h3>
        <Link href="/dashboard/employer/post-a-job" className=" cursor-pointer relative rounded-[10px] bg-[#00932E] h-[180px] p-8 flex flex-col justify-around">
        <WhiteBag />
          <h6 className=" font-bold  leading-[24px] text-[24px] text-white">Post a job</h6>
          <Image className=" absolute bottom-0 right-0" src="/images/landing/Suitcase.png" width={64} height={64} alt=""  />
        </Link>
        <Link href="/dashboard/employer/hire" className="cursor-pointer relative rounded-[10px] bg-[#00932E] h-[180px] p-8 flex flex-col justify-around">
        <Hands />
          <Image className=" absolute bottom-0 right-0" src="/images/landing/Hand Money.png" width={64} height={64} alt="" />
          <h6 className="font-bold  text-[24px] leading-[24px] text-white">Hire Artisan</h6>
        </Link>
      </section>
    </section>
 </section>
  )
}

export default EmployerHome
