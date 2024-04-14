"use client"
import { useState } from "react";

const CurrentCourse = () => {

    const [activeDiv, setActiveDiv] = useState(1);

  return (
    <div className=" flex gap-4 border-[#E4E7EC] border-b-2">
      <div className={` flex items-center gap-1 p-4 cursor-pointer ${activeDiv === 1 ? 'text-[#00932E] border-b-2 border-b-[#00932E] font-bold' : 'text-[#344054] border-inherit'}`}
        onClick={() => setActiveDiv(1)}>
        <p className=" text-sm ">Current Course List</p>
        {activeDiv === 1&&<div className=" text-[12px] font-medium bg-[#E7F6EC] rounded-[10px] py-1 px-2">429</div>}
      </div>
      <div className={`flex gap-1 p-4 cursor-pointer ${activeDiv === 2 ? 'text-[#00932E] border-b-2 border-b-[#00932E] font-bold' : 'text-[#344054] border-inherit'}`}
        onClick={() => setActiveDiv(2)}>
        <p className=" text-sm">Analytics of all Course</p>
        {activeDiv === 2&&<div className=" text-[12px] font-medium bg-[#E7F6EC] rounded-[10px] py-1 px-2">429</div>}
      </div>
    </div>
  )
}

export default CurrentCourse
