import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  type: 'GOOGLE' | 'GITHUB' | 'GUEST' | undefined;
  email: string;
  username: string;
  thumbnail: string;
}

const initialState: UserState = {
  type: undefined,
  email: '',
  username: '',
  thumbnail: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSignInSuccess(state, action: PayloadAction<UserState>) {
      const { type, email, username, thumbnail } = action.payload;
      state.type = type;
      state.email = email;
      state.username = username;
      state.thumbnail = thumbnail;
    },
    userLogout(state) {
      state = {
        type: undefined,
        email: '',
        username: '',
        thumbnail: '',
      };
    },
  },
});

export const { userSignInSuccess, userLogout } = userSlice.actions;
export default userSlice.reducer;
