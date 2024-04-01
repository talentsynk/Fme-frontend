import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "support",
  description: "support page for FME",
};


// the first page on the fme dashboard

export default function Home() {
    return (

        <section className="">
        <div className="support p-8 rounded-[10px]">
        <h2 className=" text-[28px] font-semibold text-white leading-[120%]">We are  here to support you 24/7</h2>
        <p className=" text-[12px] text-white">Search for a couple of directives here  to help you out</p>
        <input type="search" name="" id="" className="focus:border-green-500 p-2 h-[56px] rounded-md w-[70%] mt-10" />
        </div>
        <section className=" rounded-[10px] bg-white mt-4 p-8 flex">
          <div className="w-[70%]">
          <h2 className="text-[28px] font-semibold text-[#101928] leading-[120%]">I still haven&apos;t found a solution</h2>
          <p className=" text-[12px] text-[#667185]">For personalized services please send us a direct message here</p>
          <form action="" className="">
            <div className=" flex flex-col mt-4 space-y-2">
            <label htmlFor="email" className="">Input your mail</label>
              <input type="email" name="" id="email" placeholder="enter your email address" className="h-[56px] border border-solid border-[#D0D5DD] rounded-md w-[80%] p-2 focus:border-[#00932E]" />
            </div>
            <div className="flex flex-col mt-4 space-y-2">
              <label htmlFor="">Describe your complaint here</label>
              <textarea name="" id=""  className="h-[144px]  border border-solid border-[#D0D5DD] rounded-md w-[80%] p-2 focus:border-green-500 focus:outline-none"></textarea>
            </div>
            <button className="mt-4 bg-[#00932E] text-white font-bold leading-[24px] w-[242px] h-[48px] rounded-[10px]">Send Message</button>
          </form>
          </div> 
          <div className="w-[30%]">
        <Image src="/images/support/image 23.png" width={282} height={207} alt="icon"/>
      </div>

        </section>
      </section>
      

    );
  }