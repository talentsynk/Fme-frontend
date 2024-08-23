import { ITabSwitch } from "../fme/mda/data";

export interface IUserLink {
  href: string;
  name: string;
  isSelected: boolean;
}

export const ArtisanPageLinks: IUserLink[] = [
  { name: "Dashboard", href: "/dashboard/artisan", isSelected: true },
  { name: "Jobs", href: "/dashboard/artisan/jobs", isSelected: false },
  { name: "Support", href: "/dashboard/support", isSelected: false },
];

export const EmployerPageLinks: IUserLink[] = [
  { name: "Dashboard", href: "/dashboard/employer", isSelected: true },
  {
    name: "Hire An Artisan",
    href: "/dashboard/employer/hire",
    isSelected: false,
  },
  { name: "Support", href: "/dashboard/support", isSelected: false },
];

export const ArtisanProfileTabSwitches: ITabSwitch[] = [
  { text: "Reviews", tabIndex: 0, isSelected: true },
]