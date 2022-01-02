import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ImageFile } from './uploadAPI';

export interface UploadState {
  firstImg: Blob | null;
  secondImg: Blob | null;
  thirdImg: Blob | null;
  text: string;

  status: string | undefined;
  error: string | undefined;
}

const initialState: UploadState = {
  firstImg: null,
  secondImg: null,
  thirdImg: null,
  text: '',
  status: undefined,
  error: undefined,
};

export const submitNewPost = createAsyncThunk('upload/submit', async () => {
  const response = await 'something';
  return response;
});

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    addImage(state, action: PayloadAction<ImageFile>) {
      const { slot, file } = action.payload;
      if (!state.firstImg || slot === 1) {
        state.firstImg = file;
      } else if (!state.secondImg || slot === 2) {
        state.secondImg = file;
      } else {
        state.thirdImg = file;
      }
    },
    onChangeTextarea(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    resetState(state, action) {
      state = initialState;
    },
  },
  extraReducers(builder) {},
});

export const { addImage, onChangeTextarea, resetState } = uploadSlice.actions;
export default uploadSlice.reducer;
