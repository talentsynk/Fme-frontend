import { ITabSwitch, IMdaItemDropdown } from "../mda/data";
import { IStudentCompData } from "@/types/Student";

export const StudentsTabSwitches: ITabSwitch[] = [
	{ text: "All Students List", tabIndex: 0, isSelected: true },
	{ text: "Active Students", tabIndex: 1, isSelected: false },
	{ text: "Inactive Students", tabIndex: 2, isSelected: false },
];

export interface IStudentData {
	id: string;
	profile: string;
	studentId: number;
	coursesNo: number;
	state: string;
	isActive: boolean;
}

export const StudentData: IStudentData[] = [
	{
		id: "1",
		profile: "FED MINISTRY OF WORKS & HOUSING",
		coursesNo: 1,
		studentId: 200,
		state: "lagos",
		isActive: true,
	},
	{
		id: "2",
		profile: "AGRICULTURAL SKILLS CENTRE, DAMARE",
		coursesNo: 30,
		studentId: 2000,

		state: "abuja",
		isActive: true,
	},
	{
		id: "3",
		profile: "VOCATIONAL TECHNICAL TRAINING CENTRE, GOMBI",
		coursesNo: 15,
		studentId: 90,

		state: "Imo",
		isActive: false,
	},
	{
		id: "4",
		profile: "TECHNICAL SKILLS ACQUISITION CENTRE, MUBI",
		coursesNo: 12,
		studentId: 2300,
		state: "AnamBra",
		isActive: true,
	},
	{
		id: "5",
		profile: "VOCATIONAL TECHNICAL TRAINING CENTRE, MAYO-BELWA",
		coursesNo: 105,
		studentId: 23000,
		state: "enugu",
		isActive: false,
	},
	{
		id: "6",
		profile: "MODEL NOMADIC SKILL EDUCATION CENTER",
		coursesNo: 15,
		studentId: 230,
		state: "enugu",
		isActive: true,
	},
	{
		id: "7",
		profile: "TECHNICAL SKILLS ACQUISITION CENTRE, GARKI",
		coursesNo: 1050,
		studentId: 28900,
		state: "abuja",
		isActive: false,
	},
];

export const StudentItemDropdownList: IMdaItemDropdown[] = [
	{ text: "View Student Profile", isSelected: false },
	{ text: "Suspend Student", isSelected: false },
	{ text: "Clear Selection", isSelected: false, hasBorder: true },
];

export const sortStudentDataAlphabetically = (data: IStudentCompData[], reverse: boolean = false): IStudentCompData[] => {
	const sortedData = data.slice().sort((a, b) => {
		if (reverse) {
			return b.LastName.localeCompare(a.LastName);
		} else {
			return a.LastName.localeCompare(b.LastName);
		}
	});
	return sortedData;
};

export interface IStudentDropdownFunc extends IMdaItemDropdown {
	handleSelect: () => void;
}
