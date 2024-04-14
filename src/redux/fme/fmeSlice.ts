import { IUser } from "@/types/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IMDAData } from "@/components/fme/mda/data";
import { ISTCData } from "@/components/fme/stc/data";

// this is the redux page for managing the FME dashboard

interface IFMEState {
  fmeLoading: boolean;
  fmeError: string | null;
  unchangedMdaList: IMDAData[] | null;
  unchangedStcList: ISTCData[] | null;
  selectedMdaId: string | null;
  selectedStcId: string | null;
}

const initialState: IFMEState = {
  fmeLoading: true,
  fmeError: null,
  unchangedMdaList: null,
  unchangedStcList: null,
  selectedMdaId: null,
  selectedStcId: null,
};

export const fmeSlice = createSlice({
  name: "fme",
  initialState,
  reducers: {
    resetFmeData: (state) => {
      state.fmeError = null;
      state.fmeLoading = true;
    },
    setSelectedMdaId: (state, action: PayloadAction<string | null>) => {
      state.selectedMdaId = action.payload;
    },
    setUnchangedMdaList: (state, action: PayloadAction<IMDAData[] | null>) => {
      state.unchangedMdaList = action.payload;
    },
    setSelectedStcId: (state, action: PayloadAction<string | null>) => {
      state.selectedStcId = action.payload;
    },
    setUnchangedStcList: (state, action: PayloadAction<ISTCData[] | null>) => {
      state.unchangedStcList = action.payload;
    },
  },
});

export const fmeSelector = (state: RootState) => state.fme;

export const {
  resetFmeData,
  setSelectedMdaId,
  setUnchangedMdaList,
  setSelectedStcId,
  setUnchangedStcList
} = fmeSlice.actions;
export default fmeSlice.reducer;
