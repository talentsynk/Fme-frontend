import { ActivePfIcon, PfIcon, SignOutIcon } from "@/components/icons/header";
import { ReactNode } from "react";

export interface IDesktopDropdown {
    id: string;
  link: string;
  text: string;
  icon: ReactNode;
  activeBg: string;
  activeState: ReactNode;
  textColor: string;
  activeTextColor?: string;
  isSelected: boolean;
}

export interface IDesktopDropdownFunc extends IDesktopDropdown {
  handleClick: () => void;
}
export const DesktopDropdownLinks: IDesktopDropdown[] = [
  {
    id : "1",
    link: "/fme/settings",
    icon: <PfIcon />,
    text: "View Profile",
    activeBg: "#00932E",
    textColor: "#111",
    activeState: <ActivePfIcon />,
    activeTextColor: "#FFFFFF",
    isSelected: false,
  },
  {
    id : "2",
    link: "/admin",
    text: "Sign Out",
    icon: <SignOutIcon />,
    activeBg: "#FFE5DD",
    textColor: "#FF3717",
    activeState: <SignOutIcon />,
    activeTextColor: "",
    isSelected: false,
  },
];
