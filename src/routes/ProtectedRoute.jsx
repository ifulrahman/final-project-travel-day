import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');  // Ambil token dari localStorage

  // Jika token tidak ada, redirect ke halaman login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Jika token ada, izinkan akses ke halaman yang dilindungi
  return children;
};

export default ProtectedRoute;