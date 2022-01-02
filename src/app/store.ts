import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gridListReducer from '../features/gridList/gridListSlice';
import uploadReducer from '../features/upload/uploadSlice';

export const store = configureStore({
  reducer: {
    gridList: gridListReducer,
    upload: uploadReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
