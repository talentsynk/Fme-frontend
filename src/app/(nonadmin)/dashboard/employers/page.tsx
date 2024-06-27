import { EmployersOragonCard } from "@/components/landing/OragonCard";

import { Bag, Hands, Like, WhiteBag } from "@/components/landing/faqs/Svgs";


const page = () => {
  return (
    <section className="">
    <h2 className="text-[#191b1c] text-[24px] leading-[32px] font-bold">👋 Hey, Kevin.</h2>
    <p className="text-[#626C70] my-4 font-medium text-sm leading-[20px]">Here is all your Relik analytics overview</p>
    <section className="border border-[#E4F5EA] border-solid p-4 rounded-[10px]">
      <h2 className="text-[24px] font-bold leading-[32px] text-black">Dashboard</h2>
      <div className=" flex  flex-col md:flex-row md:justify-between gap-4 md:gap-0 items-center md:items-start">
        <div className="md:w-[33%] border border-[#E4F5EA] border-solid w-[95%] flex flex-col gap-4 p-4 bg-white rounded-[12px]">
          <Bag />
          <h6 className=" text-sm text-black font-medium">Total Jobs applied</h6>
          <h5 className=" text-[20px] font-medium leading-[30px]">10</h5>
          </div>
        <div className="md:w-[33%] border border-[#E4F5EA] border-solid w-[95%] flex flex-col gap-4 p-4 bg-white rounded-[12px]">
          <Like />
          <h6 className=" text-sm text-black font-medium">Total Recommendations</h6>
          <h5 className="">2</h5>
          </div>
        <div className="md:w-[33%] border border-[#E4F5EA] border-solid w-[95%] flex flex-col gap-4 p-4 bg-white rounded-[12px]">
          <Bag />
          <h6 className=" text-sm text-black font-medium">Total Jobs applied</h6>
          <h5 className="text-[20px] font-medium leading-[30px]">10</h5>
          </div>
      </div>
    </section>
    <section className=" flex flex-col md:flex-row justify-between py-8">
      <section className="p-4 md:w-[55%]  rounded-[10px] h-fit   ">
        <h4 className=" text-[18px] leading-[24px] mb-4 font-bold text-black">Jobs applied for</h4>
        <div className=" flex flex-col gap-2">
        <EmployersOragonCard />
        <EmployersOragonCard />
        <EmployersOragonCard />
        <EmployersOragonCard />
        </div>
      </section>
      <section className="p-4 md:w-[42%] bg-[#E7F6EC] rounded-[10px] flex flex-col gap-4  ">
        <h3 className=" text-[24px] leading-[32px] text-black font-bold">Quick Links</h3>
        <div className=" rounded-[10px] bg-[#00932E] h-[180px] p-8 flex flex-col justify-between">
        <WhiteBag />
          <h6 className=" font-bold text-[16px] leading-[24px] text-white">Post a job</h6>
        </div>
        <div className="rounded-[10px] bg-[#00932E] h-[180px] p-8 flex flex-col justify-between">
        <Hands />
          <h6 className="font-bold text-[16px] leading-[24px] text-white">Hire Artisan</h6>
        </div>
      </section>
    </section>
 </section>
  )
}

export default page
