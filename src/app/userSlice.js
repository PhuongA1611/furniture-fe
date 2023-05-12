import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";

export const getListUser = createAsyncThunk('user/getListUser', async (params) => await userApi.getUsers(params));

export const updateUser = createAsyncThunk('user/updateUser', async ({userId, params}) => await userApi.updateUser({userId, params}));

export const getListShipping = createAsyncThunk('user/getListShipping', async (userId) => await userApi.getShipping(userId));

export const createShipping = createAsyncThunk('user/createShipping', async ({userId, params}) => await userApi.createShipping({userId, params}));

export const updateShipping = createAsyncThunk('user/updateShipping', async ({id, params}) => await userApi.updateShipping({id, params}));

export const deleteShipping = createAsyncThunk('user/deleteShipping', async (id) => await userApi.deleteShipping(id));

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: null,
        shipping: null,
    },
    reducers: {

    },
    extraReducers: (buider) => {
        buider.addCase(getListUser.fulfilled, (state, action) => {
            state.current = action.payload || [];
        });
        buider.addCase(getListUser.rejected, (state, action) => {
            state.current = null;
        });
        buider.addCase(updateUser.fulfilled, (state, action) => {
            // state.current = action.payload || [];
        });
        buider.addCase(updateUser.rejected, (state, action) => {
            // state.current = null;
        });
        buider.addCase(getListShipping.rejected, (state, action) => {
            state.shipping = null;
        });
        buider.addCase(getListShipping.fulfilled, (state, action) => {
            state.shipping = action.payload.data || [];
        });
        buider.addCase(createShipping.rejected, (state, action) => {
            // state.shipping = null;
        });
        buider.addCase(createShipping.fulfilled, (state, action) => {
            // state.shipping = action.payload.data || [];
        });
        buider.addCase(updateShipping.rejected, (state, action) => {
            // state.shipping = null;
        });
        buider.addCase(updateShipping.fulfilled, (state, action) => {
            // state.shipping = action.payload.data || [];
        });
        buider.addCase(deleteShipping.rejected, (state, action) => {
            // state.shipping = null;
        });
        buider.addCase(deleteShipping.fulfilled, (state, action) => {
            // state.shipping = action.payload.data || [];
        });
    }
})

const { reducer: userReducer } = userSlice;
export default userReducer;