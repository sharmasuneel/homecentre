// src/features/filtersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, queryProducts } from '../../utils/services';

export const fetchAllProducts = createAsyncThunk(
  'filters/fetchProducts',
  async () => {
    const data = await fetchProducts();
    return data.products;
  }
);

export const applyFilters = createAsyncThunk(
  'filters/queryProducts',
  async (filters) => {
    const data = await queryProducts(filters);
    return data;
  }
);

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    products: [],
    filteredProducts: [],
    selectedFilters: {
      brand: [],
      categories: [],
      price: { min: null, max: null },
      review: [],
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    updateFilters(state, action) {
      state.selectedFilters = { ...state.selectedFilters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(applyFilters.fulfilled, (state, action) => {
        state.filteredProducts = action.payload;
      });
  },
});

export const { updateFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
