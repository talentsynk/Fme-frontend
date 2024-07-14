"use client";
import ProgressBar from "@/components/artisan/ProgressBar";
import {OragonCard, SavedOragonCard} from "@/components/landing/OragonCard";
import { Bag, BigStar, Cancel, Like, X } from "@/components/landing/faqs/Svgs";

export default function ArtisansHome(){

    return (
        <section className="bg-white p-4">
        <h2 className=" text-[#191b1c] text-[24px] leading-[32px] font-bold">👋 Hello Oluwatimilehin,</h2>
        <p className=" text-[#626C70] my-4 font-medium text-sm leading-[20px]">Welcome to your dashboard, this is where you get an overview and analytics of all your activities.</p>
        <section className=" bg-black humanity md:h-[270px] h-[330px] rounded-[10px] py-4 p-2 flex flex-col justify-between">
          <div className=" flex justify-between">
            <div className=" flex flex-col md:flex-row md:items-center gap-2">
            <ProgressBar progress={80} />
            <h3 className=" md:text-[18px] text-[16px] text-white leading-[24px] font-bold">80% completed</h3>
            </div>
            <X />
          </div>
          <div className=" flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 md:items-center">
          <div className=" space-y-2">
            <h3 className="md:text-[24px] text-[18px] leading-[24px] font-medium md:leading-[32px] text-white md:font-bold">Update your profile</h3>
            <p className=" md:text-[16px] text-[12px] leading-[17px]  md:leading-[24px] text-white font-medium">To gain more visibility and credibility, update your profile here to gain a higher chance of being eligible to employers</p>
          </div>
          <button className="w-fit bg-[#00932E] rounded-md px-4 py-2 text-sm md:text-[16px] leading-[24px] text-white font-medium md:font-bold">Update Profile</button>
          </div>
        </section>
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
          <section className="p-4 md:w-[55%] bg-[#E7F6EC] rounded-[10px] h-fit   ">
            <h4 className=" text-[18px] leading-[24px] mb-4 font-bold text-black">Jobs applied for</h4>
            <div className=" flex flex-col gap-2">
            <OragonCard />
            <OragonCard />
            <OragonCard />
            <OragonCard />
            </div>
          </section>
          <section className="p-4 md:w-[42%]  rounded-[10px]  ">
            <h4 className=" text-[18px] leading-[24px] mb-4 font-bold flex text-black"><BigStar />Jobs saved for later</h4>
            <div className=" flex flex-col gap-2">
            <SavedOragonCard />
            <SavedOragonCard />
            <SavedOragonCard />
            <SavedOragonCard />
            </div>
          </section>
        </section>
      </section>
    )
}