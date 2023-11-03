import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../api/productApi';

export const searchProduct = createAsyncThunk(
  'search/searchProduct',
  async (params) => await productApi.searchProducts(params),
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    current: {},
  },
  reducers: {},
  extraReducers: (buider) => {
    buider.addCase(searchProduct.fulfilled, (state, action) => {
      state.current = action.payload.data || {};
    });
    buider.addCase(searchProduct.rejected, (state, action) => {
      state.current = {};
    });
  },
});

const { reducer: searchReducer } = searchSlice;
export default searchReducer;
