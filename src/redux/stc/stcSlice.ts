import { IUser } from "@/types/User";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IStudentCompData } from "@/types/Student";
import { ICourseData } from "@/components/fme/course_list/data";
// this is the redux page for managing the MDA dashboard

// this can change depending on what the MDA user profile looks like
interface ISTCState{
    stcLoading : boolean;
    stcError : string | null;
    unchangedStudentsList: IStudentCompData[] | null;
	selectedStudentId: number | null;
	fakeNewStudentId: number | null;
	fakeNewCourseId: number | null;
	selectedCourseId: number | null;
	unchangedCoursesList: ICourseData[] | null;
	pageNo : number;
}

const initialState:ISTCState = {
    stcLoading : true,
    stcError : null,
    unchangedStudentsList: null,
	unchangedCoursesList: null,
	selectedStudentId: null,
	selectedCourseId: null,
	fakeNewStudentId: null,
	fakeNewCourseId: null,
	pageNo : 1,
}

export const stcSlice = createSlice({
    name :"stc",
    initialState,
    reducers:{
        resetStcData:(state)=>{
            state.stcError = null;
            state.stcLoading = true;
    
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
        setPageNo :(state, action: PayloadAction<number>)=>{
			if(action.payload >= 1){
				state.pageNo = action.payload;
			}
		},
		resetPageNo :(state)=>{
			state.pageNo = 1;
		}
    }
});

export const stcSelector = (state :RootState) => state.stc;

export const {resetStcData,setFakeNewStudentId,
	setFakeNewCourseId,
	setUnchangedStudentsList,
	setUnchangedCoursesList,
	setSelectedStudentId,
	setSelectedCourseId,
	setPageNo,
	resetPageNo} = stcSlice.actions;
export default stcSlice.reducer;