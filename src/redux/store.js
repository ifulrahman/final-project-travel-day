import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

// Membuat store Redux untuk aplikasi
export const store = configureStore({
  reducer: {
    auth: authReducer, // Menambahkan reducer 'auth' dari authSlice untuk mengelola state autentikasi
  },
});