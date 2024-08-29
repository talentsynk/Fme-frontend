interface IArtisan{
  AverageRating:number;
  BusinessDescription:string;
  BusinessName:string;
  ID:number;
  Skill:string;
}
'use client'
import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import Link from 'next/link'
import Image from 'next/image'
import { AirplaneIcon, RecommendArtisans, SmallRedIcon, SmallVerified, Stats, VerifiedTick } from '@/components/landing/faqs/Svgs'
import Recommendations from '@/components/employer/Recommendations'
import { GreyArrowRight } from '@/components/icons/artisan/icons'
import { CloseHireArtisanComp, HireArtisanComp } from '@/components/fme/students/modal'

const ReviewPage = ({ params }: { params: { slug: string } }) => {
  console.log(params.slug)
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [data,setData]= useState<IArtisan|null>(null)
  const cancelModal=()=>{
    console.log(1)
  }
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
  
  const [showHireArtisanModal, setShowHireArtisanModal] = useState(false);
  useEffect(() => {
		let token = Cookies.get("token");
    console.log(token)
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios
			.get(`${BACKEND_URL}/artisan/1`, config)
			.then((res) => {
				const data = res.data.artisan;
				setData(data);
			})
			.catch((error) => console.log(error));
	}, []);
  console.log(data)


  return (
<section className="">
<div className=" flex gap-2 items-center p-2 ">
            <Link href="/dashboard/employer">
              <p className="text-[#BFBFBF] text-[12px] md:text-[16px] font-medium leading-6">Job Portal</p>
            </Link>
            <GreyArrowRight />
            <Link href="/dashboard/employer/jobs/1">
              <p className="text-[#BFBFBF] text-[12px] md:text-[16px] font-medium leading-6">View job details</p>
            </Link>
            <GreyArrowRight />
            <Link href="/dashboard/employer/jobs/1/applications" className="text-[#BFBFBF] font-medium leading-6 text-[12px] md:text-[16px]">View Job Applications</Link>
            <GreyArrowRight />
            <p  className="text-[#00932E] text-[12px] md:text-[16px] font-bold leading-6">Review Profile</p>
          </div>
<section className=" flex flex-col md:flex-row gap-8 p-2">

<div className="md:w-[30%] border-[#EBEDEF] border-solid border-[1px]">
  <div className=" bg-[#00932E] p-4 rounded-lg flex flex-col justify-center items-center gap-4">
    <Image src="/images/landing/detective.png" width={120} height={120} alt="review " />
    <h4 className=" text-white font-bold text-lg">{data?.BusinessName}</h4>
    <div className=" rounded-[5px] bg-[#E4F5EA] w-[82px] h-[26px] flex gap-1 justify-center items-center"><SmallVerified /><p className=" text-[12px] text-[#00932E]  font-medium">Verified</p></div>
  </div>
  <div className="p-4 space-y-2">
  <h5 className=" text-black font-bold text-[12px] ">ABOUT</h5>
  <p className=" text-black-70 font-medium text-[12px]">{data?.BusinessDescription}</p>
  <h5 className=" text-black font-bold text-[12px] ">SKILLS</h5>
  <div className=" flex gap-2">
    <div className=" bg-[#f5f5f5] p-2.5 rounded text-black font-medium text-[12px]">{data?.Skill}</div>
    <div className="bg-[#f5f5f5] p-2.5 rounded text-black font-medium text-[12px]">creative</div>
  </div>
  <div className=" flex gap-1 items-center">
  <Stats />
  <h5 className=" text-black font-bold text-[12px] ">STATS</h5>
  </div>
  <div className=" flex justify-between text-black text-[12px] font-medium">
    <p className="">Project Completed</p>
    <p className="">1</p>
  </div>
  <div className=" flex justify-between text-black text-[12px] font-medium">
    <p className="">Ratings</p>
    <p className="">4.5/5.0</p>
  </div>
  <div className=" flex justify-between text-black text-[12px] font-medium">
    <p className="">Recommendations</p>
    <p className="">10</p>
  </div>
  <div className=" flex gap-2 pt-8">
    <button onClick={() => setShowSuspendModal(true)} className="rounded-md text-sm gap-2 font-bold text-[#FA0000]  bg-[#FFE5E5] md:w-[200px] md:h-[48px] w-[160px] h-[40px] flex justify-center items-center"><SmallRedIcon /> <p className="">Decline Artisan</p></button>
    <button onClick={() => setShowHireArtisanModal(true)} className=" rounded-md  gap-2 text-sm font-bold text-white bg-[#00932E] md:w-[200px] md:h-[48px] w-[160px] h-[40px] flex justify-center items-center"> <p className="">Hire Artisan</p><AirplaneIcon /></button>
  </div>
  </div>
  {showSuspendModal && <CloseHireArtisanComp handleModalAction={cancelModal} cancelModal={() => setShowSuspendModal(false)} />}
  {showHireArtisanModal && <HireArtisanComp handleModalAction={cancelModal} cancelModal={() => setShowHireArtisanModal(false)} />}
</div>

  <div className="md:w-[70%]">
    <div className=" border-b-[#EBEDEF] border-b-[1px] border-solid flex justify-between ">
    <h3 className=" w-fit border-b-2 border-b-[#00932E] border-solid">RECOMMENDATIONS(20)</h3>
    {/* <button className="mb-2 bg-[#E7F6EC] rounded-md py-2 px-3 flex gap-1">
      <RecommendArtisans />
      <h5 className=" text-sm font-bold leading-5 text-[#00932E]">Recommend Artisans</h5>
    </button> */}
    </div>
    <div className=" space-y-2">

    {reviews.map(review=>(<Recommendations key={review.id} {...review} />))}
    </div>
  </div>
</section>
</section>
  )
}

export default ReviewPage
 