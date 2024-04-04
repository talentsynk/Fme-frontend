import { IUser } from "@/types/User";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


// this is the redux page for managing the MDA dashboard

// this can change depending on what the MDA user profile looks like
interface IMDAState{
    mdaLoading : boolean;
    mdaError : string | null;
}

const initialState:IMDAState = {
    mdaLoading : true,
    mdaError : null,
}

export const mdaSlice = createSlice({
    name :"mda",
    initialState,
    reducers:{
        resetMdaData:(state)=>{
            state.mdaError = null;
            state.mdaLoading = true;
    
        }
    }
});

export const mdaSelector = (state :RootState) => state.mda;

export const {resetMdaData} = mdaSlice.actions;
export default mdaSlice.reducer;