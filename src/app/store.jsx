import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import stockReducer from "../features/stockSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' //? defaults to LOCALSTORAGE for web
// import storage from 'redux-persist/lib/storage/session' //? defaults to SESSİON for web
 
 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, authReducer) //! Kalıcı olmasını istediklerimizi burda birleştirip yazabiliriz.
 
const store = configureStore({
  reducer: {
    auth: persistedReducer,
    stock: stockReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store)
export default store;