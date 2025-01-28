// src/features/registrationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated API call
export const registerUser = createAsyncThunk(
  'registration/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3020/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to register. Please try again.');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    user: null,
    isLoading: false,
    serverError: null,
    success: false,
  },
  reducers: {
    clearState: (state) => {
      state.user = null;
      state.isLoading = false;
      state.serverError = null;
      state.success = false;
    },
    clearError:(state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.serverError = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.serverError = action.payload;
        state.success = false;
      });
  },
});

export const { clearState, clearError } = registrationSlice.actions;

export default registrationSlice.reducer;

