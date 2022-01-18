import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PostThumbnails } from './albumAPI';
import axios from 'axios';

export interface AlbumState {
  albumId: number | undefined;
  albumName: string | undefined;
  albumTag: string | undefined;
  postIds: number[];
  postThumbnailById: PostThumbnails;
  status: string | undefined;
  error: string | undefined;
}

const initialState: AlbumState = {
  albumId: undefined,
  albumName: undefined,
  albumTag: undefined,
  postIds: [],
  postThumbnailById: {},
  status: undefined,
  error: undefined,
};

export const fetchAlbum = createAsyncThunk('album/getData', async (albumId: number) => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/album/${albumId}`);
  return response.data;
});

const AlbumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    resetAlbumState(state) {
      state.albumId = undefined;
      state.albumName = undefined;
      state.albumTag = undefined;
      state.postIds = [];
      state.postThumbnailById = {};
      state.status = undefined;
      state.error = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAlbum.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAlbum.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.albumId = action.payload.albumId;
        state.albumTag = action.payload.albumTag;
        state.albumName = action.payload.albumName;
        state.postIds = action.payload.postIds;
        state.postThumbnailById = action.payload.postThumbnailById;
      })
      .addCase(fetchAlbum.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetAlbumState } = AlbumSlice.actions;
export default AlbumSlice.reducer;
