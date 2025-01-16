import { configureStore } from '@reduxjs/toolkit';
import { CartReducer } from './slices/CartSlice';

// Create the store with slices
const store = configureStore({
  reducer: {
    Cart: CartReducer
  },
});

export default store;
