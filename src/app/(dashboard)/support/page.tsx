
import { Metadata } from "next";
import { Mail,Phone } from "./Icons";

export const metadata: Metadata = {
  title: "support",
  description: "support page for FME",
};


export default function Home() {
 

    return (
      <section className=" text-white">
        <div className=" h-[450px] rounded-[10px] justify-center items-center  flex flex-col  support-img">
          <h3 className=" text-[32px] font-bold mt-20">We would always love to hear from you</h3>
          <p className=" font-medium ">We are herre to support you 24/7, please contact us through the following mediums</p>
        </div>
        <section className=" w-[95%] mx-auto flex gap-4 relative bottom-9">
        <div className=" flex-1 flex justify-between rounded-[10px] bg-[#00932E] p-6">
          <div className="">
            <p className=" font-bold text-[12px] leading-[145%] ">Mail Support</p>
            <p className=" text-xl leading-[24px] font-bold">contact support123@gmail.com</p>
          </div>
          <div className="w-10 h-10 rounded-[50%] flex justify-center items-center bg-white"><Mail /></div>
        </div>
        <div className=" flex-1 flex justify-between rounded-[10px] bg-[#00932E] p-6">
          <div className="">
            <p className=" font-bold text-[12px] leading-[145%] ">Call Support</p>
            <p className=" text-xl leading-[24px] font-bold">+234 567 890 1234</p>
          </div>
          <div className="w-10 h-10 rounded-[50%] flex justify-center items-center bg-white"><Phone /></div>
        </div>
        </section>

      </section>
    );
  }
