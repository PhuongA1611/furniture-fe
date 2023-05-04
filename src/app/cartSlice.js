import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartApi from "../api/cartApi";

export const getListCart = createAsyncThunk('cart/getListCart', async (params) => await cartApi.getListCart(params));

export const addActiveCart = createAsyncThunk('cart/addActiveCart', async (params) => await cartApi.addcart(params));

// export const deleteUser = createAsyncThunk('user/deleteuser', async (id) => userApi.deleteuser(id));

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
                    totalPrice: item.subTotal,
                })
            })
            state.cartItems = cart;
            state.totalQuantity = action.payload.data.reduce((total, item) => total + item.quantity, 0) || 0;
            state.totalAmount = action.payload.data.reduce((total, item) => total + item.subTotal, 0) || 0;
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
        // buider.addCase(deleteuser.rejected, (state, action) => {
        //     // state.current = {};
        // });
        // buider.addCase(deleteuser.fulfilled, (state, action) => {
        //     // state.current = {};
        // });
    }
})

const { reducer: cartReducer } = userSlice;
export default cartReducer;