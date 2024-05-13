import { FilterIcon, SortIcon, WhiteFilterIcon, WhiteSortIcon } from "@/components/icons/fme/mda";
import { ReactNode } from "react";
import { IMdaItemDropdown } from "../mda/data";

export interface ITabSwitch {
  text: string;
  tabIndex: number;
  isSelected: boolean;
}

export const STCTabSwitches: ITabSwitch[] = [
  { text: "All STCs", tabIndex: 0, isSelected: true },
  { text: "Active STCs", tabIndex: 1, isSelected: false },
  { text: "Inactive STCs", tabIndex: 2, isSelected: false },
];


export interface ISTCData {
  id: string;
  name: string;
  coursesNo: number;
  studentNo: number;
  address: string;
  state: string;
  isActive: boolean;
}

export const STCData: ISTCData[] = [
  {
    id: "1",
    name: "FED MINISTRY OF WORKS & HOUSING",
    coursesNo: 1,
    studentNo: 200,
    address: "1, Herbet Macauly way, Lagos",
    state: "lagos",
    isActive: true,
  },
  {
    id: "2",
    name: "AGRICULTURAL SKILLS CENTRE, DAMARE",
    coursesNo: 30,
    studentNo: 2000,
    address: "1, Herbet Macauly way, Ijaniki",
    state: "abuja",
    isActive: true,
  },
  {
    id: "3",
    name: "VOCATIONAL TECHNICAL TRAINING CENTRE, GOMBI",
    coursesNo: 15,
    studentNo: 90,
    address: "1, Herbet Macauly way, Ijaniki",
    state: "Imo",
    isActive: false,
  },
  {
    id: "4",
    name: "TECHNICAL SKILLS ACQUISITION CENTRE, MUBI",
    coursesNo: 12,
    studentNo: 2300,
    address: "1, Apian way, Chukwudi uto",
    state: "AnamBra",
    isActive: true,
  },
  {
    id: "5",
    name: "VOCATIONAL TECHNICAL TRAINING CENTRE, MAYO-BELWA",
    coursesNo: 105,
    studentNo: 23000,
    address: "1, Apian way, Chukwudi uto",
    state: "enugu",
    isActive: false,
  },
  {
    id: "6",
    name: "MODEL NOMADIC SKILL EDUCATION CENTER",
    coursesNo: 15,
    studentNo: 230,
    address: "1, Apian way, Chukwudi uto",
    state: "enugu",
    isActive: true,
  },
  {
    id: "7",
    name: "TECHNICAL SKILLS ACQUISITION CENTRE, GARKI",
    coursesNo: 1050,
    studentNo: 28900,
    address: "1, Apian way, Garki",
    state: "abuja",
    isActive: false,
  },
];

export const StcItemDropdownList: IMdaItemDropdown[] = [
  { text: "View STC Profile", isSelected: false },
  { text: "Suspend STC", isSelected: false },
  { text: "Clear Selection", isSelected: false, hasBorder: true },
];

export interface IMdaDropdownFunc extends IMdaItemDropdown {
  handleSelect: () => void;
}

export interface IState {
  name: string;
}


