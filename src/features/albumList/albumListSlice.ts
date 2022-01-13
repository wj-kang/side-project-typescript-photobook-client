import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AlbumInfos, AlbumInfo } from './albumListAPI';

export interface AlbumListState {
  albumIds: number[];
  albumInfoById: AlbumInfos;
  editModeOn: boolean;
  status: string | undefined;
  error: string | undefined;
}

const initialState: AlbumListState = {
  albumIds: [],
  albumInfoById: {},
  editModeOn: false,
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
  reducers: {
    addNewAlbum(state, action: PayloadAction<AlbumInfo>) {
      const { albumId, albumTag, albumName, thumbnailUrl, count } = action.payload;
      state.albumIds = [albumId, ...state.albumIds];
      state.albumInfoById[albumId] = {
        albumId,
        albumTag,
        albumName,
        thumbnailUrl,
        count,
      };
    },
    deleteAlbum(state, action: PayloadAction<{ albumId: number }>) {
      state.albumIds = state.albumIds.filter((id) => id !== action.payload.albumId);
      state.editModeOn = false;
    },
    editAlbumName(state, action: PayloadAction<{ albumId: number; albumName: string | null }>) {
      const { albumId, albumName } = action.payload;
      state.albumInfoById[albumId].albumName = albumName;
      state.editModeOn = false;
    },
    toggleEditMode(state) {
      state.editModeOn = !state.editModeOn;
    },
    setEditModeOff(state) {
      state.editModeOn = false;
    },
  },
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

export const { addNewAlbum, deleteAlbum, editAlbumName, toggleEditMode, setEditModeOff } = AlbumSlice.actions;
export default AlbumSlice.reducer;
