import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
      console.log("addCourse >>>> ", action.payload);
      state.courses = ([] as ICourse[]).concat(state.courses, action.payload);
      state.skip = state.skip + state.take;
    },
    createdCourse: (state, action) => {
      console.log("addCourse >>>> ", action.payload);
      state.courses = ([] as ICourse[]).concat([action.payload], state.courses);
    },
    resetBeforeQueryGet: (state) => {
      state.skip = 0;
      state.courses = [];
    },
    setQueryParams: (state, action) => {
      console.log("setQueryParams >>> ", action.payload);
      state.take = action.payload.take | state.take;
      state.skip = action.payload.skip | state.skip;
      state.keyword = action.payload.keyword;
      state.minDuration = action.payload.minDuration;
      state.maxDuration = action.payload.maxDuration;

      const queryKeyword =
        action.payload.keyword !== undefined
          ? `keyword=${action.payload.keyword}`
          : "";

      const queryMinDuration =
        action.payload.minDuration !== undefined
          ? `minDuration=${action.payload.minDuration}`
          : "";

      const queryMaxDuration =
        action.payload.maxDuration !== undefined
          ? `maxDuration=${action.payload.maxDuration}`
          : "";

      let queryString = "?";
      let count = 0;
      let buffArr = [queryKeyword, queryMinDuration, queryMaxDuration];

      for (let index in buffArr) {
        let query = buffArr[index];
        if (query !== "" && count == 0) {
          queryString += query;
          count++;
        } else if (query !== "") {
          queryString += `&${query}`;
          count++;
        }
      }

      console.log(queryString.length > 1 ? queryString : undefined);

      window.history.replaceState({}, "", queryString);
    },
    setInitialLoading: (state, action) => {
      state.initialLoading = action.payload;
    },
    setPaginationLoading: (state, action) => {
      state.paginationLoading = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  addCourse,
  createdCourse,
  resetBeforeQueryGet,
  setInitialLoading,
  setPaginationLoading,
  setQueryParams,
} = courseSlice.actions;

export const selectSkip = (state: RootState) => state.course.skip;

export default courseSlice.reducer;
