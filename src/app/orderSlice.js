import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "../api/orderApi";
import { message } from "antd";

const convertDate = (stringDate) => {
    const date = new Date(stringDate);
    const dateTime = date.toLocaleString('default', { month: 'long' }) + " " + date.getDate() + ", " + date.getFullYear();

    return dateTime;
  }

export const getProvince = createAsyncThunk('order/getProvince', async (params) => await orderApi.getProvince(params));

export const createOrder = createAsyncThunk('order/createOrder', async (params) => await orderApi.createOrder(params));

export const getListOrder = createAsyncThunk('order/getListOrder', async (params) => await orderApi.getListOrder(params));

export const getAllOrder = createAsyncThunk('order/getAllOrder', async (params) => await orderApi.getAllOrder(params));

export const getOrderDetail = createAsyncThunk('order/getOrderDetail', async (id) => await orderApi.getOrderDetail(id));

export const updateStatus = createAsyncThunk('order/updateStatus', async (params) => await orderApi.changeStatus(params));

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
        buider.addCase(getListOrder.rejected, (state, action) => {
            // state.current = {};
        });
        buider.addCase(getListOrder.fulfilled, (state, action) => {
            state.listOrder = action.payload || null;
        });
        buider.addCase(getAllOrder.rejected, (state, action) => {
            // state.current = {};
        });
        buider.addCase(getAllOrder.fulfilled, (state, action) => {
            const list = [];
            action.payload.data && action.payload.data.map((item, index) => {
                const totalPrice = item.orderDetail.reduce((total, item) => total + item.price, 0) || 0;
                
                list.push({
                    id: item.id,
                    status: item.status,
                    date: convertDate(item.created_at),
                    totalPrice: totalPrice,
                    name: item.shipping.fullName,
                    phone: item.shipping.phone,
                    address: item.shipping.address + ", " + item.shipping.ward + ", " + item.shipping.district + ", " + item.shipping.province
                });
            })
            state.allOrder = list;
        });
        buider.addCase(getOrderDetail.rejected, (state, action) => {
            // state.current = {};
        });
        buider.addCase(getOrderDetail.fulfilled, (state, action) => {
            state.orderDetail = action.payload.data || null;
            if(action.payload.data.ordersDetail) {
                state.totalPrice = action.payload.data.ordersDetail.reduce((total, item) => total + item.price, 0) || 0;
            }
        });
        buider.addCase(updateStatus.fulfilled, (state, action) => {
            // state.listOrder = action.payload || null;
        });
        buider.addCase(updateStatus.rejected, (state, action) => {
            // state.current = {};
        });
    }
})

const { reducer: orderReducer } = userSlice;
export default orderReducer;