import { ITabSwitch } from "../mda/data";
export interface ICourses {
	name: string;
}

export const Courses: ICourses[] = [{ name: "Biology" }, { name: "Chemistry" }, { name: "Physics" }, { name: "Civic" }];

export interface ICourseData {
	id: string;
	name: string;
	isActive: boolean;
}
export const CoursesTabSwitches: ITabSwitch[] = [
	{ text: "All Student List", tabIndex: 0, isSelected: true },
	{ text: "Active Students", tabIndex: 1, isSelected: false },
	{ text: "Inactive Studentss", tabIndex: 2, isSelected: false },
];

export const sortCourseDataAlphabetically = (data: ICourseData[], reverse: boolean = false): ICourseData[] => {
	const sortedData = data.slice().sort((a, b) => {
		if (reverse) {
			return b.name.localeCompare(a.name);
		} else {
			return a.name.localeCompare(b.name);
		}
	});
	return sortedData;
};
