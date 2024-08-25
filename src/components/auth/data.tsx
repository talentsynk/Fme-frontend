import { ReactNode } from "react";
import { ArtisanIcon, EmployerIcon, FMEIcon, MDAIcon } from "../icons/auth";

export interface IAdmin {
  name: string;
  icon: ReactNode;
  isSelected: boolean;
}

export interface ISelectAdminFunc extends IAdmin {
  handleSelect: () => void;
}

export const Admins: IAdmin[] = [
  { name: "FME", icon: <FMEIcon />, isSelected: false },
  { name: "MDA", icon: <MDAIcon />, isSelected: false },
  { name: "STC", icon: <MDAIcon />, isSelected: false },
];

export const Users: IAdmin[] = [
  { name: "Professional", icon: <ArtisanIcon/>, isSelected: false },
  { name: "Employer", icon: <EmployerIcon />, isSelected: false },
];
