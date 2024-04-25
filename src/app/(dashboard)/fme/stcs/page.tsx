"use client";

import { Ierror } from "@/app/recovery/page";
import { FilterBtns, SortItemDropdownList } from "@/components/fme/mda/data";
import { FilterBtnComp, MdaItemComp } from "@/components/fme/mda/mda";
import {
  SearchAndResultStyle,
  SortOptionsStyle,
  StatListItemStyle,
  StatListStyle,
  TabSwitchStyle,
  TableStyles,
  TopStyles,
  WhiteContainer,
} from "@/components/fme/mda/styles";
import { ISTCData, STCData, STCTabSwitches } from "@/components/fme/stc/data";
import { NewStcModal } from "@/components/fme/stc/modal";
import { STCTableRow } from "@/components/fme/stc/stc";
import {
  ActiveIcon,
  CancelInputIcon,
  FilterIcon,
  InactiveIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  SortIcon,
  TotalIcon,
  UploadIcon,
} from "@/components/icons/fme/mda";
import {
  fmeSelector,
  setFakeNewStcId,
  setSelectedStcId,
  setUnchangedStcList,
} from "@/redux/fme/fmeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { ISTCCompData } from "@/types/Stc";
import { sortSTCDataAlphabetically } from "@/utils/sortData";
import { motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TRSkeleton } from "@/components/fme/skeleton/TrSkeleton";

// the first page on the fme dashboard

export default function Home() {
  const [showCancel, setShowCancel] = useState(false);
  const [stcTabSwitches, setStcTabSwitches] = useState(STCTabSwitches);
  const [total, setTotal] = useState({
    totalStc: 0,
    totalActive: 0,
    totalInactive: 0,
  });
  // stc data
  const [stcList, setStcList] = useState<ISTCCompData[] | null>(null);
  // stores the unchanged stc initial data, this is useful to prevent multiple API calls when no data is changing
  const { unchangedStcList, fakeNewStcId } = useAppSelector(fmeSelector);
  // for dynamic stc data
  const [stcListDuplicate, setStcListDuplicate] = useState<
    ISTCCompData[] | null
  >(null);

  const handleTabSwitch = (tabIndex: number) => {
    const newStcTabSwitches = stcTabSwitches.map((ele) => {
      return { ...ele, isSelected: tabIndex == ele.tabIndex };
    });
    setStcTabSwitches(newStcTabSwitches);

    // show all stc
    const sortStatus = sortItemDropdownList.find(
      (ele) => ele.isSelected == true
    )?.id;
    if (tabIndex == 0) {
      if (sortStatus && stcList !== null) {
        const sortedSTCData = sortSTCDataAlphabetically(
          stcList,
          sortStatus == "-1"
        );
        setStcListDuplicate(sortedSTCData);
      } else {
        setStcListDuplicate(stcList);
      }
    } else if (tabIndex == 1) {
      const newStcList = stcList?.filter((ele) => ele.is_active);
      if (newStcList) {
        if (sortStatus) {
          const sortedSTCData = sortSTCDataAlphabetically(
            newStcList,
            sortStatus == "-1"
          );
          setStcListDuplicate(sortedSTCData);
        } else {
          setStcListDuplicate(newStcList);
        }
      }
    } else if (tabIndex == 2) {
      const newStcList = stcList?.filter((ele) => ele.is_active == false);
      if (newStcList) {
        if (sortStatus) {
          const sortedSTCData = sortSTCDataAlphabetically(
            newStcList,
            sortStatus == "-1"
          );
          setStcListDuplicate(sortedSTCData);
        } else {
          setStcListDuplicate(newStcList);
        }
      }
    }
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    let token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${BACKEND_URL}/stc/get-all-stc`, config) //change endpoint to stc
      .then((res) => {
        const data = res.data.stcs; //change this to stc
        setStcList(data);
        setStcListDuplicate(data);
        // store data in redux so it can reused across components for easy lookup
        dispatch(setUnchangedStcList(data));
        dispatch(setSelectedStcId(null));

        const maxStcId = data.reduce(
          (max: number, obj: ISTCCompData) => Math.max(max, obj.Id),
          0
        );
        dispatch(setFakeNewStcId(maxStcId));
      })
      .catch((error) => console.log(error));

    axios
      .get(`${BACKEND_URL}/stc/get-total-count`, config) // change to stc endpoint
      .then((res) => {
        const { total_active_stc, total_stc, total_inactive_stc } = res.data;
        setTotal({
          totalStc: total_stc,
          totalActive: total_active_stc,
          totalInactive: total_inactive_stc,
        });
      })
      .catch((error) => console.log(error));
  }, [dispatch, fakeNewStcId]);

  useEffect(() => {
    setStcList(unchangedStcList);
    setStcListDuplicate(unchangedStcList);
    setStcTabSwitches(STCTabSwitches);
    dispatch(setSelectedStcId(null));
    let token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${BACKEND_URL}/stc/get-total-count`, config)
      .then((res) => {
        const { total_active_stc, total_stc, total_inactive_stc } = res.data;
        setTotal({
          totalStc: total_stc,
          totalActive: total_active_stc,
          totalInactive: total_inactive_stc,
        });
      })
      .catch((error) => console.log(error));
  }, [unchangedStcList]);

  const [showNewStcFormModal, setShowNewStcFormModal] = useState(false);

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

  const CancelQuerySearch = () => {
    setQuery("");
    setQueryError({ active: false, text: "" });
    // return stcList and listDuplicate to default - might involve calling the api
    const sortStatus = sortItemDropdownList.find(
      (ele) => ele.isSelected == true
    )?.id;
    if (sortStatus && unchangedStcList !== null) {
      const sortedSTCData = sortSTCDataAlphabetically(
        unchangedStcList,
        sortStatus == "-1"
      );
      setStcListDuplicate(sortedSTCData);
      setStcList(unchangedStcList);
    } else {
      setStcListDuplicate(unchangedStcList);
      setStcList(unchangedStcList);
    }
    setShowCancel(false);
  };
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    if (query.trim().length >= 1) {
      // filter from the unchanged stc list
      const newStcList = unchangedStcList?.filter((ele) =>
        ele.Name.toLowerCase().includes(query.toLowerCase())
      );
      if (newStcList && newStcList.length > 0) {
        // set sort filter to default;
        const sortStatus = sortItemDropdownList.find(
          (ele) => ele.isSelected == true
        )?.id;
        if (sortStatus) {
          const sortedSTCData = sortSTCDataAlphabetically(
            newStcList,
            sortStatus == "-1"
          );
          setStcListDuplicate(sortedSTCData);
          setStcList(newStcList);
        } else {
          setStcListDuplicate(newStcList);
          setStcList(newStcList);
        }
      } else {
        setQueryError({
          active: true,
          text: "Name not found! Please check your spelling",
        });
      }
    }
  };
  // filter and sort
  const [filterBtns, setFilterBtns] = useState(FilterBtns);
  const handleClickFilterBtns = (text: string) => {
    const newFilterBtns = filterBtns.map((ele) => {
      return { ...ele, isSelected: ele.text == text };
    });
    if (text == "Sort") {
      setShowFilterDropdown(!showFilterDropdown);
      setShowSortDropdown(!showSortDropdown);
    }
    setFilterBtns(newFilterBtns);
  };

  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortItemDropdownList, setSortItemDropdownList] =
    useState(SortItemDropdownList);
  const handleSelectSortDropdownItem = (id: string | undefined) => {
    if (id) {
      const newStcList = sortItemDropdownList.map((ele) => {
        return { ...ele, isSelected: ele.id === id };
      });
      if (id == "1" && stcListDuplicate !== null) {
        const sortedSTCData = sortSTCDataAlphabetically(stcListDuplicate);
        setStcListDuplicate(sortedSTCData);
      } else if (id == "-1" && stcListDuplicate !== null) {
        const sortedSTCData = sortSTCDataAlphabetically(stcListDuplicate, true);
        setStcListDuplicate(sortedSTCData);
      } else if (id == "0") {
        setStcListDuplicate(stcList);
        setFilterBtns(FilterBtns);
      }
      setSortItemDropdownList(newStcList);
      setShowSortDropdown(false);
    }
  };

  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  return (
    <>
      <TopStyles>
        <div className="text">
          <h1>STCs</h1>
          <p>View the STCs Statistics at a go on this page</p>
        </div>
        <div className="buttons">
          <button
            type="button"
            className="add"
            onClick={() => setShowNewStcFormModal(true)}
          >
            <PlusIcon />
            <span>Add New STC</span>
          </button>
          <button type="button" className="import">
            <UploadIcon />
            <span>Import CSV</span>
          </button>
        </div>
      </TopStyles>
      <WhiteContainer>
        <StatListStyle>
          <StatListItemStyle>
            <div className="stat">
              <span>Total No of STCs</span>
              <p>{total.totalStc || <Skeleton />}</p>
            </div>
            <TotalIcon />
          </StatListItemStyle>
          <StatListItemStyle>
            <div className="stat">
              <span>Active STCs</span>
              <p>{total.totalActive || <Skeleton />}</p>
            </div>
            <ActiveIcon />
          </StatListItemStyle>
          <StatListItemStyle>
            <div className="stat">
              <span>Inactive STCs</span>
              <p>{total.totalInactive || <Skeleton />}</p>
            </div>
            <InactiveIcon />
          </StatListItemStyle>
        </StatListStyle>
        <SearchAndResultStyle>
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
                  placeholder="Search STCs"
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
              <p className={`msg ${queryError.active ? "error" : "correct"}`}>
                {queryError.text}
              </p>
            </div>
            <div className="filsort">
              {/* filterBtns includes both Sort & Filter */}
              {filterBtns.map((ele, index) => (
                <FilterBtnComp
                  key={index}
                  icon={ele.icon}
                  activeIcon={ele.activeIcon}
                  text={ele.text}
                  isSelected={ele.isSelected}
                  handleFilterFunc={() => {}}
                  handleClick={() => handleClickFilterBtns(ele.text)}
                />
              ))}
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
                        handleSelect={() =>
                          handleSelectSortDropdownItem(ele.id)
                        }
                      />
                    ))}
                  </div>
                </SortOptionsStyle>
              )}
            </div>
          </div>
          <div className="pad">
            <div className="options">
              {stcTabSwitches.map((ele, index) => (
                <TabSwitchStyle
                  key={index}
                  $tabIndex={ele.tabIndex}
                  $isSelected={ele.isSelected}
                  onClick={() => handleTabSwitch(ele.tabIndex)}
                >
                  <div className="no">
                    <p>{ele.text}</p>
                    {ele.isSelected && stcListDuplicate && (
                      <div className="num">
                        <span>{stcListDuplicate?.length}</span>
                      </div>
                    )}
                  </div>
                  {ele.isSelected && (
                    <motion.div
                      className="underline"
                      layoutId="underline"
                    ></motion.div>
                  )}
                </TabSwitchStyle>
              ))}
            </div>
          </div>
          <div className="pad scroll">
            <div className="result">
              <TableStyles>
                <thead>
                  <tr>
                    <th>NAME OF STC</th>
                    <th>COURSES</th>
                    <th>TOTAL STUDENTS</th>
                    <th>ADDRESS</th>
                    <th>STATE OF STC</th>
                    <th className="faint">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {stcListDuplicate &&
                    stcListDuplicate.map((ele, index) => (
                      <STCTableRow key={index} {...ele} />
                    ))}
                  {stcListDuplicate === null &&
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ele, index) => (
                      <TRSkeleton key={index} />
                    ))}
                </tbody>
              </TableStyles>
            </div>
          </div>
          {/* when a particular mda is clicked */}
        </SearchAndResultStyle>
      </WhiteContainer>
      {showNewStcFormModal && (
        <NewStcModal cancelModal={() => setShowNewStcFormModal(false)} />
      )}
    </>
  );
}
