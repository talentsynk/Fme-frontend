import { IUser } from "@/types/User";
import { createSlice } from "@reduxjs/toolkit";


// this is the redux page for managing the MDA dashboard

// this can change depending on what the MDA user profile looks like
interface ISTCState{
    user : IUser | null;
    stcLoading : boolean;
    stcError : string | null;
}

const initialState:ISTCState = {
    user : null,
    stcLoading : true,
    stcError : null,
}

export const stcSlice = createSlice({
    name :"fme",
    initialState,
    reducers:{
        resetStcData:(state)=>{
            state.stcError = null;
            state.stcLoading = true;
            state.user = null;
        }
    }
});
// export const fmeSelector = (st)

export const {resetStcData} = stcSlice.actions;
export default stcSlice.reducer;