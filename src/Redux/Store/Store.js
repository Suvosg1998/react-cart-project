import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../Slice/productsSlice";
import cartReducer from "../Slice/cartSlice";
import categoriesReducer from "../Slice/categoriesSlice";
import productDetailsReducer from "../Slice/productDetailsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    productDetails: productDetailsReducer,
  },
});

export default store;
