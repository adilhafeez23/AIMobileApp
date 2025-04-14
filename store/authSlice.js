// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    signOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { signInSuccess, signOut } = authSlice.actions;
export default authSlice.reducer;
