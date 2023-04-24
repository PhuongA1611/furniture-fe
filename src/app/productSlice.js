import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../api/productApi";

export const createProduct = createAsyncThunk('product/createProduct', async (params) => await productApi.createProduct(params));

export const getDetail = createAsyncThunk('product/getDetail', async (id, params) => await productApi.getDetail(id, params));

export const getListProducts = createAsyncThunk('product/getListProducts', async ( params ) => await productApi.getListProducts(params));

export const updateProduct = createAsyncThunk('product/updateProduct', async (id, params) => await productApi.updateProduct(id, params));

export const deleteProduct = createAsyncThunk('category/deleteProduct', async (id) => await productApi.deleteProduct(id));

const productSlice = createSlice({
    name: 'product',
    initialState: {
        current: {},
    },
    reducers: {

    },
    extraReducers: (buider) => {
        buider.addCase(getDetail.fulfilled, (state, action) => {
            state.current = action.payload || {};
        });
        buider.addCase(getDetail.rejected, (state, action) => {
            state.current = {};
        });
        buider.addCase(getListProducts.fulfilled, (state, action) => {
            state.list = action.payload || {};
        });
        buider.addCase(getListProducts.rejected, (state, action) => {
            state.list = {};
        });
        buider.addCase(createProduct.rejected, (state, action) => {
            // state.current = {};
        });
        buider.addCase(createProduct.fulfilled, (state, action) => {
            // state.current = {};
        });
        buider.addCase(updateProduct.rejected, (state, action) => {
            // state.current = {};
        });
        buider.addCase(updateProduct.fulfilled, (state, action) => {
            // state.current = {};
        });
        buider.addCase(deleteProduct.rejected, (state, action) => {
            // state.current = {};
        });
        buider.addCase(deleteProduct.fulfilled, (state, action) => {
            // state.current = {};
        });
    }
})

const { reducer: productReducer } = productSlice;
export default productReducer;