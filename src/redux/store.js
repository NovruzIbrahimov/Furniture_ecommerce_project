import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import authReducer from "./slice/authSlice";
import loadingReducer from './slice/loadingSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    loading: loadingReducer,
  },
});

export default store;
