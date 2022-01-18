import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ImageFile } from './uploadAPI';

export interface UploadState {
  firstImg: Blob | string;
  secondImg: Blob | string;
  thirdImg: Blob | string;
  text: string;

  status: string | undefined;
  error: string | undefined;
}

const initialState: UploadState = {
  firstImg: '',
  secondImg: '',
  thirdImg: '',
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
    resetUploadState(state) {
      state.firstImg = '';
      state.secondImg = '';
      state.thirdImg = '';
      state.text = '';
      state.status = undefined;
      state.error = undefined;
    },
  },
  extraReducers(builder) {},
});

export const { addImage, onChangeTextarea, resetUploadState } = uploadSlice.actions;
export default uploadSlice.reducer;
