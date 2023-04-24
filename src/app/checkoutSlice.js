import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import checkoutApi from "../api/checkoutApi";

// export const addcheckout = createAsyncThunk('category/addcheckout', async (params) => await checkoutApi.addcheckout(params));

export const getProvince = createAsyncThunk('category/getProvince', async (params) => await checkoutApi.getProvince(params));

const userSlice = createSlice({
    name: 'checkout',
    initialState: {
        current: null,
    },
    reducers: {

    },
    extraReducers: (buider) => {
        buider.addCase(getProvince.rejected, (state, action) => {
            // state.current = {};
        });
        buider.addCase(getProvince.fulfilled, (state, action) => {
            state.province = action.payload || null;
        });
    }
})

const { reducer: checkoutReducer } = userSlice;
export default checkoutReducer;