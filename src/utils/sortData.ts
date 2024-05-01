import { ICourseData } from "@/components/fme/course_list/data";
import { IMDACompData } from "@/types/Mda";
import { ISTCCompData } from "@/types/Stc";
import { IStudentCompData } from "@/types/Student";

export const sortMDADataAlphabetically = (data: IMDACompData[], reverse: boolean = false): IMDACompData[] => {
	const sortedData = data.slice().sort((a, b) => {
		if (reverse) {
			return b.Name.localeCompare(a.Name);
		} else {
			return a.Name.localeCompare(b.Name);
		}
	});
	return sortedData;
};

export const sortSTCDataAlphabetically = (data: ISTCCompData[], reverse: boolean = false): ISTCCompData[] => {
	const sortedData = data.slice().sort((a, b) => {
		if (reverse) {
			return b.Name.localeCompare(a.Name);
		} else {
			return a.Name.localeCompare(b.Name);
		}
	});
	return sortedData;
};

export const sortStudentListDataAlphabetically = (data: IStudentCompData[], reverse: boolean = false): IStudentCompData[] => {
	const sortedData = data.slice().sort((a, b) => {
		if (reverse) {
			return b.LastName.localeCompare(a.LastName);
		} else {
			return a.LastName.localeCompare(b.LastName);
		}
	});
	return sortedData;
};
export const sortCourseListDataAlphabetically = (data: ICourseData[], reverse: boolean = false): ICourseData[] => {
	const sortedData = data.slice().sort((a, b) => {
		if (reverse) {
			return b.Name.localeCompare(a.Name);
		} else {
			return a.Name.localeCompare(b.Name);
		}
	});
	return sortedData;
};
