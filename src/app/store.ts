import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import albumReducer from '../features/album/albumSlice';
import uploadReducer from '../features/upload/uploadSlice';
import userReducer from '../features/user/userSlice';
import albumListReducer from '../features/albumList/albumListSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    album: albumReducer,
    upload: uploadReducer,
    albumList: albumListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
