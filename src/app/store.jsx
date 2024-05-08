import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import firmReducer from "../features/firmSlice";
import brandReducer from "../features/brandSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    getfirms : firmReducer,
    getbrands: brandReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
export default store;