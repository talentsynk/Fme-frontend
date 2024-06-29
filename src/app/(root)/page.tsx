'use client'
import { useState } from 'react';
import Image from 'next/image'
import { Diploma, GradCap, Organise, TailoredSearch } from "@/components/landing/faqs/Svgs";
import "../globals.css";
import { Verified } from "@/components/fme/course_list/Svg";
import { usePathname } from 'next/navigation'

// client
export default function Home() {
  const pathname = usePathname()
  const [showEmployee,setShowEmployee]= useState(true)
  const handleEmployee=()=>{
    setShowEmployee(true)
  }
  const handleArtisans=()=>{
    setShowEmployee(false)
  }

    return (
      <section className={`content-wrapper ${pathname === '/' ? 'bg-[#E7F6EC]':''}`}>
       <div className=" bg-[#E7F6EC] flex flex-col md:py-24  p-8 space-y-4 items-center">
          <h1 className="animate-fadeIn  text-[32px] text-center md:text-[56px] leading-[48px] md:leading-[77px] font-medium">Hire  <span className=" text-[#00932E]">Skilled Artisans</span>  effortlessly<br /> with a <span className=" text-[#00932E]">click</span> </h1>
          <p className="animate-slideInLeft font-medium md:w-1/2 text-center text-[16px] leading-[24px] text-black">The National Skills Information Center has been created by the Ministry of Education of the Federal Republic of Nigeria to bridge the gap between employers sourcing the expertise of artisans on their projects</p>
          <button className="w-fit rounded-md py-4 px-6 border-2 border-[#00932E] bg-[#00932E] text-white font-bold transition duration-300 ease-in-out hover:text-[#00932E] hover:bg-white  hover:border-[#00932E]">
  Get started today!
</button>


       </div>
       <div className=" bg-[#00932E] py-8 all-about">
        <h5 className="animate-fadeIn  text-[18px] leading-[24px] text-white font-normal text-center">ENDORSED BY THE </h5>
        <div className=" animate-fadeIn   flex justify-center my-2">
          <Image src="/images/image 7 (1).svg" width={106} height={80} alt="" />
        </div>
        <div className=" animate-fadeIn  flex flex-col md:flex-row ">
          <Image src="/images/landing/hero1.png" width={721} height={350} alt="endorsement pictures" className=" flex-1" />
          <Image src="/images/landing/hero2.png" width={721} height={350} alt="endorsement pictures" className=" flex-1" />
        </div>
        <div className=" flex flex-col md:flex-row space-y-2 p-8 justify-between py-16">
          <div className="text-white flex-1 space-y-6">
            <h4 className=" text-[18px] leading-[24px] font-medium text-center md:text-left">WHO WE ARE?</h4>
            <h3 className=" text-[44px] font-medium text-center md:text-left leading-[48px]">We are all about</h3>
            <p className=" text-[18px] text-center md:text-left py-2 md:py-0 leading-[24px] font-normal">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi labore exercitationem repellendus vero, minima quos quae maiores temporibus ad enim iste quibusdam veniam at voluptas numquam illo expedita maxime aliquid velit aliquam sint. Velit voluptas porro repudiandae quisquam cumque eius.</p>
          </div>
          <div className=" flex-1 flex justify-end">
          <Image src="/images/fourth.png" width={512} height={468} alt="endorsement pictures" />
          </div>
        </div>
       </div>
       <div className=" bg-white flex flex-col space-y-4 md:space-y-0 md:flex-row gap-4 p-8 py-16">
        <div className=" flex-1 space-y-4">
          <div className=" flex gap-2">
            <div onClick={handleEmployee} className={`cursor-pointer ${showEmployee?"bg-[#E7F6EC] text-[#00932E]":"text-[#98A2B3]"}  rounded-lg px-4 py-2.5 `}>For Employers</div>
            <div onClick={handleArtisans} className={`cursor-pointer ${!showEmployee?"bg-[#E7F6EC] text-[#00932E]":"text-[#98A2B3]"}  rounded-lg px-4 py-2.5 `}>For Artisans</div>
          </div>
          <h5 className="animate-slideInLeft text-[18px] text-center md:text-left font-medium leading-[24px] text-[#101928]">OUR NEXT MILESTONE</h5>
          <h2 className="animate-fadeIn  text-[36px] md:text-[44px] text-center md:text-left font-medium leading-[48px] text-[#101928]">We Are National Skills Information Center</h2>
          <p className="animate-bounce text-[18px] text-center md:text-left font-normal leading-[24px] text-[#101928]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati incidunt iusto ullam autem laborum harum, possimus nihil deleniti sint impedit debitis vero repellendus ab magnam ratione aperiam sequi. Minus sapiente fugiat, officia tempora accusantium numquam corporis dolorem maxime eaque recusandae!</p>
          <div className=" flex justify-center md:justify-start">
          <button className=" w-fit rounded-md py-4 px-6 border-2 border-[#00932E] bg-[#00932E] text-white font-bold transition duration-300 ease-in-out  mt-12">Get started today!</button>
          </div>
        </div>
        <div className="animate-fadeIn flex-1 flex flex-wrap gap-4 justify-center xl:justify-center ">
          <div className="w-[90%] p-2 md:w-[150px] xl:w-[300px] flex-col flex justify-center items-center h-[223px] bg-[#E7F6EC] rounded-[15px]">
            <Diploma />
            <h6 className="text-sm text-center xl:text-[20px] leading-[24px] font-bold">Find quality applicants</h6>
          </div>
          <div className="w-[90%] p-2 md:w-[150px] xl:w-[300px] flex-col flex justify-center items-center h-[223px] bg-[#E7F6EC] rounded-[15px]">
            <Verified />
            <h6 className="text-sm text-center xl:text-[20px] leading-[24px] font-bold">Verify their ability</h6>
          </div>
          <div className="w-[90%] p-2 md:w-[150px] xl:w-[300px] flex-col flex justify-center items-center h-[223px] bg-[#E7F6EC] rounded-[15px]">
            <Organise />
            <h6 className="text-sm text-center xl:text-[20px] leading-[24px] font-bold">Organise your candidates</h6>
          </div>
          <div className="w-[90%] p-2 md:w-[150px] xl:w-[300px] flex-col flex justify-center items-center h-[223px] bg-[#E7F6EC] rounded-[15px]">
            <TailoredSearch />
            <h6 className="text-sm text-center xl:text-[20px] leading-[24px] font-bold">Tailored search</h6>
          </div>
        </div>
       </div>
       <div className=" space-y-8 py-16">
        <h3 className="animate-slideInLeft text-center text-[#101928] text-[44px] leading-[48px] font-bold">The essential for <span className=" text-[#00932E]">artisans</span></h3>
        <p className="animate-bounce text-center md:w-1/2 mx-2 md:mx-auto  text-[18px] leading-[24px] font-normal text-black">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum exercitationem ullam expedita aut dolore impedit deleniti cumque nemo sit tempora.</p>
        <div className="carousel-item flex-none   carousel-item  flex flex-col space-y-4 px-2 carousel  md:flex-row gap-4 items-center md:items-start md:overflow-x-auto scrollbar-hide w-full">
          <div className=" my-2  relative h-[350px]">

          <Image src="/images/landing/fashion.png" alt="" width={400} height={0} style={{height:'100%'}} className=" rounded-[10px]" />
          <h6 className=" absolute bottom-10 text-white font-bold text-lg leading-[24px]  left-[30%]">Fashion Designer</h6>
          </div>
          <div className="carousel-item flex-none  justify-center carousel-item  my-2 relative h-[350px]">

          <Image src="/images/landing/carpenmter.png" alt="" width={400} height={0} style={{height:'100%'}} className=" rounded-[10px]" />
          <h6 className=" absolute bottom-10 text-white font-bold text-lg leading-[24px] left-[30%]">Furniture making</h6>
          </div>
          <div className="carousel-item flex-none  justify-center carousel-item  my-2 relative h-[350px]">

          <Image src="/images/landing/make-up.png" alt="" width={400} height={0} style={{height:'100%'}} className=" rounded-[10px]" />
          <h6 className=" absolute bottom-10 text-white font-bold text-lg leading-[24px] left-[30%]">Make-up artist</h6>
          </div>
          <div className="carousel-item flex-none  justify-center carousel-item  my-2 relative h-[350px]">

          <Image src="/images/landing/interior.png" alt="" width={400} height={0} style={{height:'100%'}} className=" rounded-[10px]" />
          <h6 className=" absolute bottom-10 text-white font-bold text-lg leading-[24px] left-[30%]">Interior Design</h6>
          </div>
          <div className=" my-2 relative h-[350px]">

          <Image src="/images/landing/make-up.png" alt="" width={400} height={0} style={{height:'100%'}} className=" rounded-[10px]" />
          <h6 className=" absolute bottom-10 text-white font-bold text-lg leading-[24px] left-[30%]">Make-up artist</h6>
          </div>
          <div className="carousel-item flex-none  justify-center carousel-item  my-2 relative h-[350px]">

          <Image src="/images/landing/hair.png" alt="" width={400} height={0} style={{height:'100%'}} className=" rounded-[10px]" />
          <h6 className=" absolute bottom-10 text-white font-bold text-lg leading-[24px] left-[30%]">Hair stylist</h6>
          </div>
          <div className="carousel-item flex-none  justify-center carousel-item  my-2 relative h-[350px]">

          <Image src="/images/landing/make-up.png" alt="" width={400} height={0} style={{height:'100%'}} className=" rounded-[10px]" />
          <h6 className=" absolute bottom-10 text-white font-bold text-lg leading-[24px] left-[30%] ">Make-up artist</h6>
          </div>
          <div className="carousel-item flex-none  justify-center carousel-item  my-2 relative h-[350px]">

<Image src="/images/landing/carpenmter.png" alt="" width={400} height={0} style={{height:'100%'}} className=" rounded-[10px]" />
<h6 className=" absolute bottom-10 text-white font-bold text-lg leading-[24px] left-[30%] ">Furniture making</h6>
</div>

        </div>
      


       </div>
       <div className="artisan bg-[#00932E] animate-fadeIn  space-y-16  md:space-y-0 flex gap-8 flex-col md:flex-row justify-between py-32 p-16">
        <div className=" flex flex-col md:flex-row space-y-4 md:space-y-0 gap-8">
        <div className=" space-y-4 ">
          <h2 className=" text-white text-[72px] leading-[56px] font-medium">3132+</h2>
          <p className=" text-[18px] font-medium leading-[24px] text-white">TOTAL TRAINED ARTISANS</p>
        </div>
        <div className=" space-y-4 ">
          <h2 className=" text-white text-[72px] leading-[56px] font-medium">10000</h2>
          <div className=" flex items-center gap-1">
            <GradCap />
          <p className="text-[18px] font-medium leading-[24px] text-white">CERTIFIED ARTISANS</p>
          </div>
        </div>
        </div>
        <div className=" space-y-4">
          <h2 className=" text-[18px] leading-[24px] text-white">OUR NEXT MILESTONE</h2>
          <p  className=" text-[44px] text-[#04E750] leading-[48px] font-medium">We&apos;ve built a sustainable solution</p>
        </div>
       </div>
       <div className=" flex p-16 gap-4 flex-col md:flex-row bg-white">
        <div className=" flex flex-col gap-4 flex-1 md:pt-12 md:pb-28">
          <h2 className="animate-fadeIn  text-[36px] md:text-[44px] text-center md:text-left leading-[32px] md:leading-[48px] font-medium text-[#101928] ">We are National Skills Information Center</h2>
          <p className="animate-slideInLeft text-center md:text-left text-[#101928] font-normal text-[16px] md:text-[18px] leading-[24px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam esse optio error ducimus repudiandae! Quae placeat expedita rerum ducimus libero rem ipsam, enim perferendis ipsa aperiam, ipsum assumenda. Sequi saepe illo eveniet, minima veritatis minus iste repudiandae cumque perferendis eos nesciunt, facere, ratione dicta cum beatae. Eligendi a laborum magni.</p>
          <button className="w-fit rounded-md py-4 px-6 border-2 border-[#00932E] bg-[#00932E] text-white font-bold transition duration-300 ease-in-out  mx-auto md:mx-0  mt-24">View profile</button>
        </div>
        <div className=" flex-1 flex justify-end">
          <Image src="/images/Frame 1618868532.png" width={564} height={600} className=" rounded-[20px]" alt="" />
        </div>
       </div>
      </section>
    );
  }

