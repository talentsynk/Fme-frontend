interface IApplication{
  ApplicationId:number;
  JobId:number;
  ArtisanId:number;
  AverageRating:number;
  ApplicationStatus:string;
  BusinessDescription:string;
  BusinessName:string;
  FirstName:string;
  LastName:string;
  JobApplicationDate:string;

}
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

  const lol=params.id
  const [data,setData]=useState<IApplication[]|null>(null)
  const [filteredData, setFilteredData] = useState<IApplication[]|null>([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
    

    useEffect(() => {
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Modify the API call based on the selected filter
      let apiUrl = `${BACKEND_URL}/job/applicants/${lol}`;
      if (selectedFilter === "Selected") {
        apiUrl += "?status=selected";
      } else if (selectedFilter === "Declined") {
        apiUrl += "?status=declined";
      }
  
      axios
        .get(apiUrl, config)
        .then((res) => {
          const applicants = res.data.applicants;
          setData(applicants);
        })
        .catch((error) => console.log(error));
    }, [selectedFilter]); // Rerun the API call when the filter changes
  
    // Handle filter change
    const handleFilterChange = (filter:string) => {
      setSelectedFilter(filter);
    };

    
  
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
      <div className=" space-y-2 my-4">
      <h3 className=" text-[#191B1C] text-2xl leading-9 font-bold px-4">Applicants({data&&data?.length})</h3>
<p className=" text-[#626C70] text-sm font-medium leading-5 px-4">Here is all your Relik analytics overview</p>
      </div>
      <section className="flex flex-col md:flex-row gap-2 mt-4">

      <div className="md:w-[20%] hidden md:block md:border-[#EBEDF4] md:border-[1px] md:border-solid p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="md:flex flex-col space-y-2">
          {/* All Artisans */}
          <label className="flex items-center">
            <input
              type="checkbox"
              className={`form-checkbox h-4 w-4 ${
                selectedFilter === "All" ? "bg-[#00932E] border-[#00932E]" : ""
              }`}
              checked={selectedFilter === "All"}
              onChange={() => handleFilterChange("All")}
            />
            <span className="ml-2">All Professionals</span>
            <span className="ml-auto text-[#222222] font-bold">{selectedFilter=="All"&&data && data.length}</span>
          </label>

          {/* Selected Artisans */}
          <label className="flex items-center">
            <input
              type="checkbox"
              className={`form-checkbox h-4 w-4 ${
                selectedFilter === "Selected" ? "bg-green-500 border-green-500" : ""
              }`}
              checked={selectedFilter === "Selected"}
              onChange={() => handleFilterChange("Selected")}
            />
            <span className="ml-2">Selected Professionals</span>
            <span className="ml-auto text-[#222222] font-bold">{selectedFilter=="Selected"&&data && data.length}</span>
          </label>

          {/* Declined Artisans */}
          <label className="flex items-center">
            <input
              type="checkbox"
              className={`form-checkbox h-4 w-4 ${
                selectedFilter === "Declined" ? "bg-green-500 border-green-500" : ""
              }`}
              checked={selectedFilter === "Declined"}
              onChange={() => handleFilterChange("Declined")}
            />
            <span className="ml-2">Declined Professionals </span>
            <span className="ml-auto text-[#222222] font-bold">{selectedFilter=="Declined" && data && data.length}</span>
          </label>
        </div>
      </div>
        <h3 className="my-2 mx-4 md:hidden text-[24px] font-semibold mb-4">Categories</h3>
    <section className="md:w-[80%] ">
<section className="">
<div className={` ${data && data?.length>0?'grid-container grid gap-8':'flex justify-center items-center'} px-4`}>
{data && data?.length > 0 ? (
        data?.map(app => (
          <JobApplication key={app.ArtisanId} {...app} />
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
