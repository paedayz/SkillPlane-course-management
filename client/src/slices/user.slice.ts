import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout, register } from "../api";
import { LOCALSTORAGE_AC_TOKEN_KEY } from "../constants";
import { IDecodeToken, ILoginBody, IRegisterBody } from "../interfaces";
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

// export const loginAsync = createAsyncThunk(
//   "user/login",
//   async (data: ILoginBody) => {
//     const res = await login(data.username, data.password);
//     return res;
//   }
// );

// export const registerAsync = createAsyncThunk(
//   "user/register",
//   async (data: IRegisterBody) => {
//     const res = await register(
//       data.username,
//       data.password,
//       data.confirmPassword
//     );
//     return res;
//   }
// );

// export const logoutAsync = createAsyncThunk("user/logout", async () => {
//   const res = await logout();
//   return res;
// });

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state) => {
      const accessToken = localStorage.getItem(LOCALSTORAGE_AC_TOKEN_KEY);
      if (accessToken) {
        const decode: IDecodeToken = jwt_decode(accessToken);
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
