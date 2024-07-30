import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userDataReducer from '../slice/userDataSlice';
import addressReducer from '../slice/addressSlice';
import orderDetailsReducer from "../slice/orderDetailsSlice";

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

const rootReducer = combineReducers({
    userDetails: userDataReducer,
    address: addressReducer,
    orderDetails: orderDetailsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});


export const persistor = persistStore(store);