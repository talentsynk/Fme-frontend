"use client";
import {
  FilterBtns,
  MDATabSwitches,
  SortItemDropdownList,
} from "@/components/fme/mda/data";
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
import {
  ActiveIcon,
  CancelInputIcon,
  InactiveIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TotalIcon,
  UploadIcon,
} from "@/components/icons/fme/mda";
import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FilterBtnComp, MdaItemComp, TableRow } from "@/components/fme/mda/mda";
import { MdaDetailModal, NewMdaModal } from "@/components/fme/mda/modals";
import { Ierror } from "@/app/recovery/page";
import { sortMDADataAlphabetically } from "@/utils/sortData";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  fmeSelector,
  setFakeNewMdaId,
  setSelectedMdaId,
  setUnchangedMdaList,
} from "@/redux/fme/fmeSlice";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import Cookies from "js-cookie";
import { IMDACompData } from "@/types/Mda";

export default function Home() {
  const [showCancel, setShowCancel] = useState(false);
  const [mdaTabSwitches, setMDATabSwitches] = useState(MDATabSwitches);
  const [total, setTotal] = useState({
    totalMda : 0,
    totalActive : 0,
    totalInactive : 0
  });
  // get data from redux
  // stores the unchanged mda initial data, this is useful to prevent multiple API calls when no data is changing
  const { unchangedMdaList, fakeNewMdaId } = useAppSelector(fmeSelector);
  // use app dispatch
  const dispatch = useAppDispatch();
  // mda data
  const [mdaList, setMdaList] = useState<IMDACompData[] | null>(null);
  // const [unchangedMdaList, setUnchangedMdaList] = useState<IMDAData[] | null>(
  //   null
  // );
  // for dynamic mda data
  const [mdaListDuplicate, setMdaListDuplicate] = useState<IMDACompData[] | null>(
    null
  );

  const handleTabSwitch = (tabIndex: number) => {
    const newMdaTabSwitches = mdaTabSwitches.map((ele) => {
      return { ...ele, isSelected: tabIndex == ele.tabIndex };
    });
    setMDATabSwitches(newMdaTabSwitches);
    // show all mda
    const sortStatus = sortItemDropdownList.find(
      (ele) => ele.isSelected == true
    )?.id;
    if (tabIndex == 0) {
      if (sortStatus && mdaList !== null) {
        const sortedMDAData = sortMDADataAlphabetically(
          mdaList,
          sortStatus == "-1"
        );
        setMdaListDuplicate(sortedMDAData);
      } else {
        setMdaListDuplicate(mdaList);
      }
    } else if (tabIndex == 1) {
      const newMdaList = mdaList?.filter((ele) => ele.is_active);
      if (newMdaList) {
        if (sortStatus) {
          const sortedMDAData = sortMDADataAlphabetically(
            newMdaList,
            sortStatus == "-1"
          );
          setMdaListDuplicate(sortedMDAData);
        } else {
          setMdaListDuplicate(newMdaList);
        }
      }
    } else if (tabIndex == 2) {
      const newMdaList = mdaList?.filter((ele) => ele.is_active == false);
      if (newMdaList) {
        if (sortStatus) {
          const sortedMDAData = sortMDADataAlphabetically(
            newMdaList,
            sortStatus == "-1"
          );
          setMdaListDuplicate(sortedMDAData);
        } else {
          setMdaListDuplicate(newMdaList);
        }
      }
    }
  };

  useEffect(() => {
    
    let token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
    axios
    .get(`${BACKEND_URL}/mda/get-all-mdas`, config)
    .then((res) => {
      const data = res.data.mdas;
      setMdaList(data);
      setMdaListDuplicate(data);
      // store data in redux so it can reused across components for easy lookup
      dispatch(setUnchangedMdaList(data));
      dispatch(setSelectedMdaId(null));
      const maxMdaId = data.reduce((max:number, obj:IMDACompData) => Math.max(max, obj.ID), 0);
      dispatch(setFakeNewMdaId(maxMdaId));
      })
      .catch((error) => console.log(error));
    
    axios
    .get(`${BACKEND_URL}/mda/total-mda`, config)
    .then((res) => {
      const {total_active_mda, total_mda, total_inactive_mda} = res.data;
      setTotal({
        totalMda : total_mda,
        totalActive : total_active_mda,
        totalInactive : total_inactive_mda
      });
      })
      .catch((error) => console.log(error));
    

  }, [dispatch, fakeNewMdaId]);

  // do stuff here
  useEffect(() => {
    setMdaList(unchangedMdaList);
    setMdaListDuplicate(unchangedMdaList);
    dispatch(setSelectedMdaId(null));
    setMDATabSwitches(MDATabSwitches);
    let token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
    // handle suspend and activate here
    // might need to call api again
    // axios
    // .get(`${BACKEND_URL}/mda/total-mda`, config)
    // .then((res) => {
    //   const {total_active_mda, total_mda, total_inactive_mda} = res.data;
    //   setTotal({
    //     totalMda : total_mda,
    //     totalActive : total_active_mda,
    //     totalInactive : total_inactive_mda
    //   });
    //   })
    //   .catch((error) => console.log(error));
  }, [unchangedMdaList]);

  const [showNewMdaFormModal, setShowNewMdaFormModal] = useState(false);

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
    // return mdaList and listDuplicate to default - might involve calling the api
    const sortStatus = sortItemDropdownList.find(
      (ele) => ele.isSelected == true
    )?.id;
    if (sortStatus && unchangedMdaList !== null) {
      const sortedMDAData = sortMDADataAlphabetically(
        unchangedMdaList,
        sortStatus == "-1"
      );
      setMdaListDuplicate(sortedMDAData);
      setMdaList(unchangedMdaList);
    } else {
      setMdaListDuplicate(unchangedMdaList);
      setMdaList(unchangedMdaList);
    }
    setShowCancel(false);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    if (query.trim().length >= 1) {
      // filter from the unchanged mda list
      const newMdaList = unchangedMdaList?.filter((ele) =>
        ele.RegisterName.toLowerCase().includes(query.toLowerCase())
      );

      if (newMdaList && newMdaList.length > 0) {
        // set sort filter to default;
        const sortStatus = sortItemDropdownList.find(
          (ele) => ele.isSelected == true
        )?.id;
        if (sortStatus) {
          const sortedMDAData = sortMDADataAlphabetically(
            newMdaList,
            sortStatus == "-1"
          );
          setMdaListDuplicate(sortedMDAData);
          setMdaList(newMdaList);
        } else {
          setMdaListDuplicate(newMdaList);
          setMdaList(newMdaList);
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
      const newMdaList = sortItemDropdownList.map((ele) => {
        return { ...ele, isSelected: ele.id === id };
      });
      if (id == "1" && mdaListDuplicate !== null) {
        const sortedMDAData = sortMDADataAlphabetically(mdaListDuplicate);
        setMdaListDuplicate(sortedMDAData);
      } else if (id == "-1" && mdaListDuplicate !== null) {
        const sortedMDAData = sortMDADataAlphabetically(mdaListDuplicate, true);
        setMdaListDuplicate(sortedMDAData);
      } else if (id == "0") {
        setMdaListDuplicate(mdaList);
        setFilterBtns(FilterBtns);
      }
      setSortItemDropdownList(newMdaList);
      setShowSortDropdown(false);
    }
  };

  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  return (
    <>
      <TopStyles>
        <div className="text">
          <h1>MDAs</h1>
          <p>View the MDA Statistics at a go on this page </p>
        </div>
        <div className="buttons">
          <button
            type="button"
            className="add"
            onClick={() => setShowNewMdaFormModal(true)}
          >
            <PlusIcon />
            <span>Add New Mda</span>
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
              <span>Total No of MDAs</span>
              <p>{total.totalMda}</p>
            </div>
            <TotalIcon />
          </StatListItemStyle>
          <StatListItemStyle>
            <div className="stat">
              <span>Active MDAs</span>
              <p>{total.totalActive}</p>
            </div>
            <ActiveIcon />
          </StatListItemStyle>
          <StatListItemStyle>
            <div className="stat">
              <span>Inactive MDAs</span>
              <p>{total.totalInactive}</p>
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
                  placeholder="Search MDAs"
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
                  handleFilterFunc={() =>{}}
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
              {mdaTabSwitches.map((ele, index) => (
                <TabSwitchStyle
                  key={index}
                  $tabIndex={ele.tabIndex}
                  $isSelected={ele.isSelected}
                  onClick={() => handleTabSwitch(ele.tabIndex)}
                >
                  <div className="no">
                    <p>{ele.text}</p>
                    {ele.isSelected && mdaListDuplicate && (
                      <div className="num">
                        <span>{mdaListDuplicate?.length}</span>
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
                    <th>NAME OF MDA</th>
                    <th>TOTAL STCs</th>
                    <th>TOTAL STUDENTS</th>
                    <th>ADDRESS</th>
                    <th>STATE OF MDA</th>
                    <th className="faint">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {mdaListDuplicate &&
                    mdaListDuplicate.map((ele, index) => (
                      <TableRow
                        key={index}
                        {...ele}
                      />
                    ))}
                </tbody>
              </TableStyles>
            </div>
          </div>
          {/* when a particular mda is clicked */}
        </SearchAndResultStyle>
      </WhiteContainer>
      {showNewMdaFormModal && (
        <NewMdaModal cancelModal={() => setShowNewMdaFormModal(false)} />
      )}
    </>
  );
}
