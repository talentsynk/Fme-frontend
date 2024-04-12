import { IMDAData } from "@/components/fme/mda/data";
import { ISTCData } from "@/components/fme/stc/data";
import { IStudentData } from "@/components/fme/students/data";

export const sortMDADataAlphabetically = (data: IMDAData[], reverse: boolean = false): IMDAData[] => {
    const sortedData = data.slice().sort((a, b) => {
      if (reverse) {
        return b.name.localeCompare(a.name);
      } else {
        return a.name.localeCompare(b.name);
      }
    });
    return sortedData;
  };

export const sortSTCDataAlphabetically = (data: ISTCData[], reverse: boolean = false): ISTCData[] => {
    const sortedData = data.slice().sort((a, b) => {
      if (reverse) {
        return b.name.localeCompare(a.name);
      } else {
        return a.name.localeCompare(b.name);
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