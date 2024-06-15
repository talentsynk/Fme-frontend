import { Diploma, GradCap, Organise, TailoredSearch } from "@/components/landing/faqs/Svgs";
import "../globals.css";
import Image from 'next/image'
import { Verified } from "@/components/fme/course_list/Svg";

// client
export default function Home() {

    return (
      <section className="">
       <div className=" flex p-8">
        <div className=" flex-1 space-y-4">
          <h1 className=" text-[56px] leading-[77px] font-medium">Hiring Skilled <span className=" text-[#00932E]">Artisans</span>  just got easy!</h1>
          <p className=" font-medium text-[16px] leading-[24px] text-black">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nostrum, atque voluptates eveniet ex quod dolores asperiores ullam officia repudiandae accusamus laudantium sint aspernatur maiores doloremque, nihil tempora quae quasi nam delectus voluptatum. Alias possimus quos dicta et eligendi eaque.</p>
          <button className=" rounded-md py-4 px-6 text-white font-bold bg-[#00932E]">Get started today!</button>
        </div>
        <div className="flex-1 flex justify-end">
          <Image src="/images/first.png" alt="hero-image" width={407} height={455} />
        </div>
       </div>
       <div className=" bg-[#00932E] pt-4">
        <h5 className="text-[18px] leading-[24px] text-white font-medium text-center">ENDORSED BY THE </h5>
        <div className=" text-center my-8">NATIONAL LOGO SVG</div>
        <div className=" flex ">
          <Image src="/images/second.png" width={721} height={350} alt="endorsement pictures" className=" flex-1" />
          <Image src="/images/third.png" width={721} height={350} alt="endorsement pictures" className=" flex-1" />
        </div>
        <div className=" flex p-8 justify-between py-16">
          <div className="text-white flex-1 space-y-6">
            <h4 className=" text-[18px] leading-[24px] font-medium">WHO WE ARE?</h4>
            <p className=" text-[44px] font-medium leading-[48px]">We are all about</p>
            <p className=" text-[18px] leading-[24px] font-normal">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi labore exercitationem repellendus vero, minima quos quae maiores temporibus ad enim iste quibusdam veniam at voluptas numquam illo expedita maxime aliquid velit aliquam sint. Velit voluptas porro repudiandae quisquam cumque eius.</p>
          </div>
          <div className=" flex-1 flex justify-end">
          <Image src="/images/fourth.png" width={512} height={468} alt="endorsement pictures" />
          </div>
        </div>
       </div>
       <div className=" flex gap-4 p-8 py-16">
        <div className=" flex-1 space-y-4">
          <h5 className=" text-[18px] font-medium leading-[24px] text-[#101928]">OUR NEXT MILESTONE</h5>
          <h2 className="text-[44px] font-medium leading-[48px] text-[#101928]">We Are National Skills Information Center</h2>
          <p className="text-[18px] font-normal leading-[24px] text-[#101928]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati incidunt iusto ullam autem laborum harum, possimus nihil deleniti sint impedit debitis vero repellendus ab magnam ratione aperiam sequi. Minus sapiente fugiat, officia tempora accusantium numquam corporis dolorem maxime eaque recusandae!</p>
          <button className=" mt-12 rounded-md py-4 px-6 text-white font-bold bg-[#00932E]">Get started today!</button>
        </div>
        <div className=" flex-1 flex flex-wrap gap-4 justify-end">
          <div className="w-[325px] flex-col flex justify-center items-center h-[223px] bg-[#E7F6EC] rounded-[15px]">
            <Diploma />
            <h6 className=" text-[20px] leading-[24px] font-bold">Find quality applicants</h6>
          </div>
          <div className="w-[325px] flex-col flex justify-center items-center h-[223px] bg-[#E7F6EC] rounded-[15px]">
            <Verified />
            <h6 className=" text-[20px] leading-[24px] font-bold">Verify their ability</h6>
          </div>
          <div className="w-[325px] flex-col flex justify-center items-center h-[223px] bg-[#E7F6EC] rounded-[15px]">
            <Organise />
            <h6 className=" text-[20px] leading-[24px] font-bold">Organise your candidates</h6>
          </div>
          <div className="w-[325px] flex-col flex justify-center items-center h-[223px] bg-[#E7F6EC] rounded-[15px]">
            <TailoredSearch />
            <h6 className=" text-[20px] leading-[24px] font-bold">Tailored search</h6>
          </div>
        </div>
       </div>
       <div className=" space-y-4 py-16">
        <h3 className=" text-center text-[#101928] text-[44px] leading-[48px] font-bold">The essential for <span className=" text-[#00932E]">artisans</span></h3>
        <p className="text-center w-1/2 mx-auto  text-[18px] leading-[24px] font-normal text-black">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum exercitationem ullam expedita aut dolore impedit deleniti cumque nemo sit tempora.</p>
        <div className=" flex gap-2 overflow-scroll">
          <Image src="/images/artisans.png" alt="" width={280} height={320} className=" rounded-[10px]" />
          <Image src="/images/artisans.png" alt="" width={280} height={320} className=" rounded-[10px]" />
          <Image src="/images/artisans.png" alt="" width={280} height={320} className=" rounded-[10px]" />
          <Image src="/images/artisans.png" alt="" width={280} height={320} className=" rounded-[10px]" />
          <Image src="/images/artisans.png" alt="" width={280} height={320} className=" rounded-[10px]" />
          <Image src="/images/artisans.png" alt="" width={280} height={320} className=" rounded-[10px]" />
          <Image src="/images/artisans.png" alt="" width={280} height={320} className=" rounded-[10px]" />
          <Image src="/images/artisans.png" alt="" width={280} height={320} className=" rounded-[10px]" />
          <Image src="/images/artisans.png" alt="" width={280} height={320} className=" rounded-[10px]" />
          <Image src="/images/artisans.png" alt="" width={280} height={320} className=" rounded-[10px]" />
        </div>
       </div>
       <div className=" bg-[#00932E] flex justify-between p-16">
        <div className=" flex gap-16">
        <div className=" space-y-4">
          <h2 className=" text-white text-[72px] leading-[56px] font-medium">3132+</h2>
          <p className=" text-[18px] font-medium leading-[24px] text-white">TOTAL TRAINED ARTISANS</p>
        </div>
        <div className=" space-y-4">
          <h2 className=" text-white text-[72px] leading-[56px] font-medium">10000</h2>
          <div className=" flex items-center gap-1">
            <GradCap />
          <p className="text-[18px] font-medium leading-[24px] text-white">CERTIFIED ARTISANS</p>
          </div>
        </div>
        </div>
        <div className="">
          <h2 className=" text-[18px] leading-[24px] text-white">OUR NEXT MILESTONE</h2>
          <p className=" text-[44px] text-gradient-to-r from-[#04E750] to-[#EAFFF1] leading-[48px] font-medium">We&apos;ve built a sustainable solution</p>
        </div>
       </div>
       <div className=" flex p-16 gap-4">
        <div className=" flex flex-col gap-4 flex-1 pb-28">
          <h2 className=" text-[44px] leading-[48px] font-medium text-[#101928] ">We are National Skills Information Center</h2>
          <p className=" text-[#101928] font-normal text-[18px] leading-[24px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam esse optio error ducimus repudiandae! Quae placeat expedita rerum ducimus libero rem ipsam, enim perferendis ipsa aperiam, ipsum assumenda. Sequi saepe illo eveniet, minima veritatis minus iste repudiandae cumque perferendis eos nesciunt, facere, ratione dicta cum beatae. Eligendi a laborum magni.</p>
          <button className="w-fit mt-auto rounded-md py-4 px-6 text-white font-bold bg-[#00932E]">View profile</button>
        </div>
        <div className=" flex-1 flex justify-end">
          <Image src="/images/Frame 1618868532.png" width={564} height={600} className=" rounded-[20px]" alt="" />
        </div>
       </div>
      </section>
    );
  }

