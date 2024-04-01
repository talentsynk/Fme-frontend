<<<<<<< HEAD
"use client"
import Image from "next/image";
import Profile from "@/components/settings/Profile";
import Security from "@/components/settings/Security";
import { Metadata } from "next";
import { useState } from "react";
import NewAccount from "@/components/settings/NewAccount";

// export const metadata: Metadata = {
//   title: "settings",
//   description: "settings for FMEs",
// };


// the first page on the fme dashboard
=======
"use client";
import Image from "next/image";
import Profile from "@/components/settings/Profile";
import Security from "@/components/settings/Security";
>>>>>>> cea2bb6b9c3c0fb32fc1b5ee0015cce4dd053e1c

export default function Home() {
  const [activeDiv, setActiveDiv] = useState(1);
    return (
      <section className="">
        <h3 className=" text-3xl font-semibold leading-[120%] text-[#101928]">Settings</h3>
        <p className=" text-[12px] text-[#667185] mb-4">Take a look at your policies and the new policy to see what is covered</p>
        <div className=" flex border-[#E4E7EC] border-[1px] w-fit rounded-lg">
          <div onClick={() => setActiveDiv(1)} className={`" px-4 py-2 border-r-[1px] cursor-pointer border-[#E4E7EC]  ${activeDiv==1?'bg-[#E7F6EC] text-[#00932E] font-semibold ':' text-[#98A2B3] font-normal'}  "`}>Profile</div>
          <div onClick={() => setActiveDiv(2)} className={`${activeDiv==2?' text-[#00932E] bg-[#E7F6EC] font-semibold ':' text-[#98A2B3] font-normal'} px-4 py-2 border-r-[1px] cursor-pointer border-[#E4E7EC] `}>Security</div>
          <div onClick={() => setActiveDiv(3)} className={`${activeDiv==3?'bg-[#E7F6EC] text-[#00932E] font-semibold ':' text-[#98A2B3] font-normal'} px-4 cursor-pointer py-2`}>Add new account</div>
        </div>
        <section className=" p-4 bg-white mt-4 rounded-[10px] ">
          <div className=" flex justify-between px-8 items-center bg-[#E7F6EC] rounded-[10px] h-[200px]">
            <div className=" flex items-center gap-4">
              <div className=" w-[120px] h-[120px] rounded-[50%] bg-opacity-10 relative bg-[#34CAA5] flex justify-center items-center">
                <Image src="/images/settings/icon.svg" width={20} height={20} alt=" icon" />
                <Image src="/images/settings/Verified tick.svg" width={40} height={40} alt="verified tick" className=" absolute bottom-0 right-0" />
              </div>
              <div className=" flex flex-col gap-2">
                <h4 className=" text-[24px] text-[#101928] font-semibold leading-[120%]">Oluwatimilehin Alarape</h4>
                <p className=" text-[#667185] text-[12px]">alarapetimi05@gmail.com</p>
                <p className=" text-[#667185] text-[12px]">This image will be displayed on your profile</p>
              </div>
            </div>
            <div className=" flex items-center gap-4">
              {activeDiv==1&&<button className="w-[148px] h-9 rounded-md bg-[#fff] border-solid border-2 border-[#00932E] flex justify-center items-center font-semibold text-[#00932E]">Change Photo</button>}
              {activeDiv==1&&<button className="w-[150px] h-12 rounded-md bg-[#00932E] flex justify-center items-center font-semibold text-white">Edit Profile</button>}
              { activeDiv==2&&<button className="w-[150px] h-12 rounded-md bg-[#00932E] flex justify-center items-center font-semibold text-white">Edit Password</button>}
              
            </div>
          </div>
          {activeDiv==1&&<Profile   />}
          {activeDiv==2&&<Security   />}
          {activeDiv==3&&<NewAccount   />}
        </section>
      </section>
    );
  }