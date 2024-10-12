import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaSignOutAlt, FaTachometerAlt, FaChevronDown } from 'react-icons/fa';
import travelDayLogo from '../assets/td-logo.png';
import Highlight from './Highlight';
import ModalProfile from './Profile/ModalProfile';

const Navbar = () => {
  // State untuk mengontrol status menu terbuka atau tertutup, data user, pesan toast, dan loading
  const [isOpen, setIsOpen] = useState(false); // Mengontrol toggle menu pada layar kecil
  const [user, setUser] = useState(null); // Menyimpan data user yang login
  const [message, setMessage] = useState(''); // Menyimpan pesan untuk notifikasi
  const [toastType, setToastType] = useState(''); // Menyimpan tipe toast (success, error, info)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // Menyimpan status dropdown profil
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // Menyimpan status modal profil
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    profileImage: null,
  });
  const [loading, setLoading] = useState(false); // Menyimpan status loading
  const navigate = useNavigate(); // Untuk navigasi antar halaman

  // Mengambil data user saat komponen pertama kali dimuat
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token yang disimpan:', token);
    if (token) {
      axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c'
        }
      }).then((response) => {
        setUser(response.data.data); // Menyimpan data user yang berhasil diambil
      }).catch((error) => {
        console.error('Error fetching user data:', error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login'); // Redirect ke halaman login jika token tidak valid
        }
      });
    }
  }, [navigate]);

  // Menampilkan pesan notifikasi selama 2 detik
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 2000); // Toast akan hilang setelah 2 detik
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleLoginClick = () => {
    navigate('/login'); // Navigasi ke halaman login
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token'); // Menghapus token dari local storage
    setUser(null); // Menghapus data user dari state
    setMessage('Logout sukses'); // Menampilkan pesan sukses logout
    setToastType('success');

    // Redirect ke halaman login setelah 2 detik
    setTimeout(() => {
      setMessage('');
      setToastType('info');
      setMessage('Redirecting to the login page..');
      setTimeout(() => {
        setMessage('');
        navigate('/login');
      }, 1000);
    }, 2000);
  };

  const handleDashboardClick = () => {
    setLoading(true); // Menampilkan animasi loading
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard'); // Navigasi ke halaman dashboard setelah 2 detik
    }, 2000);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Menampilkan atau menyembunyikan menu mobile
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen); // Menampilkan atau menyembunyikan dropdown profil
  };

  const refreshUserData = () => {
    // Mengambil ulang data user untuk pembaruan
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c'
        }
      }).then((response) => {
        setUser(response.data.data);
      }).catch((error) => {
        console.error('Error refreshing user data:', error);
      });
    }
  };

  return (
    <nav className="shadow-md bg-blueBg font-league-spartan">
      {/* Logo dan menu navigasi */}
      <div className="container flex items-center justify-between px-6 py-4 mx-auto md:px-12 lg:px-20">
        <div>
          <img src={travelDayLogo} alt="Travel Day Logo" className="w-24 h-auto" />
        </div>

        <div className="hidden space-x-8 text-lg md:flex text-blueText">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/destinations" className="hover:text-blue-600">Destinations</Link>
          <Link to="/promo" className="hover:text-blue-600">Promo</Link>
          <Link to="/category" className="hover:text-blue-600">Category</Link>
          <Link to="/activity" className="hover:text-blue-600">Activities</Link>
        </div>

        {/* User profile, login, dan tombol logout */}
        <div className="items-center hidden space-x-4 md:flex">
          {user ? (
            <div className="relative">
              {/* Menampilkan gambar profil user */}
              <div className="flex items-center cursor-pointer" onClick={toggleProfileMenu}>
                <img 
                  src={user.profilePictureUrl || 'https://via.placeholder.com/150'}  
                  alt="Profile" 
                  className="w-10 h-10 rounded-full"
                />
                <FaChevronDown className="ml-2 text-blueText" />
              </div>
              {/* Menu dropdown profil */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 z-50 w-48 mt-2 bg-white rounded-lg shadow-md">
                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="flex items-center w-full px-4 py-2 text-left text-blueText hover:bg-gray-100"
                  >
                    <FaUser className="mr-2" /> Profile
                  </button>
                  {user?.role === 'admin' && (
                    <button
                      onClick={handleDashboardClick}
                      className="flex items-center w-full px-4 py-2 text-left text-blueText hover:bg-gray-100"
                      disabled={loading}
                    >
                      <FaTachometerAlt className="mr-2" />
                      {loading ? 'Loading...' : 'Dashboard'}
                    </button>
                  )}
                  <button
                    onClick={handleLogoutClick}
                    className="flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="mr-2" /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={handleLoginClick}
              className="px-4 py-2 text-blue-600 bg-white rounded-full hover:bg-blue-100"
            >
              <i className="mr-2 fa fa-user"></i>
              Log in / Register
            </button>
          )}
        </div>

        {/* Tombol toggle untuk menu mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <i className="text-2xl fa fa-bars text-blueText"></i>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out transform ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="px-6 py-4 space-y-4 text-lg bg-blueBg text-blueText">
            <Link to="/" className="block hover:text-blue-600">Home</Link>
            <Link to="/destinations" className="block hover:text-blue-600">Destinations</Link>
            <Link to="/promo" className="block hover:text-blue-600">Promo</Link>
            <Link to="/category" className="block hover:text-blue-600">Category</Link>
            <Link to="/activity" className="block hover:text-blue-600">Activities</Link>
            {/* Profil user pada tampilan mobile */}
            {user && (
              <div className="flex flex-col items-center mt-4 space-y-2">
                <img
                  src={user.profilePictureUrl || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="w-16 h-16 rounded-full"
                />
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="flex items-center justify-center w-full px-4 py-2 bg-white rounded-full text-blueText hover:bg-blue-100"
                >
                  <FaUser className="mr-2" /> Profile
                </button>
                {user.role === 'admin' && (
                  <button
                    onClick={handleDashboardClick}
                    className="flex items-center justify-center w-full px-4 py-2 bg-white rounded-full text-blueText hover:bg-blue-100"
                    disabled={loading}
                  >
                    <FaTachometerAlt className="mr-2" />
                    {loading ? 'Loading...' : 'Dashboard'}
                  </button>
                )}
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center justify-center w-full px-4 py-2 text-red-600 bg-white rounded-full hover:bg-gray-100"
                >
                  <FaSignOutAlt className="mr-2" /> Log Out
                </button>
              </div>
            )}
          </div>
        </div>

      {/* Animasi loading ketika user diarahkan ke halaman lain */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
          <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Modal untuk update profil user */}
      <ModalProfile
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profileData={profileData}
        setProfileData={setProfileData}
        setUser={setUser}
        setMessage={setMessage}
        setToastType={setToastType}
        refreshUserData={refreshUserData}
      />

      {/* Toast Notifikasi */}
      {message && (
        <div
          className={`fixed top-4 right-4 flex items-center space-x-2 px-4 py-2 rounded-md shadow-lg z-50
            ${toastType === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' : ''}
            ${toastType === 'error' ? 'bg-red-100 border-l-4 border-red-500 text-red-700' : ''}
            ${toastType === 'info' ? 'bg-blue-100 border-l-4 border-blue-500 text-blue-700' : ''}
          `}
        >
          {toastType === 'success' && <span className="text-green-600">✔️</span>}
          {toastType === 'error' && <span className="text-red-600">❌</span>}
          {toastType === 'info' && <span className="text-blue-600">ℹ️</span>}
          <p>{message}</p>
          <button onClick={() => setMessage('')} className="ml-4 font-bold">X</button>
        </div>
      )}

      {/* Menampilkan komponen Highlight */}
      <Highlight isOpen={isOpen} />
    </nav>
  );
};

export default Navbar;