import { createSlice } from '@reduxjs/toolkit';

// Initial State untuk menyimpan informasi autentikasi
const initialState = {
  token: null, // Menyimpan token autentikasi pengguna setelah login
  user: null, // Menyimpan detail pengguna seperti role dan profileImageUrl setelah login
};

// Membuat slice autentikasi dengan Redux Toolkit
const authSlice = createSlice({
  name: 'auth', // Nama slice yang digunakan untuk autentikasi
  initialState, // State awal yang berisi token dan data user
  reducers: {
    // Reducer untuk mengatur state saat login berhasil
    loginSuccess: (state, action) => {
      state.token = action.payload.token; // Menyimpan token dari hasil login
      state.user = action.payload.user; // Menyimpan data user, seperti nama, email, dan lainnya
    },
    // Reducer untuk mengatur state saat logout berhasil
    logoutSuccess: (state) => {
      state.token = null; // Menghapus token saat logout
      state.user = null; // Menghapus data user saat logout
    },
  },
});

// Export action untuk digunakan di komponen atau thunks
export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;