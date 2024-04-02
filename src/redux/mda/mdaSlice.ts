import { IUser } from "@/types/User";
import { createSlice } from "@reduxjs/toolkit";


// this is the redux page for managing the MDA dashboard

// this can change depending on what the MDA user profile looks like
interface IMDAState{
    user : IUser | null;
    mdaLoading : boolean;
    mdaError : string | null;
}

const initialState:IMDAState = {
    user : null,
    mdaLoading : true,
    mdaError : null,
}

export const mdaSlice = createSlice({
    name :"fme",
    initialState,
    reducers:{
        resetMdaData:(state)=>{
            state.mdaError = null;
            state.mdaLoading = true;
            state.user = null;
        }
    }
});
// export const fmeSelector = (st)

export const {resetMdaData} = mdaSlice.actions;
export default mdaSlice.reducer;