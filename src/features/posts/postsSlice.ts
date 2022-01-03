import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FAKE_DATA from './FAKE_DATE';
import { Thumbnails } from './postsAPI';

export interface PostsState {
  allIds: number[];
  thumbnailById: Thumbnails;
  status: string | undefined;
  error: string | undefined;
}

const initialState: PostsState = {
  allIds: [],
  thumbnailById: {},
  status: undefined,
  error: undefined,
};

export const fetchPosts = createAsyncThunk('posts/getData', async () => {
  const response = await FAKE_DATA;
  console.log(response);
  return response.posts;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allIds = action.payload.allIds;
        state.thumbnailById = action.payload.thumbnailById;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {} = postsSlice.actions;
export default postsSlice.reducer;
