import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import favoriteApi from '../api/favoriteApi';
import { message } from 'antd';

export const addFavorite = createAsyncThunk(
  'favorite/addFavorite',
  async (params) => await favoriteApi.addFavorite(params),
);

export const deleteFavorite = createAsyncThunk(
  'favorite/deleteFavorite',
  async (params) => await favoriteApi.deleteFavorite(params),
);

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    current: null,
  },
  reducers: {},
  extraReducers: (buider) => {
    buider.addCase(addFavorite.rejected, (state, action) => {
      // state.current = {};
    });
    buider.addCase(addFavorite.fulfilled, (state, action) => {
      if (action.payload.data) {
        message.success('The product has been added to favorite!');
      }
    });
    buider.addCase(deleteFavorite.rejected, (state, action) => {
      // state.current = {};
    });
    buider.addCase(deleteFavorite.fulfilled, (state, action) => {
      // state.current = {};
    });
  },
});

const { reducer: favoriteReducer } = favoriteSlice;
export default favoriteReducer;
