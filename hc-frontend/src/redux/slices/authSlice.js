// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3020/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      let data= await response.json();
      return data?.user; 
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Async thunk to handle login API call
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, { rejectWithValue}) => {
    try {
      const response = await fetch("http://localhost:3020/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to register. Please try again.');
      }
      let {data} = await response.json();
      return data?.user || 'sucessfully logged in';
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    profile: null,
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.serverError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        //state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        //localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.serverError = action.payload;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.serverError = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.profile = action.payload;
        //state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        //localStorage.setItem('token', action.payload.token);
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.serverError = action.payload;
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
