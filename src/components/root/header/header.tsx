import { RootHeaderStyle } from "./style";
import Image from 'next/image'
import Link from "next/link";

export const RootHeader = () => {
    return ( 
        
           <header className=" flex justify-between items-center p-4 md:p-8">
            <div className=" flex gap-1">
                <Image src="/images/image 7 (1).svg" width={61} height={46} alt="" />
                <h5 className=" text-[#00932E] font-bold">NATIONAL SKILLS<br /> INFORMATION CENTER</h5>
            </div>
            <nav className="hidden md:flex">
                <ul className=" flex gap-4 items-center">
                    <li className=""><Link href="/">Skill Marketplace</Link></li>
                    <li className=""><Link href="/faqs">FAQs</Link></li>
                    <li className=""><Link href="/about">About</Link></li>
                </ul>
            </nav>
            <div className="hidden md:flex gap-2 items-center">
                <button className=" rounded-md px-4 py-2 font-semibold text-sm text-[#00932E] bg-white border border-solid border-[#00932E]">Login</button>
                <button className=" rounded-md px-4 py-2 font-semibold text-sm text-white bg-[#00932E]">Signup</button>
            </div>
            <div className=" flex md:hidden rounded-md px-4 py-2 font-semibold text-sm text-white bg-[#00932E] ml-auto">
                <h6 className="">Menu</h6>
            </div>
           </header>
   
     );
}
 