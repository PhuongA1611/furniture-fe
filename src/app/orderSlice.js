import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "../api/orderApi";
import { message } from "antd";

// export const addorder = createAsyncThunk('category/addorder', async (params) => await orderApi.addorder(params));

export const getProvince = createAsyncThunk('order/getProvince', async (params) => await orderApi.getProvince(params));

export const createOrder = createAsyncThunk('order/createOrder', async (params) => await orderApi.createOrder(params));

const userSlice = createSlice({
    name: 'order',
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
        buider.addCase(createOrder.rejected, (state, action) => {
            // state.current = {};
        });
        buider.addCase(createOrder.fulfilled, (state, action) => {
            if (action.payload.data) {
                message.success("The product has been added to favorite!")
            }
        });
    }
})

const { reducer: orderReducer } = userSlice;
export default orderReducer;