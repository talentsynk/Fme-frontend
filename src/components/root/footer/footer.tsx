import { FooterStyle } from "./style";
import Image from "next/image";
import Link from "next/link";

export const RootFooter = () => {
    return ( 
      
            <footer className=" bg-[#E7F6EC] p-8 space-y-4">
                <section className=" flex flex-col md:flex-row space-y-4  justify-between">
                    <div className=" space-y-4">
                    <div className=" flex gap-1">
                <Image src="/images/image 7 (1).svg" width={61} height={46} alt="" />
                <h5 className=" text-[#00932E] font-bold">NATIONAL SKILLS<br /> INFORMATION CENTER</h5>
            </div>
            <ul className=" flex gap-4 items-center text-[#667185]">
                    <li className=""><Link href="/">Skill Marketplace</Link></li>
                    <li className=""><Link href="/faqs">FAQs</Link></li>
                    <li className=""><Link href="/about">About</Link></li>
                </ul>
                    </div>
                    <div className=" space-y-2">
                        <h6>Get started today!</h6>
                        <button className="w-[150px] p-2 h-[36px] rounded-md text-white bg-[#00932E] font-normal">Hire an artisan</button>
                    </div>
                </section>
                <section className=" border-t-[2px] pt-4 border-solid border-t-[#E4E7EC] flex justify-between ">
                    <div className="">SOCIAL MEDIA LINKS</div>
                    <div className=" flex gap-2 text-[#667185]">
                        <p className="">Terms of Service</p>
                        <p className="">Privacy Policy</p>
                    </div>
                </section>
            </footer>
      
     );
}
 