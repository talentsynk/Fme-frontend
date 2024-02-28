"use client";
import { DashboardHeader } from "../fme/header/header";
import { DashboardSidebar } from "../fme/sidebar/sidebar";
import { GenericDashboardLayoutStyle } from "./style";

export const GenericDasboardLayout = ({children}:{children: React.ReactNode}) => {
    return ( 
        <body>
            <GenericDashboardLayoutStyle>
            <div className="header"><DashboardHeader /></div>
            <div className="sidebar"><DashboardSidebar/></div>
            <div className="ctrl">
                <div className="main">
                    {children}
                </div>
            </div>
        </GenericDashboardLayoutStyle>
        </body>
     );
}