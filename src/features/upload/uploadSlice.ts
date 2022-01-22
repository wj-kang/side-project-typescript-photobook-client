import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImageFile {
  slot: 1 | 2 | 3;
  file: Blob;
}

export interface UploadState {
  firstImg: Blob | string;
  secondImg: Blob | string;
  thirdImg: Blob | string;
  text: string;
  status: 'loading' | 'succeeded' | 'failed' | undefined;
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
});

export const { addImage, onChangeTextarea, resetUploadState } = uploadSlice.actions;
export default uploadSlice.reducer;
