import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import bannerReducer from "./bannerSlice";
import categoryReducer from "./CategorySlice";
import productReducer from "./productSlice";
import searchReducer from "./searchSlice";
import userReducer from "./userSlice";
import cartLocalReducer from "./cartLocalSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import ReportReducer from "./reportSlice";
import favoriteReducer from "./favoriteSlice";

const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    user: userReducer,
    banner: bannerReducer,
    search: searchReducer,
    favorite: favoriteReducer,
    cartLocal: cartLocalReducer,
    cart: cartReducer,
    order: orderReducer,
    report: ReportReducer,
}
const store = configureStore({
    reducer: rootReducer,
})

export default store;