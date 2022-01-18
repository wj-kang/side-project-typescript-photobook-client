import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import postAPI from '../../apis/postAPI';

interface Photos {
  photo1: string;
  photo2: string;
  photo3: string;
}

export interface ContentState {
  photos: Photos;
  text: string;
  status: 'loading' | 'succeeded' | 'failed' | undefined;
  error: string | undefined;
}

const initialState: ContentState = {
  photos: {
    photo1: '',
    photo2: '',
    photo3: '',
  },
  text: '',
  status: undefined,
  error: undefined,
};

export const getContentData = createAsyncThunk('content/get', async (postId: number) => {
  const response = await postAPI.get(`/${postId}`);
  console.log(response.data);
  return response.data;
});

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getContentData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getContentData.fulfilled, (state, action: PayloadAction<{ photos: Photos; text: string }>) => {
        state.status = 'succeeded';
        const { photos, text } = action.payload;
        state.photos = photos;
        state.text = text;
      })
      .addCase(getContentData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {} = contentSlice.actions;
export default contentSlice.reducer;
