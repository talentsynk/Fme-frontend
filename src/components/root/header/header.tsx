'use client'
import './HeaderStyle.css'
import Image from 'next/image'
import Link from "next/link";
import { useRef,useState } from 'react';


export const RootHeader = () => {
    const [showNav,setShowNav]=useState(false)
    // const navRef = useRef<HTMLElement | null>(null);
    const ShowNav = () => {
        setShowNav(prev=>!prev)
    }
    return ( 
        
           <header className=" flex  items-center p-2 md:px-8 md:py-6">
            <Link href="/" className=" flex flex-1  gap-1">
                <Image src="/images/image 7 (1).svg" width={61} height={46} alt="" />
                <h5 className=" text-[#00932E] font-bold">NATIONAL SKILLS<br /> INFORMATION CENTER</h5>
            </Link>
           <nav className={` flex-col ${!showNav?'md:flex hidden':'flex'} space-y-4 md:space-y-0 md:flex-row flex-1 justify-between` }>
                <ul className=" flex flex-col md:flex-row md:gap-12 md:items-center">
                    <li className=" hover:text-[#00932E]"><Link href="/faqs">FAQs</Link></li>
                    <li className=" hover:text-[#00932E]"><Link href="/about">About</Link></li>
                </ul>
                <div className="flex flex-col md:flex-row gap-2 space-y-4 md:space-y-0 md:items-center">
                <button className="w-fit  hover:bg-[#00932E] hover:text-white  rounded-md px-4 py-2 font-semibold text-sm text-[#00932E] bg-white border border-solid border-[#00932E]">Login</button>
                <button className="w-fit hover:border-[#00932E] hover:border-solid hover:border-[1px] hover:bg-white hover:text-[#00932E] rounded-md px-4 py-2 font-semibold text-sm text-white bg-[#00932E]">Signup</button>
            </div>
            </nav>
            
            <div onClick={ShowNav}  className="  flex md:hidden rounded-md px-4 py-2 font-semibold text-sm text-white bg-[#00932E] ml-auto">
                <h6 className="">Menu</h6>
            </div>
           </header>
   
     );
}
 