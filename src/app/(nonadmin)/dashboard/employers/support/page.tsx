import Image from "next/image"
import { WhiteMessaging,WhiteMail,WhiteMessage } from "@/components/landing/faqs/Svgs";

const Support = () => {
  return (
    <section className="">
    <div className="">
      <Image src='/images/landing/support.png' height={350} width={1300} alt=" support image" className=" w-full" />
    </div>
    <div className=" bg-[#00932E] p-2 md:p-8">
      <h2 className=" text-[32px] md:text-[44px] leading-[40px] md:leading-[48px] font-medium text-white text-center">Contact Us</h2>
      <p className="text-[16px] leading-[24px] md:w-1/2 mx-auto mt-2 mb-8 font-medium text-white text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quas odit sunt alias mollitia suscipit ratione rerum aspernatur obcaecati eius tempore nisi eveniet repudiandae quos quo ipsum corporis culpa, autem fugiat. Rem, ducimus! Non animi sequi explicabo, possimus distinctio natus.</p>
      <div className=" flex flex-col md:flex-row gap-4 md:gap-0 justify-between md:p-8 text-white">
      <div className=" flex p-4 gap-2 items-center rounded-[10px] border border-white border-solid w-full md:w-[32%]">
      <WhiteMessaging />
        <div className="">
          <h6 className="animate-bounce font-medium ">Contact live chat support</h6>
          <p className="animate-fadeIn  text-[12px]  font-medium">24/7 available. No chatbots!</p>
        </div>
      </div>
      <div className=" flex p-4 gap-2 items-center rounded-[10px] border border-white border-solid w-full md:w-[32%]">
      <WhiteMail />
        <div className="">
          <h6 className="animate-slideInLeft font-medium ">Send us a mail !</h6>
          <p className="animate-fadeIn  text-[12px]  font-medium">24/7 available. No chatbots!</p>
        </div>
      </div>
      <div className=" flex p-4 gap-2 items-center rounded-[10px] border border-white border-solid w-full md:w-[32%]">
        <WhiteMessage />
        <div className="">
          <h6 className="animate-bounce font-medium ">Send us a mail !</h6>
          <p className="animate-slideInLeft text-[12px]  font-medium">To reach us faster, you can give us a call on +234 567 890</p>
        </div>
      </div>
      </div>
    </div>
  </section>
  )
}

export default Support
