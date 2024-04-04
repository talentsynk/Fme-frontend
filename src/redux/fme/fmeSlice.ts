import { IUser } from "@/types/User";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// this is the redux page for managing the FME dashboard

interface IFMEState{
    fmeLoading : boolean;
    fmeError : string | null;
}

const initialState:IFMEState = {
    fmeLoading : true,
    fmeError : null,
}

export const fmeSlice = createSlice({
    name :"fme",
    initialState,
    reducers:{
        resetFmeData:(state)=>{
            state.fmeError = null;
            state.fmeLoading = true;
    
        }
    }
});

export const fmeSelector = (state :RootState) => state.fme;

export const {resetFmeData} = fmeSlice.actions;
export default fmeSlice.reducer;