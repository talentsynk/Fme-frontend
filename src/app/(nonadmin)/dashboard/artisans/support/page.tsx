'use client'
import { WhiteCall, WhiteMail, WhiteMessaging } from "@/components/landing/faqs/Svgs";
import Image from "next/image";

export default function SupportPage(){
  return (
    <section className="">
        <div className=" ">
          <Image src="/images/landing/support.png" alt="" width={1302} height={350} className=" w-full"  />

        </div>
        <div className=" bg-[#00932E] text-white p-8 flex flex-col gap-4">
          <h2 className="text-[44px] font-medium leading-[48px] text-center">Contact Us</h2>
          <p className="text-[16px] font-medium leading-[24px] text-center text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, quasi.</p>
          <div className=" flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between mt-4">
            <div className=" flex md:w-[380px] items-center  p-2 w-full rounded-[10px] border border-solid border-white gap-4">
              <WhiteMessaging />
              <div className="">
                <h5 className=" text-[16px] font-medium leading-[24px] text-white">Contact live chat support</h5>
                <h6 className="text-[12px] font-medium leading-[24px]">24/7 available. No chatbots</h6>
              </div>
            </div>
            <div className=" flex md:w-[380px] items-center  p-2 w-full rounded-[10px] border border-solid border-white gap-4">
              <WhiteMail />
              <div className="">
                <h5 className=" text-[16px] font-medium leading-[24px] text-white">Send us a mail</h5>
                <h6 className="text-[12px] font-medium leading-[24px]">24/7 available. No chatbots</h6>
              </div>
            </div>
            <div className=" flex md:w-[380px] items-center  p-2 w-full rounded-[10px] border border-solid border-white gap-4">
              <WhiteCall />
              <div className="">
                <h5 className=" text-[16px] font-medium leading-[24px] text-white">Give us a call</h5>
                <h6 className="text-[12px] font-medium leading-[24px]">+234 567 890</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

