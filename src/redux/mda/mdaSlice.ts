import { IUser } from "@/types/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ISTCCompData } from "@/types/Stc";

// this is the redux page for managing the MDA dashboard

// this can change depending on what the MDA user profile looks like
interface IMDAState {
  selectedStcId: number | null;
  unchangedStcList: ISTCCompData[] | null;
  fakeNewStcId: number | null;
}

const initialState: IMDAState = {
  selectedStcId: null,
  unchangedStcList: null,
  fakeNewStcId: null,
};

export const mdaSlice = createSlice({
  name: "mda",
  initialState,
  reducers: {
    setSelectedStcId: (state, action: PayloadAction<number | null>) => {
      state.selectedStcId = action.payload;
    },
    setUnchangedStcList: (
      state,
      action: PayloadAction<ISTCCompData[] | null>
    ) => {
      state.unchangedStcList = action.payload;
    },
    setFakeNewStcId: (state, action: PayloadAction<number>) => {
			state.fakeNewStcId = action.payload;
		},
  },
});

export const mdaSelector = (state: RootState) => state.mda;

export const { setSelectedStcId, setUnchangedStcList, setFakeNewStcId } = mdaSlice.actions;
export default mdaSlice.reducer;
