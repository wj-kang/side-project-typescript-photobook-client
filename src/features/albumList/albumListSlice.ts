import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AlbumInfos } from './albumListAPI';

export interface AlbumListState {
  albumIds: number[];
  albumInfoById: AlbumInfos;
  status: string | undefined;
  error: string | undefined;
}

const initialState: AlbumListState = {
  albumIds: [],
  albumInfoById: {},
  status: undefined,
  error: undefined,
};

export const fetchAlbumList = createAsyncThunk('albumList/getData', async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/album/list`);
  return response.data;
});

const AlbumSlice = createSlice({
  name: 'albumList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAlbumList.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(
        fetchAlbumList.fulfilled,
        (state, action: PayloadAction<{ albumIds: number[]; albumInfoById: AlbumInfos }>) => {
          state.status = 'succeeded';
          state.albumIds = action.payload.albumIds;
          state.albumInfoById = action.payload.albumInfoById;
        }
      )
      .addCase(fetchAlbumList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {} = AlbumSlice.actions;
export default AlbumSlice.reducer;
