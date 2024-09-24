"use client";

interface IJob {
  Id: number;
  JobTitle: string;
  JobType: string;
  Description: string;
  Amount: string;
  Status?:string;
  CreatedAt?:string|undefined;
  Location?:string;
}

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/config";
import { Banner } from "@/components/artisan/comps";
import { ArtisanJobPageStyle, JobGridList } from "../style";
import {
  ColoredBriefCase,
  JobPageIcon,
} from "@/components/icons/artisan/icons";
import { PaddedSectionStyles } from "@/components/layout/style";
import { Paginator } from "@/components/fme/paginator/Paginator";
import { FormEvent } from "react";
import {
  ArtisanTabSwitches,
  Jobs,
  JobSortItemDropdownList,
} from "@/components/artisan/data";
import {
  JobSearchStyle,
  SearchAndResultStyle,
  SortOptionsStyle,
  TabSwitchStyle,
  UserTabSwitchStyle,
} from "@/components/fme/mda/styles";
import { motion } from "framer-motion";
import {
  CancelInputIcon,
  LocationIcon,
  MagnifyingGlassIcon,
} from "@/components/icons/fme/mda";
import { Ierror } from "@/app/recovery/page";
import { MdaItemComp } from "@/components/fme/mda/mda";
import { AngleDown, AngleDownStyles } from "@/components/icons/header";
import { JobComp, SelectLocationModal } from "@/components/artisan/Job";

const ArtisanJobs = () => {
  const router = useRouter();
  const [pageNo, setPageNo] = useState(1);
  const [showCancel, setShowCancel] = useState(false);

 

  const handleTabSwitch = (tabIndex: number) => {
    const newMdaTabSwitches = artisanTabSwitches.map((ele) => {
      return { ...ele, isSelected: tabIndex == ele.tabIndex };
    });
    setArtisanTabSwitches(newMdaTabSwitches);
    fetchContractJobs
    // Make an API call based on the selected tab
    switch (tabIndex) {
      case 0:
        fetchAllJobs();
        break;
      case 1:
        fetchContractJobs();
        break;
      case 2:
        fetchOnHireJobs();
        break;
      default:
        fetchAllJobs();
    }
  };

  // State for search query
  const [query, setQuery] = useState("");
  const [queryError, setQueryError] = useState<Ierror>({
    active: false,
    text: "",
  });

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };



  const CancelQuerySearch = () => {
    setQuery("");
    setQueryError({ active: false, text: "" });
    setShowCancel(false);
  };
interface ILol{
  text:string;
  isSelected:boolean;
  id:string;
  hasBorder?:boolean
}
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortItemDropdownList, setSortItemDropdownList] = useState<ILol[]>(
    [
      { text: "Last 24 hours", isSelected: false, id: "0" },
      { text: "Last 7 days", isSelected: false, id: "1" },
      { text: "Last 30 days", isSelected: false, id: "2" },
    ]
  );

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [data, setData] = useState<IJob[] | null>(null);

  useEffect(() => {
    let token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${BACKEND_URL}/job/all`, config)
      .then((res) => {
        const data = res.data.jobs;
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Filtered jobs based on the search query
  // const [pageNo, setPageNo] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (pageNo - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  

  const fetchAllJobs = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };

    try {
      const res = await axios.get(`${BACKEND_URL}/job/all`, config);
      const data = res.data.jobs;
      setData(data);
    } catch (error) {
      console.error("Error fetching All Jobs data:", error);
    }
  };

  const fetchOnHireJobs = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };

    try {
      const res = await axios.get(
        `${BACKEND_URL}/job/all?job_type=full-time`,
        config
      );
      const data = res.data.jobs;
      setData(data);
    } catch (error) {
      console.error("Error fetching Full-time Jobs data:", error);
    }
  };

  const fetchContractJobs = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };

    try {
      const res = await axios.get(
        `${BACKEND_URL}/job/all?job_type=part-time`,
        config
      );
      const data = res.data.jobs;
      setData(data);
    } catch (error) {
      console.error("Error fetching Contract Jobs data:", error);
    }
  };
  const filteredJobs = data?.filter((job) =>
    job.JobTitle.toLowerCase().includes(query.toLowerCase())
  );
  console.log(filteredJobs)
  const paginatedData = filteredJobs&&filteredJobs.slice(startIndex, endIndex);
  
  const [artisanTabSwitches, setArtisanTabSwitches] =
  useState([
    { text: "All jobs", tabIndex: 0, isSelected: true,len:filteredJobs&& filteredJobs.length },
    { text: "Part-time jobs", tabIndex: 1, isSelected: false,len:filteredJobs&& filteredJobs.length },
    { text: "Full-time jobs", tabIndex: 2, isSelected: false,len:filteredJobs&& filteredJobs.length },
  ]);

  const handleSelect = async (selectedId: string) => {
    // Map the dropdown options to `days_ago` values
    const daysAgoMap: { [key: string]: number } = {
      "0": 1,  // Last 24 hours
      "1": 7,  // Last 7 days
      "2": 30, // Last 30 days
    };
  
    const daysAgo = daysAgoMap[selectedId];
  
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
  
    try {
      const res = await axios.get(
        `${BACKEND_URL}/job/all?days_ago=${daysAgo}`,
        config
      );
      const data = res.data.jobs;
      setData(data);
    } catch (error) {
      console.error("Error fetching filtered jobs by date:", error);
    }
  
    // Update the sort dropdown state to reflect the selected option
    const updatedDropdownList = sortItemDropdownList.map((item) => ({
      ...item,
      isSelected: item.id === selectedId,
    }));
    setSortItemDropdownList(updatedDropdownList);
  };
  
  const fetchJobsByLocation = async (state: string, lga: string) => {
    try {
      // Get the authorization token from cookies
      const token = Cookies.get('token'); // Replace 'authToken' with the actual cookie name where the token is stored
  
      // Make the request with the authorization header
      const response = await axios.get(`${BACKEND_URL}/job/all?state=${state}`, {
        headers: {
          Authorization: `Bearer ${token}` // Pass the token in the Authorization header
        }
      });
  
      setData(response.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  
  // Function to handle location filter application
  const handleLocationFilter = (state: string, lga: string) => {
    fetchJobsByLocation(state, lga);
    setShowLocationModal(false); // Close the modal after applying the filter
  };
  
  console.log(filteredJobs)

  return (
    <ArtisanJobPageStyle>
      <Banner
        head="Job Portal"
        desc="Discover suitable jobs for your skills and what is next"
        icon={<JobPageIcon />}
      />
      <PaddedSectionStyles>
        <div className="cont">
          <div className="tabs">
            <div className="options">
              {artisanTabSwitches.map((ele, index) => (
                <UserTabSwitchStyle
                  key={index}
                  $tabIndex={ele.tabIndex}
                  $isSelected={ele.isSelected}
                  onClick={() => handleTabSwitch(ele.tabIndex)}
                >
                  <div className="no">
                    <p>{ele.text}</p>
                    <div className="num">
                      <span>{ele.len}</span>
                    </div>
                  </div>
                  {ele.isSelected && (
                    <motion.div
                      className="underline"
                      layoutId="underline"
                    ></motion.div>
                  )}
                </UserTabSwitchStyle>
              ))}
            </div>
          </div>
          <div className="search">
            <div className="first">
              <JobSearchStyle>
                <div className="searchbar">
                  <div className="input">
                    <div className="glass">
                      <MagnifyingGlassIcon />
                    </div>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input
                        type="text"
                        name="query"
                        placeholder="Search For Jobs"
                        value={query}
                        onChange={handleQueryChange}
                        onFocus={() => setShowCancel(true)}
                        className={query ? "search-active" : ""}
                      />
                    </form>
                    {showCancel && (
                      <div className="abs" onClick={CancelQuerySearch}>
                        <CancelInputIcon isError={queryError.active} />
                      </div>
                    )}
                    <p
                      className={`msg ${
                        queryError.active ? "error" : "correct"
                      }`}
                    >
                      {queryError.text}
                    </p>
                  </div>
                  <div className="loc">
                    <button
                      type="button"
                      onClick={() => {
                        setShowLocationModal(true);
                        setShowSortDropdown(false);
                      }}
                    >
                      <LocationIcon />
                      <p>Location</p>
                    </button>
                    {showLocationModal && (
                      <SelectLocationModal
                      closeModal={() => setShowLocationModal(false)}
                      applyFilter={handleLocationFilter}
                      />
                    )}
                  </div>
                  <div className="sort">
                    <button
                      type="button"
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                    >
                      <p>Sort By</p>
                      <AngleDownStyles $isSelected={showSortDropdown}>
                        <AngleDown />
                      </AngleDownStyles>
                    </button>
                  </div>
                  <div className="filsort">
                    {/* filterBtns includes both Sort & Filter */}
                    {showSortDropdown && (
                      <SortOptionsStyle>
                        <div className="options">
                          {sortItemDropdownList.map((ele, index) => (
                            <MdaItemComp
                              key={index}
                              id={ele.id}
                              isSelected={ele.isSelected}
                              text={ele.text}
                              hasBorder={ele.hasBorder}
                              handleSelect={() => handleSelect(ele.id)}
                            />
                          ))}
                        </div>
                      </SortOptionsStyle>
                    )}
                  </div>
                </div>
              </JobSearchStyle>
            </div>
          </div>

          {/* Display Filtered Jobs */}
          <JobGridList>
            {paginatedData && paginatedData.length > 0 ? (
              paginatedData.map((job, index) => (
                <JobComp
                  key={index}
                  Id={job.Id}
                  JobTitle={job.JobTitle}
                  JobType={job.JobType}
                  Description={job.Description}
                  Amount={job.Amount}
                  CreatedAt={job.CreatedAt}
                  Location={job.Location}
                />
              ))
            ) : (
              <p>No jobs found for your search.</p>
            )}
          </JobGridList>
          <Paginator
            value={pageNo}
           incrementFunc={() => {
    if (data && endIndex < data.length) {
      setPageNo(pageNo + 1);
    }
  }}
            decrementFunc={() => {
          if (pageNo > 1) {
            setPageNo(pageNo - 1);
          }
        }}
          />
        </div>
      </PaddedSectionStyles>
    </ArtisanJobPageStyle>
  );
};

export default ArtisanJobs;
