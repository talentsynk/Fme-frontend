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
'use client'
import { SmallVerified } from "@/components/landing/faqs/Svgs";
import Recommendations from "@/components/employer/Recommendations";
import Link from "next/link";
import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { GreyArrowRight } from "@/components/icons/artisan/icons";
import { SmallRedIcon } from "@/components/landing/faqs/Svgs";
import { RecommendArtisans } from "@/components/landing/faqs/Svgs";
import SimilarEmployer from "@/components/employer/SimilarEmployer";
import Image from "next/image";
import { Stats } from "@/components/landing/faqs/Svgs";

const EmployersProfile = ({ params }: { params: { id: string } }) => {
  const lol= params.id
    const [activeTab, setActiveTab] = useState('reviews');
    const reviews=[
        {
          name:"Oluwatimilehin Alarapee",
          text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque torto, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque tortorLorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque tortorLorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque tortorLorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque tortorr",
          id:1
        },
        {
          name:"Oluwatimilehin Alarapee",
          text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque torto, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque tortorLorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque tortorLorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque tortorLorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque tortorr",
          id:2
        },
        {
          name:"Oluwatimilehin Alarapee",
          text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque torto, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque tortorLorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque tortorLorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque tortorLorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque tortorr",
          id:3
        },
      ]
      const [data,setData]= useState<IEmployerProfile|null>(null)
      useEffect(() => {
        let token = Cookies.get("token");
        console.log(token)
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .get(`${BACKEND_URL}/employer/${lol}`, config)
          .then((res) => {
            console.log(res)
            const data = res.data.employer;
            setData(data);
          })
          .catch((error) => console.log(error));
      }, []);
      console.log(data)
  return (
    <section className="">
        <div className=" flex gap-2 items-center p-2 ">
            <Link href="/dashboard/artisan">
              <p className="text-[#BFBFBF] text-[12px] md:text-[16px] font-medium leading-6">Job Portal</p>
            </Link>
            <GreyArrowRight />
            <Link href="/dashboard/artisan/jobs/1">
              <p className="text-[#BFBFBF] text-[12px] md:text-[16px] font-medium leading-6">View job details</p>
            </Link>
            <GreyArrowRight />
            <p  className="text-[#00932E] text-[12px] md:text-[16px] font-bold leading-6">View Employer profile</p>
          </div>
        <div className=" mb-4 bg-[#00932E] p-4 rounded-lg flex flex-col justify-center items-center gap-4">
    <Image src="/images/landing/detective.png" width={120} height={120} alt="review " />
    <h4 className=" text-white font-bold text-lg">{data?.FirstName} {data?.LastName}</h4>
    <div className=" rounded-[5px] bg-[#E4F5EA] w-[82px] h-[26px] flex gap-1 justify-center items-center"><SmallVerified /><p className=" text-[12px] text-[#00932E]  font-medium">Verified</p></div>
  </div>
  <section className="">
  
  <section className=" flex gap-2">
  <div className=" space-y-2 w-[70%]">
  <div className=" flex justify-between items-center py-2">
  <div className="flex items-center p-2">
      <button
        className={`text-lg font-semibold px-4 py-2 ${
          activeTab === 'jobs' ? 'text-[#00932E] border-b-[#00932E] border-solid border-b-[1px]'  : 'text-gray-400'
        }`}
        onClick={() => setActiveTab('jobs')}
      >
        Jobs Posted (0)
      </button>
      <button
        className={`text-lg font-semibold px-4 py-2 ${
          activeTab === 'reviews' ? 'text-[#00932E] border-b-[#00932E] border-solid border-b-[1px]' : 'text-gray-400'
        }`}
        onClick={() => setActiveTab('reviews')} 
      >
        Reviews (20)
      </button>
  
    </div>
    <button className="mb-2 bg-[#E7F6EC] rounded-md py-2 px-3 flex gap-1">
      <RecommendArtisans />
      <h5 className=" text-sm font-bold leading-5 text-[#00932E]"> Write a Review</h5>
    </button>
  </div>
{reviews.map(review=>(<Recommendations key={review.id} {...review} />))}
</div>
<div className="p-4 space-y-4 rounded-[10px] border-solid border-[1px] border-[#EFF1F3] w-[30%]">

  <div className=" flex gap-1 items-center">
    <Stats />
  <h5 className=" text-black font-bold text-[15px] ">STATS</h5>
  </div>
  <div className=" flex justify-between text-black text-[13px] font-medium">
    <p className="">Jobs Posted</p>
    <p className="">5</p>
  </div>
  <div className=" flex justify-between text-black text-[13px] font-medium">
    <p className="">Project Completed</p>
    <p className="">1</p>
  </div>
  <div className=" flex justify-between text-black text-[13px] font-medium">
    <p className="">Ratings</p>
    <p className="">4.5/5.0</p>
  </div>
  <div className=" flex justify-between text-black text-[13px] font-medium">
    <p className="">Recommendations</p>
    <p className="">10</p>
  </div>
  </div>
  </section>
  </section>
  <div className="">
    <h3 className="leading-8 font-bold text-[#979797] text-[24px] my-2">Similar Employer Profile</h3>
    <div className="grid-container grid gap-8 px-4">
    {[1,2,3,4].map(ele=>(<SimilarEmployer key={ele} />))}
    </div>
  </div>
       </section>
  )
}

export default EmployersProfile;
