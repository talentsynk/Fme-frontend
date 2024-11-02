import { ILinkFunc } from "../fme/sidebar/data";
import {
  ActiveCourseList,
  ActiveHome,
  ActiveSettingsIcon,
  ActiveStcPageIcon,
  ActiveStudentList,
  ActiveSupportIcon,
  AllCoursesIcon,
  AllStudentTIcon,
  HomeIcon,
  SettingsIcon,
  StcPageIcon,
  SupportIcon,
} from "../icons/sidebar";


export const STCPageLinks: ILinkFunc[] = [
    {
      href: "/stc",
      icon: <HomeIcon />,
      isSelected: true,
      id: "1",
      name: "Dashboard",
      activeState: <ActiveHome />,
    },
    {
      href: "/stc/all-students",
      icon: <AllStudentTIcon />,
      isSelected: false,
      id: "4",
      name: "All Students List",
      activeState: <ActiveStudentList />,
    },
    {
      href: "/stc/course-list",
      icon: <AllCoursesIcon />,
      isSelected: false,
      id: "5",
      name: "Course List",
      activeState: <ActiveCourseList />,
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