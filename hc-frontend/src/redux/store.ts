import { configureStore } from '@reduxjs/toolkit';
import AppReducer from './slices/AppSlice'
import  CartReducer  from './slices/CartSlice';
import filtersReducer from './slices/filtersSlice';

// Create the store with slices
const store = configureStore({
  reducer: {
    app: AppReducer,
    Cart: CartReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


