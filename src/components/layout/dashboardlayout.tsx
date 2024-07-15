"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { DashboardHeader, UserDashboardHeader } from "../fme/header/header";
import { DashboardSidebar, SessionsModal } from "../fme/sidebar/sidebar";
import {
  GenericDashboardLayoutStyle,
  PoweredByStyles,
  UserDashboardLayoutStyles,
} from "./style";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FailureModal } from "../fme/mda/modals";
import { FlexAbsoluteModalStyles } from "../fme/mda/styles";
import Cookies from "js-cookie";
import { authSelector, setSessionExpiration } from "@/redux/auth/authSlice";
import { FMEPageLinks, ILinkFunc } from "../fme/sidebar/data";
import { MDAPageLinks } from "../mda/data";
import { STCPageLinks } from "../stc/data";
import { CoderinaLogo } from "@/app/recovery/style";
import Image from "next/image";
import {
  ArtisanPageLinks,
  EmployerPageLinks,
  IUserLink,
} from "../employer/data";

export const GenericDasboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const { isSessionExpired } = useAppSelector(authSelector);
  const [fmePageLinks, setFmePageLinks] = useState<ILinkFunc[] | null>(null);
  const [mdaPageLinks, setMdaPageLinks] = useState<ILinkFunc[] | null>(null);
  const [stcPageLinks, setStcPageLinks] = useState<ILinkFunc[] | null>(null);
  const router = useRouter();
  const role = Cookies.get("userRole");
  const token = Cookies.get("token");
  useEffect(() => {
    // console.log(role,token);
    // update the permissions to this dashboard
    if (role === undefined && token === undefined) {
      //when the session ends
      dispatch(setSessionExpiration(true));
    } else if (role === "" || token == "") {
      //when the user is logged out
      router.push("/admin");
    }
  }, [role, token, router, dispatch]);

  useEffect(() => {
    setFmePageLinks(FMEPageLinks);
    setMdaPageLinks(MDAPageLinks);
    setStcPageLinks(STCPageLinks);
  }, []);
  const handleLogout = () => {
    Cookies.set("userRole", "");
    Cookies.set("token", "");
    router.push("/admin");
  };
  return (
    <GenericDashboardLayoutStyle>
      <div className="header">
        <DashboardHeader />
      </div>
      <div className="sidebar">
        {role === "FME" && fmePageLinks !== null && (
          <DashboardSidebar uniquePageLinks={fmePageLinks} splitIndex={5} />
        )}
        {role === "MDA" && mdaPageLinks !== null && (
          <DashboardSidebar uniquePageLinks={mdaPageLinks} splitIndex={4} />
        )}
        {role === "STC" && stcPageLinks !== null && (
          <DashboardSidebar uniquePageLinks={stcPageLinks} splitIndex={3} />
        )}
      </div>
      <div className="ctrl">
        <div className="main">{children}</div>
      </div>
      {isSessionExpired && (
        <FlexAbsoluteModalStyles>
          <FailureModal
            head="Your Session has expired!"
            msg="Dear User, your login session has expired. For security reasons, kindly logout and login to continue!"
            hasCancel={false}
            navigationText="Logout"
            cancelModal={() => []}
            navigationFunction={handleLogout}
          />
        </FlexAbsoluteModalStyles>
      )}
    </GenericDashboardLayoutStyle>
  );
};

export const UserDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [artisanPageLinks, setArtisanPageLinks] = useState<IUserLink[] | null>(
    null
  );
  const [employerPageLinks, setEmployerPageLinks] = useState<
    IUserLink[] | null
  >(null);
  const router = useRouter();
  const role = Cookies.get("userRole");
  const token = Cookies.get("token");
  const dispatch = useAppDispatch();
  const { isSessionExpired } = useAppSelector(authSelector);
  useEffect(() => {
    // console.log(role,token);
    // update the permissions to this dashboard
    if (role === undefined && token === undefined) {
      //when the session ends
      dispatch(setSessionExpiration(true)); // for sessions
    } else if (role === "" || token == "") {
      //when the user is logged out
      router.push("/auth/login");
    }
  }, [role, token, router, dispatch]);

  useEffect(() => {
    setArtisanPageLinks(ArtisanPageLinks);
    setEmployerPageLinks(EmployerPageLinks);
  }, []);
  return (
    <UserDashboardLayoutStyles>
      <div className="header">
        {role === "ARTISAN" && artisanPageLinks !== null && (
          <UserDashboardHeader uniquePageLinks={artisanPageLinks} />
        )}
        {role === "EMPLOYER" && employerPageLinks !== null && (
          <UserDashboardHeader uniquePageLinks={employerPageLinks} />
        )}
      </div>
      <div className="ctl">
        <div className="main">{children}</div>
      </div>
      <footer className="footer">
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
      </footer>
      {isSessionExpired && (
        <SessionsModal
          naviHref="/auth/login"
          cancelLogout={() => router.push("/auth/login")}
        />
      )}
    </UserDashboardLayoutStyles>
  );
};

// prevent others from accessing
export const AccessRestrictionWrapper = ({
  children,
  userRole,
  redirectUrl,
}: {
  children: React.ReactNode;
  userRole: "STC" | "MDA" | "FME" | "ARTISAN" | "EMPLOYER";
  redirectUrl: string;
}) => {
  // prevent others from accessing
  const router = useRouter();
  useEffect(() => {
    const role = Cookies.get("userRole");
    if (role !== userRole) {
      router.push(redirectUrl);
      Cookies.set("userRole", "");
      Cookies.set("token", "");
    }
  }, []);
  return <>{children}</>;
};
