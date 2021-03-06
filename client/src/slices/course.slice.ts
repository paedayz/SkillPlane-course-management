import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface IUserState {
  courses: ICourse[];
  take: number;
  skip: number;
  keyword: string | undefined;
  minDuration: number | undefined;
  maxDuration: number | undefined;
  initialLoading: boolean;
  paginationLoading: boolean;
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
  keyword: undefined,
  maxDuration: undefined,
  minDuration: undefined,
  initialLoading: false,
  paginationLoading: false,
};

export const courseSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.courses = ([] as ICourse[]).concat(state.courses, action.payload);
      state.skip = state.skip + state.take;
    },
    createdCourse: (state, action) => {
      state.courses = ([] as ICourse[]).concat([action.payload], state.courses);
    },
    deletedCourse: (state, action) => {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
    },
    resetBeforeQueryGet: (state) => {
      state.skip = 0;
      state.courses = [];
    },
    setQueryParams: (state, action) => {
      state.take = action.payload.take | state.take;
      state.skip = action.payload.skip | state.skip;
      state.keyword = action.payload.keyword;
      state.minDuration = action.payload.minDuration;
      state.maxDuration = action.payload.maxDuration;

      const queryKeyword = action.payload.keyword
        ? `keyword=${action.payload.keyword}`
        : "";

      const queryMinDuration = action.payload.minDuration
        ? `minDuration=${action.payload.minDuration}`
        : "";

      const queryMaxDuration = action.payload.maxDuration
        ? `maxDuration=${action.payload.maxDuration}`
        : "";

      let queryString = "?";
      let count = 0;
      let buffArr = [queryKeyword, queryMinDuration, queryMaxDuration];

      for (let index in buffArr) {
        let query = buffArr[index];
        if (query !== "" && count === 0) {
          queryString += query;
          count++;
        } else if (query !== "") {
          queryString += `&${query}`;
          count++;
        }
      }

      window.history.replaceState({}, "", queryString);
    },
    setInitialLoading: (state, action) => {
      state.initialLoading = action.payload;
    },
    setPaginationLoading: (state, action) => {
      state.paginationLoading = action.payload;
    },
    resetCourseSlice: (state) => {
      state.courses = [];
      state.skip = 0;
      state.maxDuration = undefined;
      state.minDuration = undefined;
      state.keyword = undefined;
      state.initialLoading = false;
      state.paginationLoading = false;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  addCourse,
  createdCourse,
  deletedCourse,
  resetBeforeQueryGet,
  setInitialLoading,
  setPaginationLoading,
  setQueryParams,
  resetCourseSlice,
} = courseSlice.actions;

export const selectSkip = (state: RootState) => state.course.skip;

export default courseSlice.reducer;
