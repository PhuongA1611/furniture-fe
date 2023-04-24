import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import bannerReducer from "./bannerSlice";
import categoryReducer from "./CategorySlice";
import productReducer from "./productSlice";
import searchReducer from "./searchSlice";
import userReducer from "./UserSlice";
import cartLocalReducer from "./cartLocalSlice";
import FavoriteReducer from "./favoriteSlice";
import cartReducer from "./cartSlice";
import checkoutReducer from "./checkoutSlice";

const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    users: userReducer,
    banner: bannerReducer,
    search: searchReducer,
    favorite: FavoriteReducer,
    cartLocal: cartLocalReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
}
const store = configureStore({
    reducer: rootReducer,
})

export default store;