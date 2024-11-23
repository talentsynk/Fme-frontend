import Image from "next/image";
import {
  CalendarComponentStyle,
  DashboardHeaderStyle,
  DesktopDropdownLinkStyle,
  LinkItemStyle,
  UserDashboardHeaderStyle,
} from "./style";
import {
  DesktopDropdownLinks,
  IDesktopDropdown,
  IDesktopDropdownFunc,
  UserDesktopDropdownLinks,
} from "./data";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CalendarIcon, FullLogo, XIcon } from "@/components/icons/sidebar";
import { formatDate } from "@/utils/formatDate";
import { LogoutModal } from "../sidebar/sidebar";
import Cookies from "js-cookie";
import { Hamburger } from "@/components/landing/faqs/Svgs";
import {
  MenuIcon,
  SignOutRight,
  WhiteBriefcase,
} from "@/components/icons/artisan/icons";
import { IUserLink } from "@/components/employer/data";
import { motion } from "framer-motion";
import axios from 'axios';
import { ArrowLeft } from "@/components/icons/recovery";
import {
  AngleDown,
  AngleDownStyles,
  SignOutIcon,
} from "@/components/icons/header";
import { PoweredByStyles } from "@/components/layout/style";
import { CoderinaLogo } from "@/app/recovery/style";

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
                    key={index}
                    {...ele}
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

interface IHeader {
  uniquePageLinks: IUserLink[];
}
export const UserDashboardHeader: React.FC<IHeader> = ({ uniquePageLinks }) => {
  const [pageLinks, setPageLinks] = useState(uniquePageLinks);
  const role = Cookies.get("userRole");
  const name = usePathname();
  const clickLink = (id: string) => {
    const newLinks = pageLinks.map((ele) => {
      return { ...ele, isSelected: ele.name == id };
    });
    setPageLinks(newLinks);
  };
  const mobileClickLink = (id: string) => {
    clickLink(id);
    setShowDropdown(false);
  };
  useEffect(() => {
    const selected = pageLinks.find((ele) => ele.isSelected == true);
    // if the user types the route
    // Check if name exists in pageLinks
    const nameExists = pageLinks.some((ele) => ele.href === name);
    if (selected && nameExists) {
      if (name != selected?.href) {
        const newLinks = pageLinks.map((ele) => {
          return { ...ele, isSelected: ele.href == name };
        });
        setPageLinks(newLinks);
      }
    }
  }, [name, pageLinks]);

  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const [links, setLinks] = useState(UserDesktopDropdownLinks);
  const [isloggingout, setIsLoggingOut] = useState(false);

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
  const handleMobileLogout = () => {
    setShowDropdown(false);
    setIsLoggingOut(true);
  };
  interface IData{
    FirstName:string;
    LastName:string;
    Email:string;
    ID?:number;
    PhoneNumber?:string;
  }
const [data,setData]=useState<IData|null>(null)
  useEffect(() => {
    const token = Cookies.get('token'); 
    const role = Cookies.get('userRole'); 

    const headers = {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    };
 
    const fetchData = async () => {
      try {
        if (role === 'EMPLOYER') {
          // API call for EMPLOYER
          const response = await axios.get(
            'https://fme-backend-version-1.onrender.com/employer/get-employer',
            { headers }
          );
       
          setData(response.data.employer)
        } else {
          // API call for ARTISAN
          const response = await axios.get(
            'https://fme-backend-version-1.onrender.com/artisan/me',
            { headers }
          );
         
          setData(response.data.artisan)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []);  

  return (
    <UserDashboardHeaderStyle>
      <div className="logo">
        <FullLogo />
      </div>
      <div className="desktop-links desktop">
        {pageLinks.map((ele, index) => (
          <LinkItem
            key={index}
            {...ele}
            showUnderline={true}
            handleLink={() => clickLink(ele.name)}
          />
        ))}
      </div>
      <div className="desktop-menu desktop" onClick={handleDropdown}>
        <div className="one">
          <div className="circle">
          <p className="font-bold text-[16px] leading-[24px] text-[#101928]">{data?.FirstName.toUpperCase()?.[0]}{data?.LastName.toUpperCase()?.[0]}</p>
          </div>
          <div className="text">
            <h3> {data?.FirstName.toUpperCase()} {data?.LastName.toLocaleUpperCase()}</h3>
            <p>{data?.Email}</p>
          </div>
        </div>
        <AngleDownStyles $isSelected={showDropdown}>
          <AngleDown />
        </AngleDownStyles>
        {showDropdown && (
          <div className="dropdown">
            {links.map((ele, index) => (
              <DesktopDropdownLink
                key={index}
                {...ele}
                handleClick={() => handleClick(ele.id)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="menu mobile" onClick={handleDropdown}>
        {showDropdown ? (
          <XIcon />
        ) : (
          <div className="scale">
            <MenuIcon /> <p>Menu</p>
          </div>
        )}
      </div>
      {showDropdown && (
        <div className="mobile-dropdown mobile">
          <div className="x-one">
            <div className="m-links">
              {pageLinks.map((ele, index) => (
                <LinkItem
                  key={index}
                  {...ele}
                  handleLink={() => mobileClickLink(ele.name)}
                />
              ))}
            </div>
            <div className="post">
              <button type="button">
                <p>Post a job</p>
                <WhiteBriefcase />
              </button>
            </div>
          </div>
          <div className="x-two">
            <div className="avatar">
              <div className="bb">
                <div className="circle">
                  <p>OC</p>
                  <div className="gre"></div>
                </div>
                <div className="text">
                  <h3>{data?.FirstName} {data?.LastName}</h3> 
                  <p>{data?.Email}</p>
                </div>
              </div>
              <div className="" onClick={handleMobileLogout}>
                <SignOutRight />
              </div>
            </div>
            <PoweredByStyles>
              <p>Powered by</p>
              <CoderinaLogo>
                <Image
                  width={152}
                  height={33}
                  alt="coderina logo"
                  src="/images/coderina.svg"
                />
              </CoderinaLogo>
            </PoweredByStyles>
          </div>
        </div>
      )}
      {isloggingout && (
        <LogoutModal naviHref="/auth/login" cancelLogout={() => setIsLoggingOut(false)} />
      )}
    </UserDashboardHeaderStyle>
  );
};

interface IUserFunc extends IUserLink {
  handleLink: () => void;
  showUnderline?: boolean;
}
export const LinkItem: React.FC<IUserFunc> = ({
  name,
  href,
  isSelected,
  handleLink,
  showUnderline,
}) => {
  const router = useRouter();
  const goToLink = () => {
    handleLink();
    router.push(href);
  };
  return (
    <LinkItemStyle onClick={goToLink} $isSelected={isSelected}>
      <p>{name}</p>
      {isSelected && showUnderline && (
        <motion.div className="btl" layoutId="btl"></motion.div>
      )}
    </LinkItemStyle>
  );
};
