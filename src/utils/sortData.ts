import { IMDAData } from "@/components/fme/mda/data";
import { ISTCData } from "@/components/fme/stc/data";
import { IStudentData } from "@/components/fme/students/data";
import { ICourseData } from "@/components/fme/course_list/data";
import { IMDACompData } from "@/types/Mda";
import { ISTCCompData } from "@/types/Stc";

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

export const sortStudentListDataAlphabetically = (data: IStudentData[], reverse: boolean = false): IStudentData[] => {
    const sortedData = data.slice().sort((a, b) => {
      if (reverse) {
        return b.profile.localeCompare(a.profile);
      } else {
        return a.profile.localeCompare(b.profile);
      }
    });
    return sortedData;
  };
export const sortCourseListDataAlphabetically = (data: ICourseData[], reverse: boolean = false): ICourseData[] => {
	const sortedData = data.slice().sort((a, b) => {
		if (reverse) {
			return b.name.localeCompare(a.name);
		} else {
			return a.name.localeCompare(b.name);
		}
	});
	return sortedData;
};