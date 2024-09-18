"use client";

import { useEffect } from "react";
import {OragonCard, SavedOragonCard} from "@/components/landing/OragonCard";
import { Bag, BigStar, Cancel, Like } from "@/components/landing/faqs/Svgs";
import { usePathname } from 'next/navigation'
import Image from "next/image";


export default function About() {
  const pathname = usePathname()
  
 

  
    return (
      <section className="">
      <section className="">
      <div className=" space-y-4 text-center py-16 bg-[#E4F5EA]">
          <h3 className="animate-slideInLeft text-[18px] font-medium leading-[24px] text-black-70">ABOUT US</h3>
          <h1 className="animate-fadeIn text-[32px] md:text-[44px] leading-[48px] font-medium text-[#00932E]">We are National Skills Information Center</h1>
          <p className="animate-bounce px-4  md:px-2 md:w-3/4 mx-auto text-[18px] leading-[24px] font-normal text-black">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci voluptate voluptatem delectus optio, est pariatur ullam, explicabo ab impedit dolores nesciunt ex quae porro odit animi aut minus incidunt quisquam quibusdam, recusandae ducimus sequi ut! Delectus eligendi laboriosam rerum tempore!</p>
        </div>
        <div className="">
          <Image src="/images/landing/abbout-img.jpg" width={0} height={400}sizes="100vw" style={{ width: '100%' }} alt="" /> 
        </div>
      </section>
      <section className="px-8 py-24 bg-[#00932E] spiral">
        <h2 className="animate-fadeIn  text-center text-[36px] md:text-[52px] leading-[44px] md:leading-[56px] font-medium text-white md:w-1/2 mx-auto">As a skilled nation we pave the road to the future.</h2>
      </section>
      <section className=" space-y-4 md:space-y-0 flex flex-col md:flex-row px-8 py-16 gap-2">
        <div className=" space-y-4 flex-1 pt-4 md:pt-0">
          <h3 className=" animate-fadeIn  md:text-[18px] leading-[24px] text-black-70 font-medium text-center md:text-left">OUR VISION AND MISSION</h3>
          <h2 className="animate-slideInLeft text-[32px] md:text-[44px] font-medium text-center md:text-left leading-[48px] text-[#101928]">Our Dream is Global National Transformation</h2>
          <p className="animate-fadeIn px-4 md:px-2 md:text-[18px] leading-[24px] text-black font-normal text-center md:text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dolorem delectus voluptatum odio voluptates. Officiis doloremque, mollitia architecto ullam, sequi, adipisci quo sapiente ut optio iste porro necessitatibus nisi cupiditate unde tenetur. Sapiente laboriosam magni voluptates, ullam id voluptatibus numquam!</p>
          <div className=" flex flex-wrap gap-2 w-full">
            <div className=" bg-[#E4F5EA] p-4 rounded-[10px] w-[60%] md:w-[65%]">
              <h6 className=" font-medium text-[12px] text-[#111111] leading-[145%]">Total number of MDAs</h6>
              <h4 className="text-[24px] font-medium leading-[32px] text-[#00932E]">3132</h4>
            </div>
            <div className=" bg-[#E4F5EA] p-4 rounded-[10px] w-[33%]">
            <h6 className="font-medium text-[12px] text-[#111111] leading-[145%]">Total number of STCs</h6>
              <h4 className="text-[24px] font-medium leading-[32px] text-[#00932E]">300+</h4>
            </div>
            <div className=" bg-[#E4F5EA] p-4 rounded-[10px] w-[33%]">
            <h6 className="font-medium text-[12px] text-[#111111] leading-[145%]">Total number of Enrolled Students</h6>
              <h4 className="text-[24px] font-medium leading-[32px] text-[#00932E]">3000</h4>
            </div>
            <div className=" bg-[#E4F5EA] p-4 rounded-[10px] w-[60%] md:w-[65%]">
            <h6 className="font-medium text-[12px] text-[#111111] leading-[145%]">Total number of Certified Students</h6>
              <h4 className=" text-[24px] font-medium leading-[32px] text-[#00932E]">3132</h4>
            </div>
          </div>
        </div>
        <div className=" flex-1">
        <Image src="/images/second_about.png" width={1298} height={400} className=" h-[100%]" alt="" />
        </div>
      </section>
    
      </section>
     
      
    );
  }