'use client'
import React from 'react'
import Link from 'next/link'
import { useEffect,useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { BACKEND_URL } from '@/lib/config'
import { GreyArrowRight } from '@/components/icons/artisan/icons'
import JobApplication from '@/components/employer/JobApplication'

const JobApplications = ({ params }: { params: { id: string } }) => {
  console.log(params.id)
  const [data,setData]=useState(null)
    const applications=[
        {
            name:"Oragon confectioneries",
            text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. I need a caterer for 20 peoples meal in a birthday party that is coming up soon,...",
            status:"verified",
            id:1
        },
        {
            name:"Oragon confectioneries",
            text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. I need a caterer for 20 peoples meal in a birthday party that is coming up soon,...",
            status:"verified",
            id:2
        },
        {
            name:"Oragon confectioneries",
            text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. I need a caterer for 20 peoples meal in a birthday party that is coming up soon,...",
            status:"verified",
            id:3
        },
        {
            name:"Oragon confectioneries",
            text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. I need a caterer for 20 peoples meal in a birthday party that is coming up soon,...",
            status:"verified",
            id:4
        },
        {
            name:"Oragon confectioneries",
            text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. I need a caterer for 20 peoples meal in a birthday party that is coming up soon,...",
            status:"verified",
            id:5
        },
        {
            name:"Oragon confectioneries",
            text:"I need a caterer for 20 peoples meal in a birthday party that is coming up soon. I need a caterer for 20 peoples meal in a birthday party that is coming up soon,...",
            status:"verified",
            id:6
        },
    ]
    
    useEffect(() => {
      let token = Cookies.get("token");
      console.log(token)
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .get(`${BACKEND_URL}/job/applicants/1`, config)
        .then((res) => {
          const data = res.data;
          setData(data);
        })
        .catch((error) => console.log(error));
    }, []);
    console.log(data)
    
  
  return (
    <section className=" p-4">
      <div className=" flex gap-2 items-center p-2">
<Link href="/dashboard/employer">
<p className="text-[#BFBFBF] font-medium leading-6">Job Portal</p>
</Link>
<GreyArrowRight />
<Link href="/dashboard/employer/jobs/1">
<p className="text-[#BFBFBF] font-medium leading-6">View job details</p>
</Link>
<GreyArrowRight />
<p className="text-[#00932E] font-bold leading-6">View Job Applications</p>
</div>
      <div className="">
      <h3 className=" text-[#191B1C] text-2xl leading-9 font-bold px-4">Applicants(9)</h3>
<p className=" text-[#626C70] text-sm font-medium leading-5 px-4">Here is all your Relik analytics overview</p>
      </div>
      <section className="flex flex-col md:flex-row gap-2 mt-4">

    <div className="w-[20%]  md:border-[#EBEDF4] md:border-[1px] md:border-solid p-4 rounded-lg ">
<h2 className="text-lg font-semibold mb-4">Categories</h2>
<div className="md:flex flex-col hidden space-y-2">
  <label className="flex items-center">
    <input type="checkbox" className="form-checkbox h-4 w-4 text-[#00932E]" />
    <span className="ml-2">All Artisans</span>
    <span className="ml-auto text-[#222222] font-bold ">10</span>
  </label>
  <label className="flex items-center">
    <input type="checkbox" className="form-checkbox h-4 w-4 text-[#00932E]" checked />
    <span className="ml-2">Selected Artisans</span>
    <span className="ml-auto text-[#222222] font-bold ">5</span>
  </label>
  <label className="flex items-center">
    <input type="checkbox" className="form-checkbox h-4 w-4 text-[#00932E]" />
    <span className="ml-2">Artisans Declined</span>
    <span className="ml-auto text-[#222222] font-bold ">5</span>
  </label>
</div>
    </div>

    <section className=" md:w-[80%]">

<section className="">
<div className={` ${applications.length>0?'grid-container grid gap-8':'flex justify-center items-center'} px-4`}>
{applications.length > 0 ? (
        applications.map(app => (
          <JobApplication key={app.id} {...app} />
        ))
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-center text-[24px] font-bold text-gray-500">No applicants yet</p>
        </div>
      )}
</div>
</section>

    </section>
      </section>
  </section>
  )
}

export default JobApplications
