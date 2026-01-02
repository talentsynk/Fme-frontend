import Link from "next/link";
import { ILinkFunc } from "./data";
import { LinkCompStyles, LogoutModalStyles, SidebarStyles } from "./style";
import {
  AdminUserIcon,
  FGLogo,
  LogoutIcon,
  LogoutPopIcon,
  XIcon,
} from "@/components/icons/sidebar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FlexAbsoluteModalStyles } from "../mda/styles";
import Cookies from "js-cookie";
import ClickOutsideWrapper from "@/components/auth/wrapper";

interface ISidebar {
  uniquePageLinks: ILinkFunc[];
  splitIndex: number;
}

export const DashboardSidebar: React.FC<ISidebar> = ({
  uniquePageLinks,
  splitIndex,
}) => {
  const [pageLinks, setPageLinks] = useState(uniquePageLinks);
  const role = Cookies.get("userRole");
  const name = usePathname();
  const clickLink = (id: string) => {
    const newLinks = pageLinks.map((ele) => {
      return { ...ele, isSelected: ele.id == id };
    });
    setPageLinks(newLinks);
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

  // for logout
  const [isloggingout, setIsLoggingOut] = useState(false);
  const router = useRouter();

  return (
    <SidebarStyles suppressHydrationWarning={true}>
      <div className="top">
        <div className="lg">
          <FGLogo />
          <p>National Skills Information Center (NASIC)</p>
        </div>
        <div className="links">
          {pageLinks.map(
            (ele, index) =>
              index < splitIndex && (
                <LinkComp
                  key={index}
                  id={ele.id}
                  href={ele.href}
                  icon={ele.icon}
                  name={ele.name}
                  isSelected={ele.isSelected}
                  activeState={ele.activeState}
                  clickLink={() => clickLink(ele.id)}
                />
              )
          )}
        </div>
      </div>
      <div className="btm">
        <div className="btm-links">
          {pageLinks.map(
            (ele, index) =>
              index >= splitIndex && (
                <LinkComp
                  key={index}
                  id={ele.id}
                  href={ele.href}
                  icon={ele.icon}
                  name={ele.name}
                  isSelected={ele.isSelected}
                  activeState={ele.activeState}
                  clickLink={() => clickLink(ele.id)}
                />
              )
          )}
        </div>
        <div className="logout">
          <div className="one">
            <AdminUserIcon />
            <div className="text">
              <p>{role}</p>
              <span>Admin</span>
            </div>
          </div>
          <div className="two" onClick={() => setIsLoggingOut(true)}>
            <LogoutIcon />
          </div>
        </div>
        <div className="org">
          <p>Powered by</p>
          <Image
            src="/images/coderina.svg"
            width={119}
            height={26}
            alt="coderina logo"
          />
        </div>
      </div>
      {isloggingout && (
        <LogoutModal cancelLogout={() => setIsLoggingOut(false)} />
      )}
    </SidebarStyles>
  );
};

interface ILinkComp extends ILinkFunc {
  clickLink: () => void;
}
export const LinkComp: React.FC<ILinkComp> = ({
  href,
  name,
  icon,
  id,
  activeState,
  isSelected,
  clickLink,
}) => {
  const router = useRouter();
  const handleClick = () => {
    clickLink();
    router.push(href);
  };
  return (
    <LinkCompStyles $isSelected={isSelected} onClick={handleClick}>
      <Link href={href}>
        <div className="li">
          {isSelected ? activeState : icon}
          <p>{name}</p>
        </div>
      </Link>
    </LinkCompStyles>
  );
};

interface ILogoutActionsModal {
  cancelLogout: () => void;
  naviHref?: string;
}
export const LogoutModal: React.FC<ILogoutActionsModal> = ({
  cancelLogout,
  naviHref,
}) => {
  const router = useRouter();
  const [isloggingout, setIsLoggingOut] = useState(false);
  const handleLogout = () => {
    setIsLoggingOut(true);
    Cookies.set("userRole", "");
    Cookies.set("token", "");
    if (naviHref) {
      router.push(naviHref);
    } else {
      router.push("/admin");
    }
  };
  return (
    <FlexAbsoluteModalStyles>
      <LogoutModalStyles>
        <ClickOutsideWrapper onClickOutside={cancelLogout}>
        <div className="pop">
          <div className="up">
            <div className="x" onClick={cancelLogout}>
              {" "}
              <XIcon />
            </div>
            <div className="l">
              <LogoutPopIcon />
            </div>
            <h4>Done performing your duties for the day?</h4>
            <p>
              Already tired of today&apos;s work? You deserve some rest. Have a lovely day!
            </p>
          </div>
          <div className="down">
            <button
              type="button"
              onClick={handleLogout}
              disabled={isloggingout}
            >
              {isloggingout ? "Logging out" : "Sign Out"}
            </button>
          </div>
        </div>
        </ClickOutsideWrapper>
      </LogoutModalStyles>
    </FlexAbsoluteModalStyles>
  );
};

export const SessionsModal: React.FC<ILogoutActionsModal> = ({
  cancelLogout,
  naviHref,
}) => {
  const router = useRouter();
  const [isloggingout, setIsLoggingOut] = useState(false);
  const handleLogout = () => {
    setIsLoggingOut(true);
    Cookies.set("userRole", "");
    Cookies.set("token", "");
    if (naviHref) {
      router.push(naviHref);
    } else {
      router.push("/admin");
    }
  };
  return (
    <FlexAbsoluteModalStyles>
      <LogoutModalStyles>
        <div className="pop">
          <div className="up">
            <div className="l">
              <LogoutPopIcon />
            </div>
            <h4>Your Session has expired!!!</h4>
            <p>
              Hello user your session has expired! You need to logout and login
              again to continue working!
            </p>
          </div>
          <div className="down">
            <button
              type="button"
              onClick={handleLogout}
              disabled={isloggingout}
            >
              {isloggingout ? "Logging out" : "Sign Out"}
            </button>
          </div>
        </div>
      </LogoutModalStyles>
    </FlexAbsoluteModalStyles>
  );
};
