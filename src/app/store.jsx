import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import firmReducer from "../features/firmSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    getfirms : firmReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
export default store;