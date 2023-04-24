import { createSlice } from "@reduxjs/toolkit";

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
            // console.log(newItem);
            const existingItem = state.cartItems.find((item) => (item.id === newItem.id) && (item.size=== newItem.size) && (item.color == newItem.color));

            console.log(existingItem);
            // console.log("newitem",newItem);

            // state.totalQuantity++;

            const price = newItem.discountPrice == 0 ? newItem.sellingPrice : newItem.discountPrice;

            if (!existingItem) {
                // console.log("1");
                state.cartItems.push({
                    id: newItem.id,
                    productName: newItem.productName,
                    productThumbnail: newItem.productThumbnail,
                    sellingPrice: newItem.sellingPrice,
                    discountPrice: newItem.discountPrice,
                    size: newItem.size,
                    color: newItem.color,
                    quantity: newItem.quantity || 1,
                    totalPrice: price,
                })
            } else {
                existingItem.quantity = existingItem.quantity + newItem.quantity;
                existingItem.totalPrice = existingItem.totalPrice + price;
            }
            state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.cartItems.reduce((total, item) => total + item.totalPrice, 0);

            setItem(state.cartItems.map((item) => item), state.totalAmount, state.totalQuantity);
        },
        reduceItem(state, action) {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);

            // state.totalQuantity--;

            if (existingItem.quantity === 1) {
                state.cartItems = state.cartItems.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
                const price = existingItem.discountPrice == 0 ? existingItem.sellingPrice : existingItem.discountPrice;
                existingItem.totalPrice = existingItem.totalPrice - price;
            }

            state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.cartItems.reduce((total, item) => total + item.totalPrice, 0);

            setItem(state.cartItems.map((item) => item), state.totalAmount, state.totalQuantity);
        },
        deleteItem(state,action) {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);

            if (existingItem) {
                state.cartItems = state.cartItems.filter((item) => item.id !== id);
                state.totalQuantity = state.totalQuantity - existingItem.quantity;
            }
            state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.cartItems.reduce((total, item) => total + item.totalPrice, 0);

            setItem(state.cartItems.map((item) => item), state.totalAmount, state.totalQuantity);
        }
    }
})

export const cartLocalactions = cartLocalSlice.actions;
const { reducer: cartLocalReducer } = cartLocalSlice;
export default cartLocalReducer;