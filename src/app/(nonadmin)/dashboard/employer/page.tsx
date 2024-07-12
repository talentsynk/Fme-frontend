import { EmployersOragonCard } from "@/components/landing/OragonCard";
import Image from "next/image";
import { Bag, Hands, Like, Search, WhiteBag } from "@/components/landing/faqs/Svgs";


const EmployerHome = () => {

  const dummy=[
    {
      title:"Oragon Confectionaries",
      text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 896.......",
      status:true,
      id:1
    },
    {
      title:"Oragon Confectionaries",
      text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 896.......",
      status:false,
      id:2
    },
    {
      title:"Oragon Confectionaries",
      text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 896.......",
      status:true,
      id:3
    },
    {
      title:"Oragon Confectionaries",
      text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 896.......",
      status:false,
      id:4
    },
    {
      title:"Oragon Confectionaries",
      text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 896.......",
      status:true,
      id:5
    },
    {
      title:"Oragon Confectionaries",
      text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 896.......",
      status:true,
      id:6
    }
  ]
  

  return (
    <section className=" p-4">
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
      <section className={`p-4 md:w-[55%] rounded-[10px] ${dummy.length>0?"h-fit":""}  `}>
            <h4 className=" text-[18px] leading-[24px] mb-4 font-bold text-black">Jobs Posted</h4>
            <section className={`${dummy.length==0&&" flex justify-center items-center my-auto h-full"}`}>

            <div className={`flex flex-col gap-2 ${dummy.length==0&&" justify-center items-center"}`}>
              
              {dummy.length>0?(
                dummy.map(dum=>(<EmployersOragonCard key={dum.id} title={dum.title} text={dum.text} status={dum.status}/>))
              ):(
                <section className=" flex justify-center items-center flex-col gap-8">
                    <div className=" h-[100px] w-[100px] flex justify-center items-center rounded-[32px] bg-customColorWithOpacity ">
                      <Search />
                      {/* <Image src="/images/landing/Suitcase.svg" width={48} height={48} alt="" /> */}
                    </div>
                      <p className=" md:w-1/2 text-center text-[16px] leading-[24px] text-black font-medium">Sorry but you haven’t created any job yet.
To post a job “click on this button”</p>
                      <button className="w-[200px] h-[48px] rounded-[6px] bg-[#00932E] text-white font-bold">Post a Job</button>
                </section>
              )}
            </div>
            </section>
          </section>
      <section className="p-4 md:w-[42%] bg-[#E7F6EC] rounded-[10px] flex flex-col gap-4  ">
        <h3 className=" text-[24px] leading-[32px] text-black font-bold">Quick Links</h3>
        <div className=" relative rounded-[10px] bg-[#00932E] h-[180px] p-8 flex flex-col justify-between">
        <WhiteBag />
          <h6 className=" font-bold text-[16px] leading-[24px] text-white">Post a job</h6>
          <Image className=" absolute bottom-0 right-0" src="/images/landing/Suitcase.png" width={64} height={64} alt=""  />
        </div>
        <div className="relative rounded-[10px] bg-[#00932E] h-[180px] p-8 flex flex-col justify-between">
        <Hands />
          <Image className=" absolute bottom-0 right-0" src="/images/landing/Hand Money.png" width={64} height={64} alt="" />
          <h6 className="font-bold text-[16px] leading-[24px] text-white">Hire Artisan</h6>
        </div>
      </section>
    </section>
 </section>
  )
}

export default EmployerHome
