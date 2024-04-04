import { IUser } from "@/types/User";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


// this is the redux page for managing the MDA dashboard

// this can change depending on what the MDA user profile looks like
interface ISTCState{
    stcLoading : boolean;
    stcError : string | null;
}

const initialState:ISTCState = {
    stcLoading : true,
    stcError : null,
}

export const stcSlice = createSlice({
    name :"stc",
    initialState,
    reducers:{
        resetStcData:(state)=>{
            state.stcError = null;
            state.stcLoading = true;
    
        }
    }
});

export const stcSelector = (state :RootState) => state.stc;

export const {resetStcData} = stcSlice.actions;
export default stcSlice.reducer;