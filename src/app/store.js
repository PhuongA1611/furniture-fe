import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import bannerReducer from "./BannerSlice";
import categoryReducer from "./CategorySlice";
import productReducer from "./ProductSlice";
import searchReducer from "./SearchSlice";
import userReducer from "./UserSlice";
import cartLocalReducer from "./CartLocalSlice";
import cartReducer from "./CartSlice";
import orderReducer from "./OrderSlice";
import ReportReducer from "./ReportSlice";
import favoriteReducer from "./FavoriteSlice";

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