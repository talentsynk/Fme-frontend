"use client"
import { useState } from "react";
const AllStcs = () => {

    const [activeDiv, setActiveDiv] = useState(1);

  return (
    <div className=" flex gap-4 border-[#E4E7EC] border-b-2">
      <div className={`w-1/3 flex p-4 cursor-pointer ${activeDiv === 1 ? 'text-[#00932E] border-b-[#00932E] font-bold' : 'text-[#344054] border-inherit'}`}
        onClick={() => setActiveDiv(1)}>
        <p className=" text-sm ">All STCs</p>
        <div className=" text-[12px] font-medium">429</div>
      </div>
      <div className={`w-1/3 p-4 cursor-pointer ${activeDiv === 2 ? 'text-[#00932E] border-b-[#00932E] font-bold' : 'text-[#344054] border-inherit'}`}
        onClick={() => setActiveDiv(2)}>
        <p className=" text-sm">Active STCs</p>
      </div>
      <div className={`w-1/3 p-4 cursor-pointer ${activeDiv === 3 ? 'text-[#00932E] border-b-[#00932E] font-bold' : 'text-[#344054] border-inherit'}`}
        onClick={() => setActiveDiv(3)}>
        <p className=" text-sm">Inactive STCs</p>
      </div>
    </div>
  )
}

export default AllStcs
