import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartApi from "../api/cartApi";

export const getListCart = createAsyncThunk('cart/getListCart', async (params) => await cartApi.getListCart(params));

export const addActiveCart = createAsyncThunk('cart/addActiveCart', async (params) => await cartApi.addCart(params));

export const deleteCart = createAsyncThunk('cart/deleteCart', async (id) => await cartApi.deleteCart(id));

export const updateCart = createAsyncThunk('cart/updateCart', async ({id, params}) => await cartApi.updateCart({id, params}));

const userSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        totalQuantity: 0,
        totalAmount: 0,
    },
    reducers: {

    },
    extraReducers: (buider) => {
        buider.addCase(getListCart.fulfilled, (state, action) => {
            const cart = [];
            action.payload.data && action.payload.data.map((item, index) => {
                cart.push({
                    id: item.id,
                    productId: item.productId,
                    productName: item.products.productName,
                    productThumbnail: item.products.productThumbnail,
                    sellingPrice: item.products.sellingPrice,
                    discountPrice: item.products.discountPrice,
                    size: item.productSize,
                    color: item.productColor,
                    quantity: item.quantity,
                    subTotal: item.quantity * (item.products.discountPrice == 0 ? item.products.sellingPrice : item.products.discountPrice)
                    // subTotal: item.subTotal,
                })
            })
            state.cartItems = cart;
            state.totalQuantity = action.payload.data.reduce((total, item) => total + item.quantity, 0) || 0;
            state.totalAmount = cart.reduce((total, item) => total + item.subTotal, 0) || 0;
        });
        buider.addCase(getListCart.rejected, (state, action) => {
            // state.current = null;
        });
        buider.addCase(addActiveCart.rejected, (state, action) => {
            // state.current = {};
        });
        buider.addCase(addActiveCart.fulfilled, (state, action) => {
            // state.current = {};
        });
        buider.addCase(deleteCart.rejected, (state, action) => {
            // state.current = {};
        });
        buider.addCase(deleteCart.fulfilled, (state, action) => {
            // state.current = {};
        });
        buider.addCase(updateCart.rejected, (state, action) => {
            // state.current = {};
        });
        buider.addCase(updateCart.fulfilled, (state, action) => {
            // state.current = {};
        });
    }
})

const { reducer: cartReducer } = userSlice;
export default cartReducer;