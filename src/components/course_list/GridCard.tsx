import React from 'react'
import { CertifiedStudent, MDA, STC, TotalStudent } from './Svg'

const GridCard = () => {
  return (
    <section className=" flex mt-4 gap-4">
        <section className=" flex-1 flex flex-wrap gap-2">
            <div className="h-[106px]  flex items-center justify-between p-4 gap-4 w-[33%] rounded-[10px] border border-[#00932E] bg-[#E7F6EC]">
                <div className="">
                    <p className=" text-[12px] font-semibold text-[#475467] leading-[145%]">Total Number of Students</p>
                    <p className=" text-lg font-semibold text-[#344054] leading-6">1,000,000</p>
                </div>
                <TotalStudent />
            </div>
            <div className="h-[106px]  flex items-center justify-between p-4 gap-4 w-[63%] rounded-[10px] border border-[#7168C8] bg-[#F5F4FF]">
                <div className="">
                    <p className=" text-[12px] font-semibold text-[#475467] leading-[145%]">Total Number of Students</p>
                    <p className=" text-lg font-semibold text-[#344054] leading-6">1,000,000</p>
                </div>
                <CertifiedStudent />
            </div>
            <div className="h-[106px]  flex items-center justify-between p-4 gap-4 w-[63%] rounded-[10px] border border-[#81A2F4] bg-[#F1F5FF]">
                <div className="">
                    <p className=" text-[12px] font-semibold text-[#475467] leading-[145%]">Total Number of Students</p>
                    <p className=" text-lg font-semibold text-[#344054] leading-6">1,000,000</p>
                </div>
                <MDA />
            </div>
            <div className="h-[106px]  flex items-center justify-between p-4 gap-4 w-[33%] rounded-[10px] border border-[#E3C54D] bg-[#FFFBEB]">
                <div className="">
                    <p className=" text-[12px] font-semibold text-[#475467] leading-[145%]">Total Number of Students</p>
                    <p className=" text-lg font-semibold text-[#344054] leading-6">1,000,000</p>
                </div>
                <STC />
            </div>
        </section>
        <section className=" flex-1 border border-[#E4E7EC] rounded-[10px] px-5 py-[18px]">

        </section>
    </section>
  )
}

export default GridCard
