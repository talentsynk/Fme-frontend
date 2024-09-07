import { IMdaItemDropdown, ITabSwitch } from "../fme/mda/data";
import { IJob } from "./Job";

export const ArtisanTabSwitches: ITabSwitch[] = [
  { text: "All jobs", tabIndex: 0, isSelected: true },
  { text: "Part-time jobs", tabIndex: 1, isSelected: false },
  { text: "Full-time jobs", tabIndex: 2, isSelected: false },
];

interface IJo{
  Id:string;
  JobTitle:string;
  date:string;
  location:string;
  desc:string;
  type:string;
  isClosed:boolean;
  Amount:string;
}
export const Jobs: IJo[] = [
  {
    Id: "0",
    JobTitle: "Oragon Confectionaries",
    date: "2",
    location: "lagos",
    isClosed: false,
    desc: "I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 8968 3728 lethsjsjdsjd",
    type: "Contract",
    Amount: "300k",
  },
  {
    Id: "1",
    JobTitle: "Temi Confectionaries",
    date: "3",
    location: "oyo",
    isClosed: false,
    desc: "I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 8968 3728 lethsjsjdsjd",
    type: "Full Time",
    Amount: "500k",
  },
  {
    Id: "2",
    JobTitle: "Ifeoluwa Confectionaries",
    date: "7",
    location: "abuja",
    isClosed: false,
    desc: "I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 8968 3728 lethsjsjdsjd",
    type: "Contract",
    Amount: "300k",
  },
  {
    Id: "3",
    JobTitle: "Zoe Confectionaries",
    date: "9",
    location: "enugu",
    isClosed: false,
    desc: "I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 8968 3728 lethsjsjdsjd",
    type: "Contract",
    Amount: "900k",
  },
  {
    Id: "4",
    JobTitle: "Party Makers",
    date: "7",
    location: "abuja",
    isClosed: false,
    desc: "I need a caterer for 20 peoples meal in a birthday party that is coming up soon. Call +234 817 8968 3728 lethsjsjdsjd",
    type: "Contract",
    Amount: "700k",
  },
];

export const JobSortItemDropdownList: IMdaItemDropdown[] = [
  { text: "Last 24 hours", isSelected: false, id: "0" },
  { text: "Last 7 days", isSelected: false, id: "1" },
  { text: "Last 30 days", isSelected: false, id: "2" },
];