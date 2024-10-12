import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate untuk redirect setelah login
import australia from '../assets/australia.jpg';
import tdLogo from '../assets/td-logo.png';

const Login = () => {
  const [email, setEmail] = useState(''); // State untuk menyimpan input email
  const [password, setPassword] = useState(''); // State untuk menyimpan input password
  const [token, setToken] = useState(localStorage.getItem('token') || ''); 
  const [message, setMessage] = useState(''); // State untuk pesan notifikasi
  const [toastType, setToastType] = useState(''); // State untuk tipe notifikasi (success, error, info)
  const [loading, setLoading] = useState(false);  // State untuk mengatur loading saat proses login

  const API_KEY = '24405e01-fbc1-45a5-9f5a-be13afcd757c'; // API Key untuk autentikasi
  const navigate = useNavigate();  // Untuk redirect setelah login

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit
    setLoading(true);  // Mulai loading saat submit
    try {
      const response = await axios.post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login',
        {
          email,
          password, // Mengirim email dan password ke API
        },
        {
          headers: {
            'apiKey': API_KEY, // Header API Key untuk autentikasi
          },
        }
      );
      
      const receivedToken = response.data.token; // Menerima token dari response
      setToken(receivedToken);
      setMessage('Login successful!'); // Menampilkan pesan sukses
      setToastType('success');

      // Ini untuk cek apakah token diterima dengan benar sebelum menyimpannya
      if (receivedToken) {
        // Menyimpan token di localStorage untuk sesi login
        localStorage.setItem('token', receivedToken);
        console.log('Token tersimpan di localStorage:', receivedToken);
      } else {
        console.error('Token tidak diterima');
      }

      // Menampilkan pesan loading selama 2 detik sebelum redirect
      setTimeout(() => {
        setMessage('Loading...');
        setToastType('info'); // Tampilkan pesan loading
      }, 2000);

      // Redirect ke halaman landing setelah 4 detik total (2 detik pertama untuk sukses, 2 detik untuk loading)
      setTimeout(() => {
        navigate('/');
      }, 4000);

    } catch (error) {
      setMessage('Login failed. Please check your email or password!'); // Menampilkan pesan error jika login gagal
      setToastType('error'); 
      setLoading(false);  // Set loading ke false jika terjadi error
      console.error('Error logging in:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen md:flex-row font-league-spartan">
      {/* Toast untuk Notification */}
      {message && (
        <div
          className={`fixed top-4 right-4 flex items-center space-x-2 px-4 py-2 rounded-md shadow-lg
            ${toastType === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' : ''}
            ${toastType === 'error' ? 'bg-red-100 border-l-4 border-red-500 text-red-700' : ''}
            ${toastType === 'info' ? 'bg-blue-100 border-l-4 border-blue-500 text-blue-700' : ''}  // Info untuk pesan loading
          `}
        >
          {/* Tipe pesan sesuai dengan status */}
          {toastType === 'success' && <span className="text-green-600">✔️</span>}
          {toastType === 'error' && <span className="text-red-600">❌</span>}
          {toastType === 'info' && <span className="text-blue-600">ℹ️</span>}
          <p>{message}</p>
          <button onClick={() => setMessage('')} className="ml-4 font-bold">X</button> {/* Tombol untuk menghapus pesan */}
        </div>
      )}

      {/* Image Section */}
      <div className="items-center justify-center hidden w-1/2 text-white bg-center bg-cover md:flex"
        style={{ backgroundImage: `url(${australia})` }}>
        {/* Background image untuk bagian kiri pada tampilan desktop */}
        <div className="px-10 text-center">
          <h1 className="text-5xl font-bold md:text-6xl">TRAVEL DAY</h1>
          <p className="mt-8 text-lg">From hidden gems to world-famous landmarks, we provide personalized travel plans and expert guidance, ensuring every journey is as enriching as it is memorable. Let Travel Day guide you to your next great adventure.</p>
        </div>
      </div>

      {/* Login Section */}
      <div className="flex flex-col justify-center w-full px-6 bg-white md:w-1/2 md:px-12">
        <div className="flex flex-col items-center justify-center pt-16 mb-6 md:pt-0">
          <img src={tdLogo} alt="Travel Day Logo" className="w-24 h-12 mb-6" /> 
          {/* Logo Travel Day */}
          <h1 className="text-4xl font-bold md:text-6xl text-mainBlue">Welcome</h1>
        </div>
        <h2 className="mb-6 text-lg text-center text-gray-500">Login with Email</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="relative flex items-center w-full md:w-[65%] mx-auto">
            <span className="absolute text-gray-400 left-4">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 pl-12 border rounded focus:outline-none focus:ring-2 focus:ring-mainBlue"
            />
          </div>

          {/* Password Field */}
          <div className="relative flex items-center w-full md:w-[65%] mx-auto">
            <span className="absolute text-gray-400 left-4">
              <i className="fas fa-lock"></i>
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-12 border rounded focus:outline-none focus:ring-2 focus:ring-mainBlue"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-mainBlue text-white py-3 px-6 rounded w-full md:w-[30%] mx-auto block font-bold hover:bg-blue-700 transition-all duration-300"
          >
            {loading ? 'Logging in...' : 'LOGIN'} {/* Menampilkan loading di button */}
          </button>
        </form>

        {/* Links */}
        <div className="mt-8 text-center">
          <Link to="/register" className="text-sm text-gray-500">Forgot your password?</Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Don't have an account? <Link to="/register" className="text-mainBlue">Register Now</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;