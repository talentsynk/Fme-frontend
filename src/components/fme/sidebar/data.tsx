import {
  ActiveCourseList,
  ActiveHome,
  ActiveMdaPageIcon,
  ActiveSettingsIcon,
  ActiveStcPageIcon,
  ActiveStudentList,
  ActiveSupportIcon,
  AllCoursesIcon,
  AllStudentTIcon,
  HomeIcon,
  MdaPageIcon,
  SettingsIcon,
  StcPageIcon,
  SupportIcon,
} from "@/components/icons/sidebar";
import { ReactNode } from "react";

interface ILink {
  href: string;
  icon: ReactNode;
  name?: string;
}

export interface ILinkFunc extends ILink {
  id: string;
  isSelected: boolean;
  activeState?: ReactNode;
}


export const FMEPageLinks: ILinkFunc[] = [
  {
    href: "/fme",
    icon: <HomeIcon />,
    isSelected: true,
    id: "1",
    name: "Dashboard",
    activeState: <ActiveHome />,
  },
  {
    href: "/fme/mda",
    icon: <MdaPageIcon />,
    isSelected: false,
    id: "2",
    name: "MDA",
    activeState: <ActiveMdaPageIcon />,
  },
  {
    href: "/fme/stcs",
    icon: <StcPageIcon />,
    isSelected: false,
    id: "3",
    name: "STCs",
    activeState: <ActiveStcPageIcon />,
  },
  {
    href: "/fme/all-students",
    icon: <AllStudentTIcon />,
    isSelected: false,
    id: "4",
    name: "All Students List",
    activeState: <ActiveStudentList />,
  },
  {
    href: "/fme/course-list",
    icon: <AllCoursesIcon />,
    isSelected: false,
    id: "5",
    name: "Course List",
    activeState: <ActiveCourseList />,
  },
  {
    href: "/settings",
    icon: <SettingsIcon />,
    isSelected: false,
    id: "6",
    name: "Settings",
    activeState: <ActiveSettingsIcon />,
  },
  {
    href: "/support",
    icon: <SupportIcon />,
    isSelected: false,
    id: "7",
    name: "Support",
    activeState: <ActiveSupportIcon />,
  },
];

