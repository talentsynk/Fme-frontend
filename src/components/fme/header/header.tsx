import Image from "next/image";
import {
  CalendarComponentStyle,
  DashboardHeaderStyle,
  DesktopDropdownLinkStyle,
} from "./style";
import {
  DesktopDropdownLinks,
  IDesktopDropdown,
  IDesktopDropdownFunc,
} from "./data";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon } from "@/components/icons/sidebar";
import { formatDate } from "@/utils/formatDate";
import { LogoutModal } from "../sidebar/sidebar";
import Cookies from "js-cookie";

export const DashboardHeader = () => {
  const [links, setLinks] = useState(DesktopDropdownLinks);
  const handleClick = (id: string) => {
    const newLinks = links.map((ele) => {
      return { ...ele, isSelected: ele.id == id };
    });
    setLinks(newLinks);
    setShowDropdown(false);
    if (id == "2") {
      setIsLoggingOut(true);
    }
  };
  const [showDropdown, setShowDropdown] = useState(false);
  // for logging out
  const [isloggingout, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const role = Cookies.get("userRole");
  const handleLogout = () => {
    // logout logic
    console.log("I am logging out");
    router.push("/admin");
  };
  return (
    <DashboardHeaderStyle>
      <div className="one">
        <h3>Welcome back Admin,</h3>
        <p>Your current overview for activities</p>
      </div>
      <div className="two">
        <CalendarComponent />
        <div className="pfp">
          <div className="img" onClick={() => setShowDropdown(!showDropdown)}>
            <Image src="/images/user.svg" width={36} height={36} alt="avatar" />
          </div>
          {showDropdown && (
            <div className="dropdown">
              {links.map((ele, index) =>
                ele.id == "1" && role === "FME" ? null : (
                  <DesktopDropdownLink
                    id={ele.id}
                    key={index}
                    link={ele.link}
                    text={ele.text}
                    isSelected={ele.isSelected}
                    icon={ele.icon}
                    activeBg={ele.activeBg}
                    activeState={ele.activeState}
                    activeTextColor={ele.activeTextColor}
                    textColor={ele.textColor}
                    handleClick={() => handleClick(ele.id)}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
      {isloggingout && (
        <LogoutModal cancelLogout={() => setIsLoggingOut(false)} />
      )}
    </DashboardHeaderStyle>
  );
};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const CalendarComponent = () => {
  const [date, setDate] = useState<Value>(new Date());
  // const [endDate, setEndDate] = useState<Value>(new Date());

  // const [showCalendar1, setShowCalendar1] = useState(false);
  // const [showCalendar2, setShowCalendar2] = useState(false);

  // const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);

  // const handleSearch = () => {
  //   if (startDate !== null && endDate !== null) {
  //     //@ts-ignore
  //     const diff = endDate - startDate;
  //     if ( diff > 0){
  //       // do the search or whatever
  //       console.log(diff);
  //       setShowCalendarDropdown(false);
  //     }
  //   }
  // };
  return (
    <CalendarComponentStyle>
      <div className="head">
        <CalendarIcon />
        <div className="date">
          <p>{date && formatDate(date.toLocaleString())}</p>
        </div>
      </div>
    </CalendarComponentStyle>
  );
};
{
  /* {showCalendarDropdown && (
  <div className="calendar-dd">
    <div className="pick-date">
      <span className="st">Start Date</span>
      <div
        className="select"
        onClick={() => setShowCalendar1(!showCalendar1)}
      >
        <p>{startDate && formatDate(startDate.toLocaleString())}</p>
        <CalendarIcon />
      </div>
    </div>
    <div className="pick-date">
      <span className="st">End Date</span>
      <div
        className="select"
        onClick={() => setShowCalendar2(!showCalendar2)}
      >
        <p>{endDate && formatDate(endDate.toLocaleString())}</p>
        <CalendarIcon />
      </div>
    </div>
    <div className="btn">
      <button type="button" onClick={handleSearch}>
        Continue
      </button>
    </div>
  </div>
)}
{showCalendar1 && (
  <div className="calendar">
    <Calendar
      onChange={setStartDate}
      value={startDate}
      onClickDay={() => setShowCalendar1(false)}
    />
  </div>
)}
{showCalendar2 && (
  <div className="calendar">
    <Calendar
      onChange={setEndDate}
      value={endDate}
      //@ts-ignore
      minDate={new Date(startDate)}
      onClickDay={() => setShowCalendar2(false)}
    />
  </div>
)} */
}

export const DesktopDropdownLink: React.FC<IDesktopDropdownFunc> = ({
  link,
  text,
  isSelected,
  icon,
  activeBg,
  activeState,
  textColor,
  activeTextColor,
  handleClick,
}) => {
  const router = useRouter();
  const handleSelectLink = () => {
    handleClick();
    if (text !== "Sign Out") {
      router.push(link);
    }
  };
  return (
    <DesktopDropdownLinkStyle
      onClick={handleSelectLink}
      $isSelected={isSelected}
      activebg={activeBg}
      activetextcolor={activeTextColor}
      textcolor={textColor}
    >
      <>{isSelected ? activeState : icon}</>
      <p>{text}</p>
    </DesktopDropdownLinkStyle>
  );
};
