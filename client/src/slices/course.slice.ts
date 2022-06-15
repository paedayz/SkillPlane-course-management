import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout, register } from "../api";
import { LOCALSTORAGE_AC_TOKEN_KEY } from "../constants";
import { IDecodeToken, ILoginBody, IRegisterBody } from "../interfaces";
import jwt_decode from "jwt-decode";

export interface IUserState {
    courses: ICourse[]
}

export interface ICourse {
    id: number;
    name: string;
    description: string;
    category: string;
    image: string;
    subject: string;
    startTime: Date;
    endTime: Date;
    numberOfStudent: number;
    duration: number;
    createdBy: string;
    createdAt: Date;
}

const initialState: IUserState = {
  courses: []
};

export const courseSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addCourse: (state, action) => {
        console.log('payload')
        console.log(action.payload)
        state.courses = ([] as ICourse[]).concat(state.courses, action.payload)
    }
  },
  extraReducers: (builder) => {},
});

export const {addCourse} = courseSlice.actions


export default courseSlice.reducer