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
