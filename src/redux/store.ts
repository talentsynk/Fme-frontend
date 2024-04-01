import { configureStore } from "@reduxjs/toolkit";
import fmeReducer from "./fme/fmeSlice";
import mdaReducer from "./mda/mdaSlice";
import stcReducer from "./stc/stcSlice";


export const store = configureStore({
    reducer : {
        fme : fmeReducer,
        mda : mdaReducer,
        stc : stcReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;