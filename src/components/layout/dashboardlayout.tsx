"use client";
import { DashboardHeader } from "../fme/header/header";
import { FMEPageLinks } from "../fme/sidebar/data";
import { DashboardSidebar } from "../fme/sidebar/sidebar";
import { GenericDashboardLayoutStyle } from "./style";

export const GenericDasboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <body>
      <GenericDashboardLayoutStyle>
        <div className="header">
          <DashboardHeader />
        </div>
        <div className="sidebar">
          {/* // depending on the role gotten when the user logs in, conditionally render this component with varying unique data */}
          <DashboardSidebar uniquePageLinks={FMEPageLinks} splitIndex={5} />
        </div>
        <div className="ctrl">
          <div className="main">{children}</div>
        </div>
      </GenericDashboardLayoutStyle>
    </body>
  );
};
