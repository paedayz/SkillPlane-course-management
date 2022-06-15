import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../slices/user.slice'
import courseReducer from '../slices/course.slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    course: courseReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
