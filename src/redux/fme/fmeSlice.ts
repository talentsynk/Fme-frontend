import { ICourseData } from "@/components/fme/course_list/data";
import { IMDACompData } from "@/types/Mda";
import { ISTCCompData } from "@/types/Stc";
import { IStudentCompData } from "@/types/Student";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// this is the redux page for managing the FME dashboard

interface IFMEState {
	fmeLoading: boolean;
	fmeError: string | null;
	unchangedMdaList: IMDACompData[] | null;
	unchangedStcList: ISTCCompData[] | null;
	unchangedStudentsList: IStudentCompData[] | null;
	unchangedCoursesList: ICourseData[] | null;
	selectedMdaId: number | null;
	selectedStcId: number | null;
	selectedStudentId: number | null;
	selectedCourseId: number | null;
	fakeNewMdaId: number | null;
	fakeNewStcId: number | null;
	fakeNewStudentId: number | null;
	fakeNewCourseId: number | null;
}

const initialState: IFMEState = {
	fmeLoading: true,
	fmeError: null,
	unchangedMdaList: null,
	unchangedStcList: null,
	unchangedStudentsList: null,
	unchangedCoursesList: null,
	selectedMdaId: null,
	selectedStcId: null,
	selectedStudentId: null,
	selectedCourseId: null,
	fakeNewMdaId: null,
	fakeNewStcId: null,
	fakeNewStudentId: null,
	fakeNewCourseId: null,
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
		setSelectedCourseId: (state, action: PayloadAction<number | null>) => {
			state.selectedCourseId = action.payload;
		},
		setSelectedStudentId: (state, action: PayloadAction<number | null>) => {
			state.selectedStudentId = action.payload;
		},
		setUnchangedStcList: (state, action: PayloadAction<ISTCCompData[] | null>) => {
			state.unchangedStcList = action.payload;
		},
		setUnchangedStudentsList: (state, action: PayloadAction<IStudentCompData[] | null>) => {
			state.unchangedStudentsList = action.payload;
		},
		setFakeNewMdaId: (state, action: PayloadAction<number>) => {
			state.fakeNewMdaId = action.payload;
		},
		setFakeNewStcId: (state, action: PayloadAction<number>) => {
			state.fakeNewStcId = action.payload;
		},
		setFakeNewStudentId: (state, action: PayloadAction<number>) => {
			state.fakeNewStudentId = action.payload;
		},
		setFakeNewCourseId: (state, action: PayloadAction<number>) => {
			state.fakeNewCourseId = action.payload;
		},
		setUnchangedCoursesList: (state, action: PayloadAction<ICourseData[] | null>) => {
			state.unchangedCoursesList = action.payload;
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
	setFakeNewStcId,
	setFakeNewStudentId,
	setFakeNewCourseId,
	setUnchangedStudentsList,
	setUnchangedCoursesList,
	setSelectedStudentId,
	setSelectedCourseId,
} = fmeSlice.actions;
export default fmeSlice.reducer;
