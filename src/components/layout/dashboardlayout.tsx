"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { DashboardHeader } from "../fme/header/header";
import { DashboardSidebar } from "../fme/sidebar/sidebar";
import { GenericDashboardLayoutStyle } from "./style";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FailureModal } from "../fme/mda/modals";
import { FlexAbsoluteModalStyles } from "../fme/mda/styles";
import Cookies from "js-cookie";
import { authSelector, setSessionExpiration } from "@/redux/auth/authSlice";
import { FMEPageLinks } from "../fme/sidebar/data";
import { MDAPageLinks} from "../mda/data";
import { STCPageLinks } from "../stc/data";

export const GenericDasboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const {isSessionExpired} = useAppSelector(authSelector);

  const router = useRouter();
  const role = Cookies.get("userRole");
  const token = Cookies.get("token");
  useEffect(() => {
    // console.log(role,token);
    if (role === undefined && token === undefined) { //when the session ends
      dispatch(setSessionExpiration(true));
    }else if (role === "" || token == ""){
      //when the user is logged out
      router.push("/admin");
    }
  }, [role,token,router,dispatch]);
  

  const handleLogout = () => {
    Cookies.set("userRole","");
    Cookies.set("token","");
    router.push("/admin");
  };
  return (
      <GenericDashboardLayoutStyle>
        <div className="header">
          <DashboardHeader />
        </div>
        <div className="sidebar">
          {role === "FME" && <DashboardSidebar
            uniquePageLinks={FMEPageLinks}
            splitIndex={5}
          />}
          {role === "MDA" &&<DashboardSidebar
            uniquePageLinks={MDAPageLinks}
            splitIndex={4}
          />}
          {role === "STC" &&<DashboardSidebar
            uniquePageLinks={STCPageLinks}
            splitIndex={3}
          />}
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
