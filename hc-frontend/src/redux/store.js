import { configureStore } from '@reduxjs/toolkit';
import  CartReducer  from './slices/CartSlice';
import filtersReducer from '../redux/slices/filtersSlice';

// Create the store with slices
const store = configureStore({
  reducer: {
    Cart: CartReducer,
    filters: filtersReducer,
  },
});

export default store;


