import { IUser } from "@/types/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IMDAData } from "@/components/fme/mda/data";
import { ISTCData } from "@/components/fme/stc/data";
import { IStudentData } from "@/components/fme/students/data";
import { ICourseData } from "@/components/fme/course_list/data";

// this is the redux page for managing the FME dashboard

interface IFMEState {
	fmeLoading: boolean;
	fmeError: string | null;
	unchangedMdaList: IMDAData[] | null;
	unchangedStcList: ISTCData[] | null;
	unchangedStudentsList: IStudentData[] | null;
	unchangedCoursesList: ICourseData[] | null;
	selectedMdaId: string | null;
	selectedStcId: string | null;
	selectedStudentId: string | null;
	selectedCourseId: string | null;
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
		setUnchangedStudentsList: (state, action: PayloadAction<IStudentData[] | null>) => {
			state.unchangedStudentsList = action.payload;
		},
		setUnchangedCoursesList: (state, action: PayloadAction<ICourseData[] | null>) => {
			state.unchangedCoursesList = action.payload;
		},
		setSelectedStudentId: (state, action: PayloadAction<string | null>) => {
			state.selectedStudentId = action.payload;
		},
		setSelectedCourseId: (state, action: PayloadAction<string | null>) => {
			state.selectedCourseId = action.payload;
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
	setUnchangedStudentsList,
	setUnchangedCoursesList,
	setSelectedStudentId,
	setSelectedCourseId,
} = fmeSlice.actions;

export default fmeSlice.reducer;
