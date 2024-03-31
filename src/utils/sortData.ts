import { IMDAData } from "@/components/fme/mda/data";

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