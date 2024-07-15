import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productReducer from './reducers/productSlice';
import productDetails from './reducers/GetProductDetails';
import cartProduct from './reducers/AddToCart';
import userReducer from './reducers/UserSlice';
import createProductReducer from './reducers/AdminSlice';
import profileReducer from './reducers/ProfileSlice';
import orderReducer from './reducers/OrderSlice';
import createUserReducer from './reducers/userSlice/CreateUser';
import UserLoginReducer from './reducers/userSlice/UserLogin';

// Configuration object for redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

// Wrapping the userLogin reducer with persistReducer
const persistedUserLoginReducer = persistReducer(persistConfig, UserLoginReducer);

const store = configureStore({
  reducer: {
    productSlice: productReducer,
    productDetailSlice: productDetails,
    cart: cartProduct,
    user: userReducer,
    product: createProductReducer,
    profile: profileReducer,
    order: orderReducer,
    createUser: createUserReducer,
    userLogin: persistedUserLoginReducer, // Use the persisted reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      // Ignore these field paths in all actions
      ignoredActionPaths: ['meta.arg', 'payload.register', 'payload.rehydrate'],
      // Ignore these paths in the state
      ignoredPaths: ['register', 'rehydrate']
    }
  })
});

const persistor = persistStore(store);

export { store, persistor };
