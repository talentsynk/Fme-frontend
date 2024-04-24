import Link from "next/link";
import {  ILinkFunc } from "./data";
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

interface ISidebar{
  uniquePageLinks : ILinkFunc[];
  splitIndex : number;
}

export const DashboardSidebar:React.FC<ISidebar> = ({uniquePageLinks, splitIndex}) => {
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
    if (name != selected?.href) {
      const newLinks = pageLinks.map((ele) => {
        return { ...ele, isSelected: ele.href == name };
      });
      setPageLinks(newLinks);
    }
  }, [name,pageLinks]);

  // for logout
  const [isloggingout, setIsLoggingOut] = useState(false);
  const router = useRouter();
  
  return (
    <SidebarStyles suppressHydrationWarning={true}>
      <div className="top">
        <div className="lg">
          <FGLogo />
          <p>National Skills Database (NSD)</p>
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
        <LogoutModal cancelLogout={()=> setIsLoggingOut(false)} />
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
}
export const LogoutModal: React.FC<ILogoutActionsModal> = ({
  cancelLogout,
}) => {
  const router = useRouter();
  const [isloggingout, setIsLoggingOut] = useState(false);
  const handleLogout = () => {
    setIsLoggingOut(true);
    Cookies.set("userRole", "");
    Cookies.set("token", "");
    router.push("/admin");
  };
  return (
    <FlexAbsoluteModalStyles>
      <LogoutModalStyles>
        <div className="pop">
          <div className="up">
            <div className="x" onClick={cancelLogout}>
              {" "}
              <XIcon />
            </div>
            <div className="l">
              <LogoutPopIcon />
            </div>
            <h4>Done performing Admin duties for the day?</h4>
            <p>
              Some other message that may be necessary here we’ll think of
              something. Have a lovely day!
            </p>
          </div>
          <div className="down">
            <button type="button" onClick={handleLogout} disabled={isloggingout}>
              {isloggingout ? "Logging out" : "Sign Out"}
            </button>
          </div>
        </div>
      </LogoutModalStyles>
    </FlexAbsoluteModalStyles>
  );
};
