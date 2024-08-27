import React from 'react'
import Link from 'next/link'
import { GreyArrowRight } from '@/components/icons/artisan/icons'
import JobApplication from '@/components/employer/JobApplication'

const JobApplications = () => {
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
      <section className="flex gap-2 mt-4">

    <div className="w-[20%] border-[#EBEDF4] border-[1px] border-solid p-4 rounded-lg ">
<h2 className="text-lg font-semibold mb-4">Categories</h2>
<div className="flex flex-col space-y-2">
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

    <section className=" w-[80%]">

<section className="">
<div className=" grid-container grid gap-8 px-4">
{applications.map(app=>(<JobApplication key={app.id} {...app} />))}
</div>
</section>

</section>
      </section>
  </section>
  )
}

export default JobApplications
