'use client';
import ProgressBar from "@/components/artisan/ProgressBar";
import { OragonCard, SavedOragonCard } from "@/components/landing/OragonCard";
import { Bag, BigStar, Bigtar, GreenBag, Like, X } from "@/components/landing/faqs/Svgs";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function ArtisansHome(){

  useEffect(()=>{
    let token = Cookies.get("role");
    console.log(token)

  },[])
  console.log(1)
  

  const dummy=[
    {
      title:"Oragon Confectionaries",
      text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 896.......",
      status:true,
      id:1
    },
    {
      title:"Oragon Confectionaries",
      text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 896.......",
      status:false,
      id:2
    },
    {
      title:"Oragon Confectionaries",
      text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 896.......",
      status:true,
      id:3
    },
    {
      title:"Oragon Confectionaries",
      text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 896.......",
      status:false,
      id:4
    },
    {
      title:"Oragon Confectionaries",
      text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 896.......",
      status:true,
      id:5
    },
    {
      title:"Oragon Confectionaries",
      text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 896.......",
      status:true,
      id:6
    }
  ]

  const savedOragon=[
    {
    title:"Oragon Confectionaries",
    text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 896.......",
    status:"Part time",
    id:1,
    state:"Oyo state",
    price:"200k"
  },
    {
    title:"Oragon Confectionaries",
    text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 896.......",
    status:"Part time",
    id:2,
    state:"Edo state",
    price:"150k"
  },
    {
    title:"Oragon Confectionaries",
    text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 896.......",
    status:"Part time",
    id:3,
    state:"Osun state",
    price:"400k"
  },
    {
    title:"Oragon Confectionaries",
    text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 896.......",
    status:"Part time",
    id:4,
    state:"Abia state",
    price:"200k"
  },
]
const  [showProfile,setShowProfile]=useState(true)

const cancelProfile=()=>{
  setShowProfile(false)
}
 

    return (
        <section className="bg-white p-4">
        <h2 className=" text-[#191b1c] text-[24px] leading-[32px] font-bold">👋 Hello Oluwatimilehin,</h2>
        <p className=" text-[#626C70] my-4 font-medium text-sm leading-[20px]">Welcome to your dashboard, this is where you get an overview and analytics of all your activities.</p>
       {showProfile&& <section className=" bg-black humanity md:h-[270px] h-[330px] rounded-[10px] py-4 p-2 flex flex-col justify-between">
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
        </section>}
        <section className="bg-[#00932E] p-4 space-y-4 mt-4 rounded-[10px]">
          <h3 className=" text-[24px] font-bold leading-[32px] text-white">Dashboard</h3>
          <div className=" flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 items-center md:items-start">
            <div className="md:w-[32%] w-[95%] flex flex-col gap-4 p-4 bg-white rounded-[12px]">
              <Bag />
              <h6 className=" text-sm text-black font-medium">Total Jobs applied</h6>
              <h5 className=" text-[20px] font-medium leading-[30px]">10</h5>
              </div>
            <div className="md:w-[32%] w-[95%] flex flex-col gap-4 p-4 bg-white rounded-[12px]">
              <Like />
              <h6 className=" text-sm text-black font-medium">Total Recommendations</h6>
              <h5 className="">2</h5>
              </div>
            <div className="md:w-[32%] w-[95%] flex flex-col gap-4 p-4 bg-white rounded-[12px]">
              <Bag />
              <h6 className=" text-sm text-black font-medium">Total Jobs applied</h6>
              <h5 className="text-[20px] font-medium leading-[30px]">10</h5>
              </div>
          </div>
        </section>
        <section className=" flex flex-col md:flex-row justify-between py-8">
          <section className={`p-4 md:w-[55%] bg-[#E7F6EC] rounded-[10px] ${dummy.length>0?"h-fit":""}  `}>
            <h4 className=" text-[18px] leading-[24px] mb-4 font-bold text-black">Jobs applied for</h4>
            <section className={`${dummy.length==0&&" flex justify-center items-center my-auto h-full"}`}>

            <div className={`flex flex-col gap-2 ${dummy.length==0&&" justify-center items-center"}`}>
              
              {dummy.length>0?(
                dummy.map(dum=>(<OragonCard key={dum.id} title={dum.title} text={dum.text} status={dum.status}/>))
              ):(
                <section className=" flex justify-center items-center flex-col gap-8">
                    <div className=" h-[100px] w-[100px] flex justify-center items-center rounded-[32px] bg-customColorWithOpacity ">
                      <GreenBag />
                      {/* <Image src="/images/landing/Suitcase.svg" width={48} height={48} alt="" /> */}
                    </div>
                      <p className=" md:w-1/2 text-center text-[16px] leading-[24px] text-black font-medium">Sorry but you haven’t applied for any job yet.
To apply for a job click on this button </p>
                      <button className="w-[200px] h-[48px] rounded-[6px] bg-[#00932E] text-white font-bold">Apply for Jobs</button>
                </section>
              )}
            </div>
            </section>
          </section>
          <section className="p-4 md:w-[42%]  rounded-[10px]  ">
            <h4 className=" text-[18px] leading-[24px] mb-4 font-bold flex text-black"><BigStar />Jobs saved for later</h4>
            <section className={`${savedOragon.length==0&&" flex justify-center items-center my-auto h-full"}`}>

            <div className={`flex flex-col gap-2 ${savedOragon.length==0&&" justify-center items-center"}`}>
              
              {savedOragon.length>0?(
                savedOragon.map(dum=>(<SavedOragonCard key={dum.id} {...dum} />))
              ):(
                <section className=" flex justify-center items-center flex-col gap-8">
                    <div className=" h-[100px] w-[100px] flex justify-center items-center rounded-[32px] bg-customColorWithOpacity ">
                      <Bigtar />
                    </div>
                      <p className=" md:w-1/2 text-center text-[16px] leading-[24px] text-black font-medium">Sorry but you haven’t saved any job for later yet.
To get started click on this button</p>
                      <button className="w-[200px] h-[48px] rounded-[6px] bg-[#00932E] text-white font-bold">Apply for Jobs</button>
                </section>
              )}
            </div>
            </section>
            
          </section>
        </section>
      </section>
    )
}