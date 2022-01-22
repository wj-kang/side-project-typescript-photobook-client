import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import albumAPI from '../../apis/albumAPI';
import postAPI from '../../apis/postAPI';

interface PostThumbnails {
  [postId: string]: {
    postId: number;
    thumbnailUrl: string;
  };
}

export interface AlbumState {
  albumId: number | undefined;
  albumName: string | undefined;
  albumTag: string | undefined;
  postIds: number[];
  postThumbnailById: PostThumbnails;
  editModeOn: boolean;
  status: 'loading' | 'succeeded' | 'failed' | undefined;
  error: string | undefined;
}

const initialState: AlbumState = {
  albumId: undefined,
  albumName: undefined,
  albumTag: undefined,
  postIds: [],
  postThumbnailById: {},
  editModeOn: false,
  status: undefined,
  error: undefined,
};

export const fetchAlbum = createAsyncThunk('album/getData', async (albumTag: string) => {
  const response = await albumAPI.get(`/${albumTag}`);
  return response.data;
});

export const submitNewPost = createAsyncThunk('album/newpost', async (formData: FormData) => {
  const response = await postAPI.post('/new', formData, {
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  });
  return response.data;
});

export const deletePost = createAsyncThunk('album/delete', async (postId: number) => {
  await postAPI.delete(`/${postId}`);
  return postId;
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
      state.editModeOn = false;
      state.status = undefined;
      state.error = undefined;
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
      .addCase(deletePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.postIds = state.postIds.filter((id) => id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(submitNewPost.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(submitNewPost.fulfilled, (state, action: PayloadAction<{ postId: number; thumbnailUrl: string }>) => {
        const { postId, thumbnailUrl } = action.payload;
        state.postIds = [postId, ...state.postIds];
        state.postThumbnailById[postId] = { postId, thumbnailUrl };
        state.status = 'succeeded';
      })
      .addCase(submitNewPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
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

export const { resetAlbumState, toggleEditMode, setEditModeOff } = AlbumSlice.actions;
export default AlbumSlice.reducer;
