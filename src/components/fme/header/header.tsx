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
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarIcon } from "@/components/icons/sidebar";
import { AngleDown, AngleDownStyles } from "@/components/icons/header";
import { formatDate } from "@/utils/formatDate";

export const DashboardHeader = () => {
  const [links, setLinks] = useState(DesktopDropdownLinks);
  const handleClick = (id: string) => {
    const newLinks = links.map((ele) => {
      return { ...ele, isSelected: ele.id == id };
    });
    setLinks(newLinks);
  };
  const [showDropdown, setShowDropdown] = useState(false);
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
            <Image src="/images/user.svg" width={48} height={48} alt="avatar" />
          </div>
          {showDropdown && (
            <div className="dropdown">
              {links.map((ele, index) => (
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
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardHeaderStyle>
  );
};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const CalendarComponent = () => {
  const [startDate, setStartDate] = useState<Value>(new Date());
  const [endDate, setEndDate] = useState<Value>(new Date());

  const [showCalendar1, setShowCalendar1] = useState(false);
  const [showCalendar2, setShowCalendar2] = useState(false);

  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);

  const handleSearch = () => {
    if (startDate !== null && endDate !== null) {
      //@ts-ignore
      const diff = endDate - startDate;
      if ( diff > 0){
        // do the search or whatever
        console.log(diff);
        setShowCalendarDropdown(false);
      }
    }
  };
  return (
    <CalendarComponentStyle>
      <div
        className="head"
        onClick={() => setShowCalendarDropdown(!showCalendarDropdown)}
      >
        <CalendarIcon />
        <div className="date">
          <p>{startDate && formatDate(startDate.toLocaleString())}</p>
          <p>-</p>
          <p>{endDate && formatDate(endDate.toLocaleString())}</p>
        </div>
        <AngleDownStyles $isSelected={showCalendarDropdown}>
        <AngleDown />
        </AngleDownStyles>
      </div>
      {showCalendarDropdown && (
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
      )}
    </CalendarComponentStyle>
  );
};

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
    router.push(link);
  };
  return (
    <DesktopDropdownLinkStyle
      onClick={handleClick}
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
