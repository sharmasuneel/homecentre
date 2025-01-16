// src/features/cart/CartSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Initial state for the cart
const initialState = {
};

// Creating the slice for the cart
const cartSlice = createSlice({
  name: 'cart', // Slice name
  initialState, // Initial state for the cart
  reducers: {
    addItem: () => {}
  },
});

// Export the actions generated by createSlice
export const {addItem} = cartSlice.actions;

// Export the reducer to be added to the store
export default cartSlice.reducer;
