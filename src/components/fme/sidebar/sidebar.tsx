import Link from "next/link";
import { ILinkFunc, PageLinks } from "./data";
import { LinkCompStyles, SidebarStyles } from "./style";
import { AdminUserIcon, FGLogo, LogoutIcon } from "@/components/icons/sidebar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const DashboardSidebar = () => {
  const [pageLinks, setPageLinks] = useState(PageLinks);
  const name = usePathname();
  const clickLink = (id: string) => {
    const newLinks = pageLinks.map((ele) => {
      return { ...ele, isSelected: ele.id == id };
    });
    setPageLinks(newLinks);
  };
  useEffect(()=>{
    const selected = pageLinks.find(ele => ele.isSelected == true);
    // if the user types the route
    if(name != selected?.href){
      const newLinks = pageLinks.map((ele)=>{
        return {...ele,isSelected : ele.href == name}
      });
      setPageLinks(newLinks);
    };
  },[name])
  return (
    <SidebarStyles>
      <div className="top">
        <div className="lg">
            <FGLogo />
            <p>National Skills Database (NSD)</p>
        </div>
        <div className="links">
          {pageLinks.map(
            (ele, index) =>
              index < 5 && (
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
              index >= 5 && (
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
                    <p>Administration</p>
                    <span>Admin</span>
                </div>
            </div>
            <div className="two">
                <LogoutIcon />
            </div>
        </div>
        <div className="org">
            <p>Powered by</p>
            <Image src="/images/coderina.svg" width={119} height={26} alt="coderina logo" />
        </div>
      </div>
    </SidebarStyles>
  );
};

interface ILinkComp extends ILinkFunc{
  clickLink : ()=> void;
}
export const LinkComp: React.FC<ILinkComp> = ({
  href,
  name,
  icon,
  id,
  activeState,
  isSelected,
  clickLink
}) => {
  const router = useRouter();
  const handleClick =()=>{
    clickLink();
    router.push(href)
  }
  return (
    <LinkCompStyles $isSelected={isSelected} onClick={handleClick}>
      <Link href={href} className="li">
        <>{isSelected ? activeState : icon}</>
        <p>{name}</p>
      </Link>
    </LinkCompStyles>
  );
};
