import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FAKE_DATA from './FAKE_DATE';
import { Thumbnails } from './gridListAPI';

export interface GridListState {
  allIds: number[];
  thumbnailById: Thumbnails;
  status: string | undefined;
  error: string | undefined;
}

const initialState: GridListState = {
  allIds: [],
  thumbnailById: {},
  status: undefined,
  error: undefined,
};

export const fetchGridList = createAsyncThunk('gridList/getData', async () => {
  const response = await FAKE_DATA;
  console.log(response);
  return response.gridList;
});

const gridListSlice = createSlice({
  name: 'gridList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGridList.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchGridList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allIds = action.payload.allIds;
        state.thumbnailById = action.payload.thumbnailById;
      })
      .addCase(fetchGridList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {} = gridListSlice.actions;
export default gridListSlice.reducer;
