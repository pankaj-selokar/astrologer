// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './astrologersSlice';

const store = configureStore({
    reducer: {
        users: usersReducer,
    }
  });
export default store;