// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { saveUserData, userSlice } from "../slice/userDataSlice";

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// }

// const reducer: any = combineReducers({
//   getUserDetails: saveUserData,
// });

// const persistedReducer = persistReducer(persistConfig, reducer)

// export const store = configureStore({
//   reducer: persistedReducer
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import saveUserDataReducer from '../slice/userDataSlice';

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

const rootReducer: any = combineReducers({
    userDetails: saveUserDataReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});


export const persistor = persistStore(store);