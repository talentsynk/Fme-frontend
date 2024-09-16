interface ISimilarEmployer{
  FirstName:string;
  LGA:string;
  LastName:string;
  NIN:string;
  PhoneNumber:string;
  State:string;
  UserId:number;
  Id:number;
}
import React from 'react'
import { BlackSmallBag, GoldStar, SmallVerified } from '../landing/faqs/Svgs'
import Image from 'next/image'

const SimilarEmployer:React.FC<ISimilarEmployer> = ({FirstName, LastName}) => {
  return (
    <section className=" border-[rgb(235,237,239)] border-[1px] border-solid rounded-lg p-1 flex flex-col gap-4">
        {/* <Image src="/images/landing/fashion.png" alt='employer' width={100} height={100} className='w-full rounded-lg' /> */}
        <div className=" space-y-4">
            <div className=" flex justify-between items-center">
                <h5 className=" text-lg font-bold leading-6"> {FirstName} {LastName} </h5>
                <div className=" rounded-[5px] bg-[#E4F5EA] w-[82px] h-[26px] flex gap-1 justify-center items-center"><SmallVerified /><p className=" text-[12px] text-[#00932E]  font-medium">Verified</p></div>
            </div>
            <div className=" text-black-25 text-sm font-medium flex gap-1 items-center">
              <GoldStar />
              <p className="">4.5/5.0</p>
            </div>
            <div className=" flex gap-1 text-sm font-medium text-[#101928]">
                <BlackSmallBag />
                <p className="">12 jobs posted</p>
            </div>
        </div>
    </section>
  )
}

export default SimilarEmployer
