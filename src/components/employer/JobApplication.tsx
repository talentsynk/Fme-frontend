import React from 'react'
import Image from 'next/image'
import { SmallVerified } from '../landing/faqs/Svgs'
import Link from 'next/link'

interface IJob{
    name:string,
    text:string,
    status:string
}

const JobApplication:React.FC<IJob> = ({name,text,status}) => {
  return (
    <section className=" min-w-[288px] space-y-2">
        <div className=" w-full">
            <Image src="/images/landing/application.png" alt='job application' className="w-full" width={100} height={214} />
        </div>
        <div className=" flex flex-col gap-4">
            <div className=" flex justify-between">
                <h5 className=" text-lg font-bold leading-6 text-black">{name}</h5>
                <div className=" rounded-[5px] bg-[#E4F5EA] w-[82px] h-[26px] flex gap-1 justify-center items-center"><SmallVerified /><p className=" text-[12px] leading-[17.4px] font-medium text-[#00932E]"> {status}</p></div>
            </div>
            <p className=" text-[13px] leading-[18.5px] font-medium text-black-70">
            {text}
            </p>
            <div className=" flex justify-end">
                <p className=" font-medium text-sm leading-5 text-black-25">Applied 2 hours ago</p>
            </div>
            <Link href={`/dashboard/employer/jobs/1/applications/review/1`}><button className="w-full text-[16px] leading-6 font-bold text-white bg-[#00932E] rounded-md px-4 py-2">Review Profile</button></Link>
        </div>
    </section>
  )
}

export default JobApplication
