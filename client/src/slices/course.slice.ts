import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface IUserState {
    courses: ICourse[],
    take: number;
    skip: number;
}

export interface ICourse {
    id: number;
    name: string;
    description: string;
    category: string;
    image: string;
    subject: string;
    startTime: string;
    endTime: string;
    numberOfStudent: number;
    duration: number;
    createdBy: string;
    createdAt: string;
}

const initialState: IUserState = {
  courses: [],
  take: 10,
  skip: 0,
};

export const courseSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addCourse: (state, action) => {
        state.courses = ([] as ICourse[]).concat(state.courses, action.payload)

        state.skip = state.skip + state.take
        console.log(state.skip)
    }
  },
  extraReducers: (builder) => {},
});

export const {addCourse} = courseSlice.actions

export const selectSkip = (state: RootState) => state.course.skip;


export default courseSlice.reducer