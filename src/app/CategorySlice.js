import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from '../api/categoryApi';

export const getListCategory = createAsyncThunk(
  'category/getListCategory',
  async (params) => await categoryApi.getCategories(params),
);

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (params) => await categoryApi.createCategory(params),
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ id, formData }, thunkAPI) => await categoryApi.updateCategory({ id, formData }),
);

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id) => await categoryApi.deleteCategory(id),
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    current: null,
  },
  reducers: {},
  extraReducers: (buider) => {
    buider.addCase(getListCategory.fulfilled, (state, action) => {
      state.current = action.payload || [];
    });
    buider.addCase(getListCategory.rejected, (state, action) => {
      state.current = null;
    });
    buider.addCase(createCategory.rejected, (state, action) => {
      // state.current = {};
    });
    buider.addCase(createCategory.fulfilled, (state, action) => {
      // state.current = {};
    });
    buider.addCase(updateCategory.rejected, (state, action) => {
      // state.current = {};
    });
    buider.addCase(updateCategory.fulfilled, (state, action) => {
      // state.current = {};
    });
    buider.addCase(deleteCategory.rejected, (state, action) => {
      // state.current = {};
    });
    buider.addCase(deleteCategory.fulfilled, (state, action) => {
      // state.current = {};
    });
  },
});

const { reducer: categoryReducer } = categorySlice;
export default categoryReducer;
