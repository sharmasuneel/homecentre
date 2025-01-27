// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// Async thunk to handle login API call
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // const response = await axios.post('http://localhost:/login', {
      //   email,
      //   password
      // },
      // )
      const response = ''+email+password;
      alert(''+email+password)
      return response?.data || 'sucessfully logged in';
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    serverError: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.serverError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.serverError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.serverError = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
