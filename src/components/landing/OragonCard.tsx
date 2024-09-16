interface OragonCard{
  JobTitle:string;
  Description:string;
  Status:string;
  Id:number|null|undefined;
  Amount:number;
  JobType:string;
}
interface Oragon{
  Name:string;
  Description:string;
  ApplicationStatus:string;
  Id:number|null|undefined
}
interface ISavedOragonCard{
  Name:string;
  Description:string;
  Id:number|null|undefined;
  Amount:number;
  JobType:string;
  Location:string
}
interface ISavedData{
  JobTitle:string;
  Description:string;
  Id:number|null|undefined;
  Amount:number;
  JobType:string;
  Location?:string
  Status:string;
}
'use client'
import {useState,useEffect} from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { BACKEND_URL } from '@/lib/config';
import { Clock, GreenClock, LLocation, Padlock, Star, Tick,SmallRedIcon, CircleTick } from './faqs/Svgs'
import { ButtonLoader, GreenButtonLoader } from '../recovery/style';

const EmployersOragonCard:React.FC<OragonCard> = ({JobTitle,Description,Status,Id,Amount,JobType}) => {
  return (
    <div className=' border-[#F0F0F0] border border-solid rounded-2xl p-2 flex gap-2 items-center '>
        <div className=" rounded-[5px] p-2.5 bg-[#E7F6EC]"><Padlock /></div>
        <div className=" space-y-2 w-full">
            <h5 className="text-[#1A1A1A] text-[16px] font-medium leading-[24px]">{JobTitle}</h5>
            <p className=" text-[#919191] text-[12px] font-medium leading-[17px] ">{Description}</p>
            <div className=" flex justify-between items-center w-full">
              <div className=" space-y-1">
              <h6 className=" text-[12px] font-medium leading-[17px]">{Amount} . {JobType}</h6>
              <h6 className=" text-[12px] font-medium leading-[17px]">Job Status</h6>
            <button className={`${Status=="open"?"bg-[#00932E]":Status=="completed"?"bg-[#00932E]":"bg-[#E7F6EC]"} flex items-center gap-1 text-white rounded-md py-1 px-2 text-[10px] font-bold`}>{Status=="open"?<Tick />:Status=="completed"?<CircleTick />:<GreenClock />} <span className={`${Status=="open"?"text-[#E7f6Ec]":Status=="completed"?"text-[#E7f6Ec]":"text-[#00932E]"}`}>{Status === "open" ? "Job Open" : Status === "completed" ? "Job Completed" : "Ongoing"
}</span></button>
              </div>
              <Link href={`/dashboard/employer/jobs/${Id}`} className="flex items-center bg-[#00932E] text-white rounded-md py-2 px-4 md:text-sm text-[12px]  font-medium">View Job</Link>
            </div>
        </div>
      
    </div>
  )
}
const OragonCard:React.FC<Oragon> = ({Name,Description,ApplicationStatus,Id}) => {
  return (
    <div className=' bg-white rounded-2xl p-2 flex gap-2 items-center '>
        <div className=" rounded-[5px] p-2.5 bg-[#E7F6EC]"><Padlock /></div>
        <div className=" space-y-2 w-full">
            <h5 className="text-[#1A1A1A] text-[16px] font-medium leading-[24px]">{Name}</h5>
            <p className=" text-[#919191] text-[12px] font-medium leading-[17px] ">{Description}</p>
            <div className=" flex justify-between w-full">
              <div className=" space-y-1">
              <h6 className=" text-[12px] font-medium leading-[17px]">Application Status</h6>
              <button
  className={`${
    ApplicationStatus === "hired"
      ? "bg-[#00932E] text-white"
      : ApplicationStatus === "declined"
      ? "bg-[#ffE5DD] text-[#FE764B]"
      : "bg-[#FFEEB0] text-[#F9C00B]"
  } flex items-center gap-1 rounded-md py-1 px-2 text-[10px] font-bold`}
>
  {ApplicationStatus === "hired" ? (
    <Tick />
  ) : ApplicationStatus === "declined" ? (
    <SmallRedIcon />
  ) : (
    <Clock />
  )}
  <span className="">
    {ApplicationStatus === "hired"
      ? "Job Offered"
      : ApplicationStatus === "declined"
      ? "Application Declined"
      : "In Review"}
  </span>
</button>

              </div>
              <Link href={`/dashboard/artisan/jobs/${Id}`} className=" bg-[#00932E] text-white rounded-md flex items-center px-2 py-1 md:py-2 text-[12px] md:px-4 md:text-sm font-medium">View Job</Link>
            </div>
        </div>
      
    </div>
  )
}
const JobsPostedCard:React.FC<ISavedData> = ({Description,Amount,JobType,Location,Id,JobTitle}) => {

  
  const router=useRouter()
  return (
    <div className=' bg-white rounded-2xl border-[#f0f0f0] border border-solid p-2 flex gap-2 items-center '>
        <div className=" rounded-[5px] p-2.5 bg-[#E7F6EC]"><Padlock /></div>
        <div className=" space-y-2 w-full">
            <div className=' flex justify-between'>
            <h5 className="text-[#1A1A1A] text-[16px] font-medium leading-[24px]">{JobTitle}</h5>
           
            </div>
            <p className=" text-[#919191] text-[12px] font-medium leading-[17px] ">{Description}</p>
            <div className=" flex justify-between">
              <div className="">
              <h6 className=" text-[12px] font-medium leading-[17px]">{Amount} . {JobType}</h6>
            <div className=" flex gap-1 bg-[#F5F5F5] rounded p-1 justify-center items-center">
              <LLocation />
            <p className=" text-[#919191] text-[10px] font-medium">{Location}</p>
            </div>
              </div>
              <button onClick={()=>{router.push(`/dashboard/artisan/jobs/${Id}`)}} className=" bg-[#00932E] text-white w-[100px] h-[36px] flex justify-center items-center rounded-md text-sm font-medium"> View Job</button>
            </div>
        </div>
      
    </div>
  )
}
const SavedOragonCard:React.FC<ISavedOragonCard> = ({Description,Amount,JobType,Location,Id,Name}) => {

  
  const router=useRouter()
  return (
    <div className=' bg-white rounded-2xl border-[#f0f0f0] border border-solid p-2 flex gap-2 items-center '>
        <div className=" rounded-[5px] p-2.5 bg-[#E7F6EC]"><Padlock /></div>
        <div className=" space-y-2 w-full">
            <div className=' flex justify-between'>
            <h5 className="text-[#1A1A1A] text-[16px] font-medium leading-[24px]">{Name}</h5>
            <Star />
            </div>
            <p className=" text-[#919191] text-[12px] font-medium leading-[17px] ">{Description}</p>
            <div className=" flex justify-between">
              <div className="">
              <h6 className=" text-[12px] font-medium leading-[17px]">{Amount} . {JobType}</h6>
            <div className=" flex gap-1 bg-[#F5F5F5] rounded p-1 justify-center items-center">
              <LLocation />
            <p className=" text-[#919191] text-[10px] font-medium">{Location}</p>
            </div>
              </div>
              <button onClick={()=>{router.push(`/dashboard/artisan/jobs/${Id}`)}} className=" bg-[#00932E] text-white w-[100px] h-[36px] flex justify-center items-center rounded-md text-sm font-medium"> Apply now</button>
            </div>
        </div>
      
    </div>
  )
}

export { EmployersOragonCard, OragonCard, SavedOragonCard,JobsPostedCard }

