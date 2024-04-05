import { FilterIcon, SortIcon, WhiteFilterIcon, WhiteSortIcon } from "@/components/icons/fme/mda";
import { ReactNode } from "react";

export interface ITabSwitch {
  text: string;
  tabIndex: number;
  isSelected: boolean;
}

export const MDATabSwitches: ITabSwitch[] = [
  { text: "All MDAs", tabIndex: 0, isSelected: true },
  { text: "Active MDAs", tabIndex: 1, isSelected: false },
  { text: "Inactive MDAs", tabIndex: 2, isSelected: false },
];

export interface IFilterBtn {
  icon: ReactNode;
  activeIcon: ReactNode;
  text: string;
  isSelected: boolean;
}
export const FilterBtns: IFilterBtn[] = [
  // { icon: <FilterIcon />, activeIcon: <WhiteFilterIcon />, text: "Filter", isSelected: false },
  { icon: <SortIcon />, activeIcon: <WhiteSortIcon /> , text: "Sort", isSelected: false },
];
export interface IMDAData {
  id: string;
  name: string;
  stcNo: number;
  studentNo: number;
  address: string;
  state: string;
  isActive: boolean;
}

export interface ISelectedMDA {
  mdaId: string;
  name: string;
}
export const MDAData: IMDAData[] = [
  {
    id: "1",
    name: "MICT",
    stcNo: 1,
    studentNo: 200,
    address: "1, Herbet Macauly way, Lagos",
    state: "lagos",
    isActive: true,
  },
  {
    id: "2",
    name: "NITDA",
    stcNo: 30,
    studentNo: 2000,
    address: "1, Herbet Macauly way, Ijaniki",
    state: "abuja",
    isActive: true,
  },
  {
    id: "3",
    name: "NIIT",
    stcNo: 15,
    studentNo: 90,
    address: "1, Herbet Macauly way, Ijaniki",
    state: "Imo",
    isActive: false,
  },
  {
    id: "4",
    name: "NESMA",
    stcNo: 12,
    studentNo: 2300,
    address: "1, Apian way, Chukwudi uto",
    state: "AnamBra",
    isActive: true,
  },
  {
    id: "5",
    name: "MST",
    stcNo: 105,
    studentNo: 23000,
    address: "1, Apian way, Chukwudi uto",
    state: "enugu",
    isActive: false,
  },
  {
    id: "6",
    name: "MTrade",
    stcNo: 15,
    studentNo: 230,
    address: "1, Apian way, Chukwudi uto",
    state: "enugu",
    isActive: true,
  },
  {
    id: "7",
    name: "NABTEB",
    stcNo: 1050,
    studentNo: 28900,
    address: "1, Apian way, Garki",
    state: "abuja",
    isActive: false,
  },
];

export interface IMdaItemDropdown {
  text: string;
  isSelected: boolean;
  hasBorder?: boolean;
  id ?: string;
}
export const MdaItemDropdownList: IMdaItemDropdown[] = [
  { text: "View MDA Profile", isSelected: false },
  { text: "Suspend MDA", isSelected: false },
  { text: "Clear Selection", isSelected: false, hasBorder: true },
];
export const SortItemDropdownList: IMdaItemDropdown[] = [
  { text: "Ascending: A to Z", isSelected: false, id : "1" },
  { text: "Descending: Z to A", isSelected: false, id : "-1" },
  { text: "Clear Selection", isSelected: false, hasBorder: true, id : "0" },
];
export interface IMdaDropdownFunc extends IMdaItemDropdown {
  handleSelect: () => void;
}

export interface IState {
  name: string;
}

export const States: IState[] = [
  { name: "Abia" },
  { name: "Adamawa" },
  { name: "Akwa Ibom" },
  { name: "Anambra" },
  { name: "Bauchi" },
  { name: "Bayelsa" },
  { name: "Benue" },
  { name: "Borno" },
  { name: "Cross River" },
  { name: "Delta" },
  { name: "Ebonyi" },
  { name: "Edo" },
  { name: "Ekiti" },
  { name: "Enugu" },
  { name: "Federal Capital Territory" },
  { name: "Gombe" },
  { name: "Imo" },
  { name: "Jigawa" },
  { name: "Kaduna" },
  { name: "Kano" },
  { name: "Kastina" },
  { name: "Kebbi" },
  { name: "Kogi" },
  { name: "Kwara" },
  { name: "Lagos" },
  { name: "Nasarawa" },
  { name: "Niger" },
  { name: "Ogun" },
  { name: "Ondo" },
  { name: "Osun" },
  { name: "Oyo" },
  { name: "Plateau" },
  { name: "Rivers" },
  { name: "Sokoto" },
  { name: "Taraba" },
  { name: "Yobe" },
  { name: "Zamfara" },
];
