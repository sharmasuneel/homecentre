import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 'a', name: 'Product A', price: 20, quantity: 1 },
  { id: 'b', name: 'Product B', price: 15, quantity: 2 },
  { id: 'c', name: 'Product B', price: 15, quantity: 2 },
]

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      console.log(action)
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, item.quantity + action.payload.amount) }
          : item
      )
    },
    removeCartItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  }
});

export const { addCartItem, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;
