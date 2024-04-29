// import { Metadata } from "next";
"use client"
import { Metadata } from "next";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import Profile from "@/components/fme/settings/Profile";
import Security from "@/components/fme/settings/Security";
import { useRouter } from "next/navigation";

export default function Home() {
  const [activeDiv, setActiveDiv] = useState(1);
  const role = Cookies.get("userRole");
  const router = useRouter();
  useEffect(()=>{
    if(role === "FME"){
      router.push("/fme");
    }
  },[role,router]);

import Image from "next/image";
import Security from "@/components/fme/settings/Security";
import { User, Verified } from "@/components/fme/course_list/Svg";


export default function Home() {
    return (
      <section className="">
        <h3 className=" text-3xl font-semibold leading-[120%] text-[#101928]">Settings</h3>
        <p className=" text-[12px] text-[#667185] mt-2 mb-4">Take a look at your policies and the new policy to see what is covered</p>
       
        <section className=" p-4 bg-white mt-4 rounded-[10px] ">
          <div className=" flex justify-between px-8 items-center bg-[#E7F6EC] rounded-[10px] h-[200px]">
            <div className=" flex items-center gap-4">
              <div className=" w-[120px] h-[120px] rounded-[50%] bg-opacity-10 relative bg-[#34CAA5] flex justify-center items-center">
                <Verified />
                <Image src="/images/settings/Verified tick.png" width={40} height={40} alt="verified tick" className=" absolute bottom-0 right-0" />
              </div>
              <div className=" flex flex-col gap-2">
                <h4 className=" text-[24px] text-[#101928] font-semibold leading-[120%]">FME</h4>
                <p className=" text-[#667185] text-[12px]">alarapetimi05@gmail.com</p>
                <p className=" text-[#667185] text-[12px]">This image will be displayed on your profile</p>
              </div>
            </div>
          </div>
         <Security />
        </section>
      </section>
    );
  }


