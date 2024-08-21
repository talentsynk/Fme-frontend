import { ITabSwitch } from "../fme/mda/data";
import { IJob } from "./Job";

export const ArtisanTabSwitches: ITabSwitch[] = [
  { text: "All jobs", tabIndex: 0, isSelected: true },
  { text: "On-hire jobs", tabIndex: 1, isSelected: false },
  { text: "Contract jobs", tabIndex: 2, isSelected: false },
];

export const Jobs: IJob[] = [
  {
    id: "0",
    name: "Oragon Confectionaries",
    date: "2",
    location: "lagos",
    isClosed: false,
    desc: "I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 8968 3728 lethsjsjdsjd",
    type: "Contract",
    pay: "300k",
  },
  {
    id: "1",
    name: "Temi Confectionaries",
    date: "3",
    location: "oyo",
    isClosed: false,
    desc: "I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 8968 3728 lethsjsjdsjd",
    type: "Full Time",
    pay: "500k",
  },
  {
    id: "2",
    name: "Ifeoluwa Confectionaries",
    date: "7",
    location: "abuja",
    isClosed: false,
    desc: "I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 8968 3728 lethsjsjdsjd",
    type: "Contract",
    pay: "300k",
  },
  {
    id: "3",
    name: "Zoe Confectionaries",
    date: "9",
    location: "enugu",
    isClosed: false,
    desc: "I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 8968 3728 lethsjsjdsjd",
    type: "Contract",
    pay: "900k",
  },
  {
    id: "4",
    name: "Party Makers",
    date: "7",
    location: "abuja",
    isClosed: false,
    desc: "I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 8968 3728 lethsjsjdsjd",
    type: "Contract",
    pay: "700k",
  },
];
