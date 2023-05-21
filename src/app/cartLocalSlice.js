import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const items = localStorage.getItem("cartItems") !== null ? JSON.parse(localStorage.getItem("cartItems")) : [];

const totalAmount = localStorage.getItem("totalAmount") !== null ? JSON.parse(localStorage.getItem("totalAmount")) : 0;

const totalQuantity = localStorage.getItem("totalQuantity") !== null ? JSON.parse(localStorage.getItem("totalQuantity")) : 0;

const setItem = (item, totalAmount, totalQuantity) => {
    localStorage.setItem("cartItems", JSON.stringify(item));
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
}

const initialState = {
    cartItems: items,
    totalQuantity: totalQuantity,
    totalAmount: totalAmount,
}

const cartLocalSlice = createSlice({
    name: 'cartLocal',
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => (item.productId === newItem.productId) && (item.size === newItem.size) && (item.color === newItem.color));

            if (!existingItem) {
                state.cartItems.push({
                    ...newItem,
                    subTotal: newItem.discountPrice == 0 ? newItem.sellingPrice : newItem.discountPrice,
                })
            } else {
                console.log("new", newItem);
                existingItem.quantity = existingItem.quantity + newItem.quantity;
                existingItem.subTotal = existingItem.subTotal + (newItem.discountPrice == 0 ? newItem.sellingPrice : newItem.discountPrice);
            }
            state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.cartItems.reduce((total, item) => total + item.subTotal, 0);

            setItem(state.cartItems.map((item) => item), state.totalAmount, state.totalQuantity);
        },
        reduceItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => (item.productId === newItem.productId) && (item.size === newItem.size) && (item.color === newItem.color));

            if (existingItem) {
                if (existingItem.quantity === 1) {
                    state.cartItems = state.cartItems.filter((item) => item !== existingItem);
                } else {
                    existingItem.quantity--;
                    const price = existingItem.discountPrice == 0 ? existingItem.sellingPrice : existingItem.discountPrice;
                    existingItem.subTotal = existingItem.subTotal - price;
                }
            }

            state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.cartItems.reduce((total, item) => total + item.subTotal, 0);

            setItem(state.cartItems.map((item) => item), state.totalAmount, state.totalQuantity);
        },
        deleteItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => (item.productId === newItem.productId) && (item.size === newItem.size) && (item.color === newItem.color));

            if (existingItem) {
                state.cartItems = state.cartItems.filter((item) => item !== existingItem);
                state.totalQuantity = state.totalQuantity - existingItem.quantity;
            }
            state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.cartItems.reduce((total, item) => total + item.subTotal, 0);

            setItem(state.cartItems.map((item) => item), state.totalAmount, state.totalQuantity);
        }
    }
})

export const cartLocalactions = cartLocalSlice.actions;
const { reducer: cartLocalReducer } = cartLocalSlice;
export default cartLocalReducer;