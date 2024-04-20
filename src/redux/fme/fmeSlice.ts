import { IUser } from "@/types/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ISTCData } from "@/components/fme/stc/data";
import { IMDACompData } from "@/types/Mda";
import { ISTCCompData } from "@/types/Stc";

// this is the redux page for managing the FME dashboard

interface IFMEState {
  fmeLoading: boolean;
  fmeError: string | null;
  unchangedMdaList: IMDACompData[] | null;
  unchangedStcList: ISTCCompData[] | null;
  selectedMdaId: number | null;
  selectedStcId: number | null;
  fakeNewMdaId : number | null;
  fakeNewStcId : number | null;
}

const initialState: IFMEState = {
  fmeLoading: true,
  fmeError: null,
  unchangedMdaList: null,
  unchangedStcList: null,
  selectedMdaId: null,
  selectedStcId: null,
  fakeNewMdaId : null,
  fakeNewStcId : null,
};

export const fmeSlice = createSlice({
  name: "fme",
  initialState,
  reducers: {
    resetFmeData: (state) => {
      state.fmeError = null;
      state.fmeLoading = true;
    },
    setSelectedMdaId: (state, action: PayloadAction<number | null>) => {
      state.selectedMdaId = action.payload;
    },
    setUnchangedMdaList: (state, action: PayloadAction<IMDACompData[] | null>) => {
      state.unchangedMdaList = action.payload;
    },
    setSelectedStcId: (state, action: PayloadAction<number | null>) => {
      state.selectedStcId = action.payload;
    },
    setUnchangedStcList: (state, action: PayloadAction<ISTCCompData[] | null>) => {
      state.unchangedStcList = action.payload;
    },
    setFakeNewMdaId:(state,action:PayloadAction<number>)=>{
      state.fakeNewMdaId = action.payload;
    },
    setFakeNewStcId:(state,action:PayloadAction<number>)=>{
      state.fakeNewStcId = action.payload;
    },
  },
});

export const fmeSelector = (state: RootState) => state.fme;

export const {
  resetFmeData,
  setSelectedMdaId,
  setUnchangedMdaList,
  setSelectedStcId,
  setUnchangedStcList,
  setFakeNewMdaId,
  setFakeNewStcId
} = fmeSlice.actions;
export default fmeSlice.reducer;
