"use client";
import Image from "next/image";

export default function About() {
  
    return (
      <section className="">
      <section className="">
      <div className=" space-y-4 text-center py-16 bg-[#E4F5EA]">
          <h3 className=" text-[18px] font-medium leading-[24px] text-black-70">ABOUT US</h3>
          <h1 className=" text-[32px] md:text-[44px] leading-[48px] font-medium text-[#00932E]">We are National Skills Information Center</h1>
          <p className="px-2 md:w-3/4 mx-auto text-[18px] leading-[24px] font-normal text-black">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci voluptate voluptatem delectus optio, est pariatur ullam, explicabo ab impedit dolores nesciunt ex quae porro odit animi aut minus incidunt quisquam quibusdam, recusandae ducimus sequi ut! Delectus eligendi laboriosam rerum tempore!</p>
        </div>
        <div className="">
          <Image src="/images/first_about.png" width={0} height={400}sizes="100vw" style={{ width: '100%' }} alt="" /> 
        </div>
      </section>
      <section className=" space-y-4 flex flex-col md:flex-row px-8 py-16 gap-2">
        <div className=" space-y-4 flex-1 pt-24">
          <h3 className=" md:text-[18px] leading-[24px] text-black-70 font-medium">OUR VISION AND MISSION</h3>
          <h2 className=" text-[32px] md:text-[44px] font-medium leading-[48px] text-[#101928]">Our Dream is Global National Transformation</h2>
          <p className=" px-2 md:text-[18px] leading-[24px] text-black font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dolorem delectus voluptatum odio voluptates. Officiis doloremque, mollitia architecto ullam, sequi, adipisci quo sapiente ut optio iste porro necessitatibus nisi cupiditate unde tenetur. Sapiente laboriosam magni voluptates, ullam id voluptatibus numquam!</p>
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
        <Image src="/images/second_about.png" width={1298} height={400} alt="" />
        </div>
      </section>
      <section className="px-8 py-16 bg-[#00932E]">
        <h2 className=" text-center text-[36px] md:text-[52px] leading-[44px] md:leading-[56px] font-medium text-white md:w-1/2 mx-auto">Our Dream is Global National Transformation</h2>
      </section>
      <section className=" px-8 py-16 space-y-4">
        <h2 className=" text-[44px] leading-[48px] text-center font-bold text-[#101928]">Our Team</h2>
        <p className=" text-[18px] leading-[24px]  text-center md:w-1/2 mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit omnis nostrum ea ullam recusandae eum in laborum ratione iusto quidem!</p>
        <div className=" flex flex-wrap gap-4 justify-center items-center w-full">
          <div className=" bg-[#F9F9F9] space-y-2">
            <Image src="/images/frame_1.png" width={405} height={305} alt="" />
            <div className=" flex flex-col items-center">
              <h5 className=" text-center font-bold text-[24px] leading-[32px] text-black">Orgaon Confectionaries</h5>
              <p className=" text-center text-black-70 font-medium leading-[24px]">Head of Admin</p>
            </div>
          </div>
          <div className="bg-[#F9F9F9] space-y-2">
            <Image src="/images/frame_2.png" width={405} height={305} alt="" />
            <div className=" flex flex-col items-center">
              <h5 className=" text-center font-bold text-[24px] leading-[32px] text-black">Orgaon Confectionaries</h5>
              <p className=" text-center text-black-70 font-medium leading-[24px]">Head of Admin</p>
            </div>
          </div>
          <div className="bg-[#F9F9F9] space-y-2">
            <Image src="/images/frame_3.png" width={405} height={305} alt="" />
            <div className=" flex flex-col items-center">
              <h5 className=" text-center font-bold text-[24px] leading-[32px] text-black">Orgaon Confectionaries</h5>
              <p className=" text-center text-black-70 font-medium leading-[24px]">Head of Admin</p>
            </div>
          </div>
          <div className="bg-[#F9F9F9] space-y-2">
            <Image src="/images/frame_4.png" width={405} height={305} alt="" />
            <div className=" flex flex-col items-center">
              <h5 className=" text-center font-bold text-[24px] leading-[32px] text-black">Orgaon Confectionaries</h5>
              <p className=" text-center text-black-70 font-medium leading-[24px]">Head of Admin</p>
            </div>
          </div>
          <div className="bg-[#F9F9F9] space-y-2">
            <Image src="/images/frame_5.png" width={405} height={305} alt="" />
            <div className=" flex flex-col items-center">
              <h5 className=" text-center font-bold text-[24px] leading-[32px] text-black">Orgaon Confectionaries</h5>
              <p className=" text-center text-black-70 font-medium leading-[24px]">Head of Admin</p>
            </div>
          </div>
          <div className="bg-[#F9F9F9] space-y-2">
            <Image src="/images/frame_6.png" width={405} height={305} alt="" />
            <div className=" flex flex-col items-center">
              <h5 className=" text-center font-bold text-[24px] leading-[32px] text-black">Orgaon Confectionaries</h5>
              <p className=" text-center text-black-70 font-medium leading-[24px]">Head of Admin</p>
            </div>
          </div>
        </div>
      </section>
      <section className=" bg-[#00932E] p-8">
        <div className=" space-y-4">
          <h4 className="text-[18px] leading-[24px] text-white">OUR NEXT MILESTONE</h4>
          <h2 className=" text-[44px] leading-[48px] text-white font-medium">We are National Skills Information Center</h2>
          <p className=" text-[18px] leading-[24px] text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dolorem delectus voluptatum odio voluptates. Officiis doloremque, mollitia architecto ullam, sequi, adipisci quo sapiente ut optio iste porro necessitatibus nisi cupiditate unde tenetur. Sapiente laboriosam magni voluptates, ullam id voluptatibus numquam!</p>
        </div>
      </section>
      </section>
    );
  }