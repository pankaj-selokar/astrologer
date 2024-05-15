// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../apiSlice';

const store = configureStore({
  reducer: {
    users: userSlice,
  }  
});

export default store;
