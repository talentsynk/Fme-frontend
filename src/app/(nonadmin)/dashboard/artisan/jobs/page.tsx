"use client";
interface IJob{
  Id:string;
  JobTitle:string;
  JobType:string;
  Description:string;
  Amount:string;
}
import Cookies from "js-cookie";
import {useState,useEffect} from 'react'
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
import { ArtisanTabSwitches, Jobs, JobSortItemDropdownList } from "@/components/artisan/data";
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
  const router=useRouter()
  const [pageNo, setPageNo] = useState(1);
  const [showCancel, setShowCancel] = useState(false);

  const [artisanTabSwitches, setArtisanTabSwitches] =
    useState(ArtisanTabSwitches);
  const handleTabSwitch = (tabIndex: number) => {
    const newMdaTabSwitches = artisanTabSwitches.map((ele) => {
      return { ...ele, isSelected: tabIndex == ele.tabIndex };
    });
    setArtisanTabSwitches(newMdaTabSwitches);
  };
  // for search
  const [query, setQuery] = useState("");
  const [queryError, setQueryError] = useState<Ierror>({
    active: false,
    text: "",
  });
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim().length < 1) {
      setQueryError({ active: true, text: "Query cannot be empty" });
      setQuery(value);
    } else {
      setQuery(value);
      setQueryError({ active: false, text: "Press enter to search" });
    }
  };
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    if (query.trim().length >= 1) {
      // filter from the unchanged mda list
      console.log(query);
    }
  };
  const CancelQuerySearch = () => {
    setQuery("");
    setQueryError({ active: false, text: "" });
    // return mdaList and listDuplicate to default - might involve calling the api
    // revert the sorting
    setShowCancel(false);
  };
  // sort
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortItemDropdownList, setSortItemDropdownList] = useState(
    JobSortItemDropdownList
  );
  // location
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [data,setData]= useState<IJob[]|null>(null)
  useEffect(() => {
		let token = Cookies.get("token");
    console.log(token)
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios
			.get(`${BACKEND_URL}/job/all`, config)
			.then((res) => {
        console.log(res)
				const data = res.data.jobs;
				setData(data);
			})
			.catch((error) => console.log(error));
	}, []);
  console.log(data)

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
                      <span>{20}</span>
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
                    <form onSubmit={handleSearch}>
                      <input
                        type="text"
                        name="query"
                        id=""
                        placeholder="Search For Jobs"
                        value={query}
                        className={queryError.active ? "error-bdr" : ""}
                        onChange={handleQueryChange}
                        onFocus={() => setShowCancel(true)}
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
                              handleSelect={() => console.log(ele.id)}
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
          <div className="jobs">
            <div className="head">
              <ColoredBriefCase />
              <h2>Latest Jobs</h2>
            </div>
            <JobGridList>
              { data && data.length>0?(data?.map((ele, index) => (
                <JobComp key={index} {...ele} />
              ))):(
                <section className=" w-full flex justify-center items-center flex-col gap-8">
                    
                      <p className=" md:w-1/2 text-center text-[16px] leading-[24px] text-black font-medium">There are no available jobs </p>
                      <button onClick={()=>router.push('/dashboard/artisan/jobs')} className="w-[200px] h-[48px] rounded-[6px] bg-[#00932E] text-white font-bold">Apply for Jobs</button>
                </section>
              )}
            </JobGridList>
          </div>
          <Paginator
            value={pageNo}
            incrementFunc={() => setPageNo(pageNo + 1)}
            decrementFunc={() => {
              if (pageNo - 1 > 0) {
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
