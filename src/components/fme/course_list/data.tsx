import { ITabSwitch } from "../mda/data";
export interface ICourses {
	name: string;
}

export const Courses: ICourses[] = [{ name: "Biology" }, { name: "Chemistry" }, { name: "Physics" }, { name: "Civic" }];

export interface ICourseData {
	Id: Number;
	Name: string;
	Description: string;
}

export const CoursesTabSwitches: ITabSwitch[] = [
	{ text: "Current Course List", tabIndex: 0, isSelected: true },
	{ text: "Analytics of all Course", tabIndex: 1, isSelected: false },
];

export const sortCourseDataAlphabetically = (data: ICourseData[], reverse: boolean = false): ICourseData[] => {
	const sortedData = data.slice().sort((a, b) => {
		if (reverse) {
			return b.Name.localeCompare(a.Name);
		} else {
			return a.Name.localeCompare(b.Name);
		}
	});
	return sortedData;
};
