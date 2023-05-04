import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bannerApi from "../api/bannerApi";

export const getListBanner = createAsyncThunk('banner/getListBanner', async (params) => await bannerApi.getListBanner(params));

export const createBanner = createAsyncThunk('banner/createBanner', async (params) => await bannerApi.createBanner(params));

// export const deleteUser = createAsyncThunk('user/deleteuser', async (id) => userApi.deleteuser(id));

const userSlice = createSlice({
    name: 'banner',
    initialState: {
        current: null,
    },
    reducers: {

    },
    extraReducers: (buider) => {
        buider.addCase(getListBanner.fulfilled, (state, action) => {
            state.current = action.payload || [];
        });
        buider.addCase(getListBanner.rejected, (state, action) => {
            state.current = null;
        });
        buider.addCase(createBanner.rejected, (state, action) => {
            // state.current = {};
        });
        buider.addCase(createBanner.fulfilled, (state, action) => {
            // state.current = {};
        });
        // buider.addCase(deleteuser.rejected, (state, action) => {
        //     // state.current = {};
        // });
        // buider.addCase(deleteuser.fulfilled, (state, action) => {
        //     // state.current = {};
        // });
    }
})

const { reducer: bannerReducer } = userSlice;
export default bannerReducer;