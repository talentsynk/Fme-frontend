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
            <Image src="/images/user.png" width={48} height={48} alt="avatar" />
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

export const CalendarComponent = () => {
  return (
    <CalendarComponentStyle>
      <p>Calendar Component</p>
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
