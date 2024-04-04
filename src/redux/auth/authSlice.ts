import { IUser } from "@/types/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// this is the redux page for managing authentication and accounts

interface IFMEState {
  userError: string | null;
  isSessionExpired: boolean;
}

const initialState: IFMEState = {
  isSessionExpired: false,
  userError: null, // for handling user errors like session time out from the server
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSessionExpiration: (state, action: PayloadAction<boolean>) => {
      state.isSessionExpired = action.payload;
    },
  },
});

export const authSelector = (state: RootState) => state.auth;

export const {
  setSessionExpiration,
} = authSlice.actions;

export default authSlice.reducer;
