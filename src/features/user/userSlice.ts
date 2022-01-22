import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authAPI from '../../apis/authAPI';
import userAPI from '../../apis/userAPI';

export interface UserState {
  type: 'GOOGLE' | 'GITHUB' | 'GUEST' | undefined;
  email: string;
  status: 'loading' | 'succeeded' | 'failed' | undefined;
  error: string | undefined;
}

const initialState: UserState = {
  type: undefined,
  email: '',
  status: undefined,
  error: undefined,
};

export const getUserInfo = createAsyncThunk('user/info', async () => {
  const res = await userAPI.get('/');
  return res.data;
});

export const handleGuestEnter = createAsyncThunk('user/guest', async () => {
  const res = await authAPI.get('/guest');
  return res.data;
});

export const handleDeleteAccount = createAsyncThunk('user/delete', async () => {
  await userAPI.delete('/');
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserInfo.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.type = action.payload.type;
        state.email = action.payload.email;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(handleGuestEnter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleGuestEnter.fulfilled, (state, action: PayloadAction<{ thumbnail: string }>) => {
        state.type = 'GUEST';
        state.email = 'GUEST';
        state.status = 'succeeded';
      })
      .addCase(handleGuestEnter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(handleDeleteAccount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleDeleteAccount.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(handleDeleteAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
