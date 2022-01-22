import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import albumAPI from '../../apis/albumAPI';

type AlbumInfo = {
  albumId: number;
  albumTag: string;
  albumName: string | null;
  thumbnailUrl: string;
  count: number;
};

type AlbumInfos = {
  [albumId: number]: AlbumInfo;
};

export interface AlbumListState {
  albumIds: number[];
  albumInfoById: AlbumInfos;
  editModeOn: boolean;
  status: 'loading' | 'succeeded' | 'failed' | undefined;
  error: string | undefined;
}

const initialState: AlbumListState = {
  albumIds: [],
  albumInfoById: {},
  editModeOn: false,
  status: undefined,
  error: undefined,
};

export const createNewAlbum = createAsyncThunk('albumList/newAlbum', async (name: string) => {
  const res = await albumAPI.post('/new', { albumName: name });
  return res.data;
});

export const fetchAlbumList = createAsyncThunk('albumList/getData', async () => {
  const response = await albumAPI.get(`/list`);
  return response.data;
});

export const deleteAlbum = createAsyncThunk('albumList/delete', async (albumId: number) => {
  await albumAPI.delete(`/${albumId}`);
  return albumId;
});

export const editAlbumName = createAsyncThunk(
  'albumList/edit',
  async (args: { albumId: number; albumName: string }) => {
    const { albumId, albumName } = args;
    await albumAPI.patch(`/${albumId}`, { albumName });
    return { albumId, albumName };
  }
);

const AlbumSlice = createSlice({
  name: 'albumList',
  initialState,
  reducers: {
    toggleEditMode(state) {
      state.editModeOn = !state.editModeOn;
    },
    setEditModeOff(state) {
      state.editModeOn = false;
    },
    setSpinner(state, action: PayloadAction<'loading' | undefined>) {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(editAlbumName.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editAlbumName.fulfilled, (state, action: PayloadAction<{ albumId: number; albumName: string }>) => {
        const { albumId, albumName } = action.payload;
        state.status = 'succeeded';
        state.albumInfoById[albumId].albumName = albumName;
        state.editModeOn = false;
      })
      .addCase(editAlbumName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteAlbum.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAlbum.fulfilled, (state, action: PayloadAction<number>) => {
        const albumId = action.payload;
        state.status = 'succeeded';
        state.albumIds = state.albumIds.filter((id) => id !== albumId);
      })
      .addCase(deleteAlbum.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createNewAlbum.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createNewAlbum.fulfilled, (state, action: PayloadAction<AlbumInfo>) => {
        const { albumId, albumTag, albumName, thumbnailUrl, count } = action.payload;
        state.status = 'succeeded';
        state.albumIds = [albumId, ...state.albumIds];
        state.albumInfoById[albumId] = { albumId, albumTag, albumName, thumbnailUrl, count };
      })
      .addCase(createNewAlbum.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
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

export const { setSpinner, toggleEditMode, setEditModeOff } = AlbumSlice.actions;
export default AlbumSlice.reducer;
