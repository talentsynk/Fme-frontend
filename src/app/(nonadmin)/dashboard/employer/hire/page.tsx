"use client"
interface IArtisan {
  AverageRating: number;
  BusinessDescription: string;
  BusinessName: string;
  FirstName: string;
  LastName: string;
  ID: number;
}

import { Banner } from "@/components/artisan/comps";
import {
  ColoredBriefCase,
  HirePageIcon,
} from "@/components/icons/artisan/icons";
import { PaddedSectionStyles } from "@/components/layout/style";
import { Paginator } from "@/components/fme/paginator/Paginator";
import { FormEvent } from "react";
import { ArtisanTabSwitches, Jobs } from "@/components/artisan/data";
import { JobSearchStyle, SortOptionsStyle } from "@/components/fme/mda/styles";
import {
  CancelInputIcon,
  LocationIcon,
  MagnifyingGlassIcon,
} from "@/components/icons/fme/mda";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { BACKEND_URL } from "@/lib/config";
import { Ierror } from "@/app/recovery/page";
import { MdaItemComp } from "@/components/fme/mda/mda";
import { AngleDown, AngleDownStyles } from "@/components/icons/header";
import { JobComp, SelectLocationModal } from "@/components/artisan/Job";
import { ArtisanJobPageStyle, JobGridList } from "../../artisan/style";
import { ArtisanSortItemDropdownList } from "@/components/artisan/Employer/data";
import { SimilarArtisanComp } from "@/components/artisan/Employer";

const HireArtisan = () => {
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
    setQuery(e.target.value);
  };
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    if (query.trim().length >= 1) {
      // filter from the unchanged mda list
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
  interface ISort {
    text: string;
    isSelected: boolean;
    id: string;
    hasBorder?: boolean | undefined;
  }
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortItemDropdownList, setSortItemDropdownList] = useState<ISort[]>([
    { text: "Most Rated", isSelected: false, id: "0" },
    // { text: "Recommended", isSelected: false, id: "1" },
  ]);
  const fetchJobsByLocation = async (state: string) => {
    try {
      // Get the authorization token from cookies
      const token = Cookies.get("token"); // Replace 'authToken' with the actual cookie name where the token is stored

      // Make the request with the authorization header
      const response = await axios.get(
        `${BACKEND_URL}/artisan/all?state=${state}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );

      setData(response.data.artisans);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  const handleLocationFilter = (state: string) => {
    fetchJobsByLocation(state);
    setShowLocationModal(false); // Close the modal after applying the filter
  };
  const handleSelect = async (selectedId: string) => {
    // Map the dropdown options to `days_ago` values
    const daysAgoMap: { [key: string]: boolean } = {
      "0": true, // Last 24 hours
      // "1": 4.4,  // Last 7 days
    };

    const daysAgo = daysAgoMap[selectedId];

    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };

    try {
      const res = await axios.get(
        `${BACKEND_URL}/artisan/all?rating_sort=${daysAgo}`,
        config
      );
      const data = res.data.artisans;

      setData(data);
    } catch (error) {
      console.error("Error fetching filtered jobs by ratings:", error);
    }

    // Update the sort dropdown state to reflect the selected option
    const updatedDropdownList = sortItemDropdownList.map((item) => ({
      ...item,
      isSelected: item.id === selectedId,
    }));
    setSortItemDropdownList(updatedDropdownList);
  };
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [data, setData] = useState<IArtisan[] | null>(null);

  useEffect(() => {
    let token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${BACKEND_URL}/artisan/all`, config)
      .then((res) => {
        const data = res.data.artisans;
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const filteredJobs = data?.filter((job) =>
    job.BusinessName.toLowerCase().includes(query.toLowerCase())
  );


  return (
    <ArtisanJobPageStyle>
      <Banner
        head="Hire Skilled Professionals"
        desc="Find suitable and certified talents that match your needs"
        icon={<HirePageIcon />}
      />
      <PaddedSectionStyles>
        <div className="cont">
          <div className="search m-down">
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
                        applyFilter={handleLocationFilter}
                        closeModal={() => setShowLocationModal(false)}
                      />
                    )}
                  </div>
                  {/* lol */}
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
          <div className="jobs">
            <div className="head">
              <ColoredBriefCase />
              <h2>All Professionals</h2>
            </div>
            <JobGridList>
              {filteredJobs &&
                filteredJobs?.map((ele, index) => (
                  <SimilarArtisanComp key={index} {...ele} />
                ))}
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

export default HireArtisan;
