import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//initial state for the authentication slice
const initialState = {
  user: null, 
  token: null, 
  loading: false, 
  error: null, 
  mode: "dark", 
};

// Async action to handle user login
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
  try {
  
    const response = await axios.post('/auth/login', credentials);

    // Return the user data and token if login is successful
    return response.data;
  } catch (error) {
    // If login fails, Axios will throw an error, and we can handle it here
    throw error.response.data;
  }
});

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to log the user out
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
    // Action to toggle between light and dark mode
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the login action
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; 
        state.token = action.payload.token; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed.';
      });
  },
});

// Export actions and reducer
export const { logoutUser, setMode } = authSlice.actions;
export default authSlice.reducer;
