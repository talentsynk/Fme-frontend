"use client"
import Accordion from "@/components/landing/faqs/Accordion";
import { Call, Message, Messaging } from "@/components/landing/faqs/Svgs";
import Image from "next/image";

export default function Faqs() {
    return (
      <section className=" flex p-8 gap-4 flex-col md:flex-row">
        <section className=" space-y-2">
          <h1 className=" text-[#00932E] text-[32px] md:text-[48px] font-medium leading-[40px] md:leading-[48px]">Frequently Asked Questions</h1>
          <p className="mb-4 font-medium leading-[24px] text-[#101928]">Need help? Check out the answers to your questions about National Skills Information Center, or send an email to support@nskic.com</p>
          <Accordion />
        </section>
        <section className=" flex flex-col gap-4">
          <div className=" flex p-4 gap-2 items-center rounded-[10px] bg-[#E7F6EC]">
            <Call />
            <div className="">
              <h6 className=" font-medium text-black">Contact live chat support</h6>
              <p className=" text-[12px] text-black-70 font-medium">24/7 available. No chatbots!</p>
            </div>
          </div>
          <div className=" flex p-4 gap-2 items-center rounded-[10px] bg-[#E7F6EC]">
            <Messaging />
            <div className="">
              <h6 className=" font-medium text-black">Send us a mail !</h6>
              <p className=" text-[12px] text-black-70 font-medium">24/7 available. No chatbots!</p>
            </div>
          </div>
          <div className=" flex p-4 gap-2 items-center rounded-[10px] bg-[#E7F6EC]">
            <Message />
            <div className="">
              <h6 className=" font-medium text-black">Send us a mail !</h6>
              <p className=" text-[12px] text-black-70 font-medium">To reach us faster, you can give us a call on +234 567 890</p>
            </div>
          </div>
          <div className="">
              <Image src="/images/Frame 1618868421.png" width={587} height={425} alt="" />
          </div>
        </section>
      </section>
    );
  }