import { configureStore } from '@reduxjs/toolkit';
import  CartReducer  from './slices/CartSlice';
import filtersReducer from '../redux/slices/filtersSlice';
import authReducer from '../redux/slices/authSlice';
import registrationReducer from '../redux/slices/registrationSlice';
// Create the store with slices
const store = configureStore({
  reducer: {
    Cart: CartReducer,
    filters: filtersReducer,
    auth: authReducer,
    registration: registrationReducer
  },
});

export default store;


