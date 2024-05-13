import { IUser } from "@/types/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ISTCCompData } from "@/types/Stc";
import { IStudentCompData } from "@/types/Student";
import { ICourseData } from "@/components/fme/course_list/data";

// this is the redux page for managing the MDA dashboard

// this can change depending on what the MDA user profile looks like
interface IMDAState {
	selectedStcId: number | null;
	unchangedStcList: ISTCCompData[] | null;
	fakeNewStcId: number | null;
	unchangedStudentsList: IStudentCompData[] | null;
	selectedStudentId: number | null;
	fakeNewStudentId: number | null;
	fakeNewCourseId: number | null;
	selectedCourseId: number | null;
	unchangedCoursesList: ICourseData[] | null;
}

const initialState: IMDAState = {
	selectedStcId: null,
	unchangedStcList: null,
	fakeNewStcId: null,
	unchangedStudentsList: null,
	unchangedCoursesList: null,
	selectedStudentId: null,
	selectedCourseId: null,
	fakeNewStudentId: null,
	fakeNewCourseId: null,

};

export const mdaSlice = createSlice({
	name: "mda",
	initialState,
	reducers: {
		setSelectedStcId: (state, action: PayloadAction<number | null>) => {
			state.selectedStcId = action.payload;
		},
		setUnchangedStcList: (state, action: PayloadAction<ISTCCompData[] | null>) => {
			state.unchangedStcList = action.payload;
		},
		setFakeNewStcId: (state, action: PayloadAction<number>) => {
			state.fakeNewStcId = action.payload;
		},
		setSelectedCourseId: (state, action: PayloadAction<number | null>) => {
			state.selectedCourseId = action.payload;
		},
		setSelectedStudentId: (state, action: PayloadAction<number | null>) => {
			state.selectedStudentId = action.payload;
		},
		setUnchangedStudentsList: (state, action: PayloadAction<IStudentCompData[] | null>) => {
			state.unchangedStudentsList = action.payload;
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

export const mdaSelector = (state: RootState) => state.mda;

export const {
	setSelectedStcId,
	setUnchangedStcList,
	setFakeNewStcId,
	setFakeNewStudentId,
	setFakeNewCourseId,
	setUnchangedStudentsList,
	setUnchangedCoursesList,
	setSelectedStudentId,
	setSelectedCourseId,
} = mdaSlice.actions;
export default mdaSlice.reducer;
