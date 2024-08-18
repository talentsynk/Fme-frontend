"use client";
import { Banner } from "@/components/artisan/comps";
import { ArtisanJobPageStyle } from "../style";
import {
  ColoredBriefCase,
  JobPageIcon,
} from "@/components/icons/artisan/icons";
import { PaddedSectionStyles } from "@/components/layout/style";
import { Paginator } from "@/components/fme/paginator/Paginator";
import { FormEvent, useState } from "react";
import { ArtisanTabSwitches } from "@/components/artisan/data";
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
import { JobSortItemDropdownList } from "./data";
import { AngleDown, AngleDownStyles } from "@/components/icons/header";
import { JobComp, SelectLocationModal } from "@/components/artisan/Job";

const ArtisanJobs = () => {
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
            <div className="job-list">
              <JobComp />
              <JobComp />
              <JobComp />
              <JobComp />
              <JobComp />
              <JobComp />
              <JobComp />
              <JobComp />
              <JobComp />
            </div>
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
