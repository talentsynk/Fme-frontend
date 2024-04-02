import { IUser } from "@/types/User";
import { createSlice } from "@reduxjs/toolkit";

// this is the redux page for managing the FME dashboard

interface IFMEState{
    user : IUser | null;
    fmeLoading : boolean;
    fmeError : string | null;
}

const initialState:IFMEState = {
    user : null,
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
            state.user = null;
        }
    }
});
// export const fmeSelector = (st)

export const {resetFmeData} = fmeSlice.actions;
export default fmeSlice.reducer;