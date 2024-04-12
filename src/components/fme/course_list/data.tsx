export interface ICourses {
	name: string;
}

export const Courses: ICourses[] = [{ name: "Biology" }, { name: "Chemistry" }, { name: "Physics" }, { name: "Civic" }];

export interface ICourseData {
	id: string;
	course: string;
}

export const sortCourseDataAlphabetically = (data: ICourseData[], reverse: boolean = false): ICourseData[] => {
	const sortedData = data.slice().sort((a, b) => {
		if (reverse) {
			return b.course.localeCompare(a.course);
		} else {
			return a.course.localeCompare(b.course);
		}
	});
	return sortedData;
};
