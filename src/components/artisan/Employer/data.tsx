import { IMdaItemDropdown, ITabSwitch } from "@/components/fme/mda/data";

export const EmployerProfileTabSwitches: ITabSwitch[] = [
  { text: "Jobs Posted", tabIndex: 0, isSelected: true },
  { text: "Reviews", tabIndex: 1, isSelected: false },
];

export const ArtisanSortItemDropdownList: IMdaItemDropdown[] = [
  { text: "Most Rated", isSelected: false, id: "0" },
  { text: "Recommended", isSelected: false, id: "1" },
];
