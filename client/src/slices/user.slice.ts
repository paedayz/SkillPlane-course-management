import { createSlice } from "@reduxjs/toolkit";
import { LOCALSTORAGE_AC_TOKEN_KEY } from "../constants";
import { IDecodeToken } from "../interfaces";
import jwt_decode from "jwt-decode";

export interface IUserState {
  authenticated: boolean;
  role: "user" | "admin" | undefined;
  username: string | undefined;
}

const initialState: IUserState = {
  authenticated: false,
  role: undefined,
  username: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state) => {
      const refreshToken = localStorage.getItem(LOCALSTORAGE_AC_TOKEN_KEY);
      let canAccess = false;

      if (!refreshToken) return;

      const decode: IDecodeToken = jwt_decode(refreshToken);
      const isExpire = decode.exp * 1000 < Date.now();
      canAccess = !isExpire ? true : false;

      if (canAccess) {
        state.authenticated = true;
        state.role = decode.role;
        state.username = decode.username;
      } else {
        state.authenticated = false;
        state.role = undefined;
        state.username = undefined;
      }
    },
    resetUserSlice: (state) => {
      state.authenticated = false;
      state.role = undefined;
      state.username = undefined;
    },
  },
  extraReducers: (builder) => {},
});

export const { setCredentials, resetUserSlice } = userSlice.actions;

export default userSlice.reducer;
