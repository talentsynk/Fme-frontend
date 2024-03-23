"use client";
import { MDATabSwitches } from "@/components/fme/mda/data";
import {
  SearchAndResultStyle,
  StatListItemStyle,
  StatListStyle,
  StatusStyles,
  TabSwitchStyle,
  TableDropdownStyles,
  TableStyles,
  TopStyles,
  WhiteContainer,
} from "@/components/fme/mda/styles";
import {
  ActiveIcon,
  CancelInputIcon,
  FilterIcon,
  InactiveIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  SortIcon,
  ThreedotsIcon,
  TotalIcon,
  UploadIcon,
} from "@/components/icons/fme/mda";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckboxComp } from "@/components/fme/mda/mda";

// work on UI conversion for this and at the same time do the UI conversion for All-students page

export default function Home() {
  const [showCancel, setShowCancel] = useState(false);
  const [mdaTabSwitches, setMDATabSwitches] = useState(MDATabSwitches);
  const handleTabSwitch = (tabIndex: number) => {
    const newMdaTabSwitches = mdaTabSwitches.map((ele) => {
      return { ...ele, isSelected: tabIndex == ele.tabIndex };
    });
    setMDATabSwitches(newMdaTabSwitches);
  };
  const handleSelect = () => {
    console.log("I was selected");
  };
  return (
    <>
      <TopStyles>
        <div className="text">
          <h1>MDAs</h1>
          <p>View the MDA Statistics at a go on this page </p>
        </div>
        <div className="buttons">
          <button type="button" className="add">
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
              <p>4000</p>
            </div>
            <TotalIcon />
          </StatListItemStyle>
          <StatListItemStyle>
            <div className="stat">
              <span>Active MDAs</span>
              <p>3000</p>
            </div>
            <ActiveIcon />
          </StatListItemStyle>
          <StatListItemStyle>
            <div className="stat">
              <span>Inactive MDAs</span>
              <p>1000</p>
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
              <input
                type="text"
                name="query"
                id=""
                placeholder="Search MDAs"
                onFocus={() => setShowCancel(true)}
                onBlur={() => setShowCancel(false)}
              />
              {showCancel && (
                <div className="abs">
                  <CancelInputIcon />
                </div>
              )}
            </div>
            <div className="filsort">
              <button type="button" className="filter">
                <FilterIcon />
                <span>Filter</span>
              </button>
              <button type="button" className="sort">
                <SortIcon />
                <span>Sort</span>
              </button>
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
                  <p>{ele.text}</p>
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
          <div className="pad">
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
                  <tr>
                    <td className="flex">
                      <CheckboxComp
                        isChecked={false}
                        handleCheckedAction={handleSelect}
                      />
                      <p>MICT</p>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p>200</p>
                    </td>
                    <td className="address">
                      <p>1, Herbet Macauly way, Ijanikiiwewyguegwefffhhasgfafsfhfhfhgsfkhskdhghjh</p>
                    </td>
                    <td>
                      <p>LAGOS STATE</p>
                    </td>
                    <td className="drop">
                      <StatusStyles $isActive={true}>Active</StatusStyles>
                      <TableDropdownStyles>
                        <div className="head">
                          <ThreedotsIcon />
                        </div>
                      </TableDropdownStyles>
                    </td>
                  </tr>
                  <tr>
                    <td className="flex">
                      <CheckboxComp
                        isChecked={true}
                        handleCheckedAction={handleSelect}
                      />
                      <p>MICT</p>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p>200</p>
                    </td>
                    <td className="address">
                      <p>1, Herbet Macauly way, Ijaniki</p>
                    </td>
                    <td>
                      <p>LAGOS STATE</p>
                    </td>
                    <td className="drop">
                      <StatusStyles $isActive={false}>In active</StatusStyles>
                      <TableDropdownStyles>
                        <div className="head">
                          <ThreedotsIcon />
                        </div>
                      </TableDropdownStyles>
                    </td>
                  </tr>
                  <tr>
                    <td className="flex">
                      <CheckboxComp
                        isChecked={true}
                        handleCheckedAction={handleSelect}
                      />
                      <p>MICT</p>
                    </td>
                    <td>
                      <p>1</p>
                    </td>
                    <td>
                      <p>200</p>
                    </td>
                    <td className="address">
                      <p>1, Herbet Macauly way, Ijaniki</p>
                    </td>
                    <td>
                      <p>LAGOS STATE</p>
                    </td>
                    <td className="drop">
                      <StatusStyles $isActive={true}>Active</StatusStyles>
                      <TableDropdownStyles>
                        <div className="head">
                          <ThreedotsIcon />
                        </div>
                      </TableDropdownStyles>
                    </td>
                  </tr>
                </tbody>
              </TableStyles>
            </div>
          </div>
        </SearchAndResultStyle>
      </WhiteContainer>
    </>
  );
}
