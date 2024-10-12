import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PromosTable from '../components/Promos/PromosTable';
import { useNavigate } from 'react-router-dom';
import BannersTable from '../components/Banners/BannersTable';
import ActivitiesTable from '../components/Activities/ActivitiesTable';
import UserList from '../components/Users/UserList';
import CategoriesTable from '../components/Categories/CategoriesTable';
import { FaHome, FaTag, FaUser, FaChartPie, FaImages, FaThList, FaBars, FaTimes } from 'react-icons/fa';
import tdLogo from '../assets/td-logo.png';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); // State untuk tab aktif
  const [user, setUser] = useState(null); // State untuk data user yang login
  const [totalPromos, setTotalPromos] = useState(0); // State untuk jumlah promo
  const [totalUsers, setTotalUsers] = useState(0); // State untuk jumlah user
  const [totalActivities, setTotalActivities] = useState(0); // State untuk jumlah aktivitas
  const [totalCategories, setTotalCategories] = useState(0); // State untuk jumlah kategori
  const [totalBanners, setTotalBanners] = useState(0); // State untuk jumlah banner
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk kontrol sidebar di layar mobile

  const apiKey = '24405e01-fbc1-45a5-9f5a-be13afcd757c';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiIxZDE0OWNhYy1iOWJhLTQyYTMtYWY3ZC00MGZjOTMzMmRjMTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY1NTc3Nzd9.XfJCJ1vUoRCuLst1Y1R2fnOAqA8cgHIvzsWkQQnYhpo';
  const navigate = useNavigate();

  useEffect(() => {
    // Fungsi untuk mengambil data dari API saat komponen di-load
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user', {
          headers: { apiKey, Authorization: `Bearer ${token}` },
        });
        setUser(userResponse.data.data); // Menyimpan data user yang login

        // Mengambil data promos, users, activities, categories, dan banners
        const promosResponse = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos', {
          headers: { apiKey, Authorization: `Bearer ${token}` },
        });
        setTotalPromos(promosResponse.data.data.length); // Menyimpan jumlah promo

        const usersResponse = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user', {
          headers: { apiKey, Authorization: `Bearer ${token}` },
        });
        setTotalUsers(usersResponse.data.data.length); // Menyimpan jumlah user

        const activitiesResponse = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities', {
          headers: { apiKey, Authorization: `Bearer ${token}` },
        });
        setTotalActivities(activitiesResponse.data.data.length); // Menyimpan jumlah aktivitas

        const categoriesResponse = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories', {
          headers: { apiKey, Authorization: `Bearer ${token}` },
        });
        setTotalCategories(categoriesResponse.data.data.length); // Menyimpan jumlah kategori

        const bannersResponse = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners', {
          headers: { apiKey, Authorization: `Bearer ${token}` },
        });
        setTotalBanners(bannersResponse.data.data.length); // Menyimpan jumlah banner
      } catch (error) {
        console.error('Error fetching data', error); // Error handling jika terjadi kesalahan pengambilan data
      }
    };

    fetchData(); // Memanggil fungsi fetchData
  }, [token, apiKey]);

  // Fungsi untuk merender konten berdasarkan tab yang dipilih
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-4 md:p-8">
            <h1 className="text-2xl font-bold md:text-3xl font-league-spartan">Hello 👋</h1>
            {/* Menampilkan statistik dashboard dengan kartu informasi */}
            <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {/* Kartu informasi Promo */}
              <div className="flex items-center p-4 space-x-4 text-center transition-transform transform bg-white shadow md:p-6 rounded-3xl hover:scale-105 hover:shadow-lg">
                <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
                  <FaTag className="text-xl text-blue-500 md:text-2xl" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold md:text-3xl font-league-spartan">{totalPromos}</h2>
                  <p className="text-gray-600">Promos</p>
                  <p className="text-sm font-bold text-green-500 md:text-base">+16% this month</p>
                </div>
              </div>
              {/* Kartu informasi User */}
              <div className="flex items-center p-4 space-x-4 text-center transition-transform transform bg-white shadow md:p-6 rounded-3xl hover:scale-105 hover:shadow-lg">
                <div className="flex-shrink-0 p-2 bg-green-100 rounded-full">
                  <FaUser className="text-xl text-green-500 md:text-2xl" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold md:text-3xl font-league-spartan">{totalUsers}</h2>
                  <p className="text-gray-600">Users</p>
                  <p className="text-sm font-bold text-red-500 md:text-base">-1% this month</p>
                </div>
              </div>
              {/* Kartu informasi Activities */}
              <div className="flex items-center p-4 space-x-4 text-center transition-transform transform bg-white shadow md:p-6 rounded-3xl hover:scale-105 hover:shadow-lg">
                <div className="flex-shrink-0 p-2 bg-orange-100 rounded-full">
                  <FaThList className="text-xl text-orange-500 md:text-2xl" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold md:text-3xl font-league-spartan">{totalActivities}</h2>
                  <p className="text-gray-600">Activities</p>
                </div>
              </div>
              {/* Kartu informasi Categories */}
              <div className="flex items-center p-4 space-x-4 text-center transition-transform transform bg-white shadow md:p-6 rounded-3xl hover:scale-105 hover:shadow-lg">
                <div className="flex-shrink-0 p-2 bg-yellow-100 rounded-full">
                  <FaImages className="text-xl text-yellow-500 md:text-2xl" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold md:text-3xl font-league-spartan">{totalCategories}</h2>
                  <p className="text-gray-600">Categories</p>
                </div>
              </div>
              {/* Kartu informasi Banners */}
              <div className="flex items-center p-4 space-x-4 text-center transition-transform transform bg-white shadow md:p-6 rounded-3xl hover:scale-105 hover:shadow-lg">
                <div className="flex-shrink-0 p-2 bg-pink-100 rounded-full">
                  <FaImages className="text-xl text-pink-500 md:text-2xl" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold md:text-3xl font-league-spartan">{totalBanners}</h2>
                  <p className="text-gray-600">Banners</p>
                </div>
              </div>
            </div>
          </div>
        );
      // Menampilkan tabel data sesuai tab yang dipilih
      case 'banner':
        return <BannersTable />;
      case 'promos':
        return <PromosTable />;
      case 'activities':
        return <ActivitiesTable />;
      case 'users':
        return <UserList />;
      case 'categories':
        return <CategoriesTable />;
      default:
        return null;
    }
  };

  // Mengatur kelas CSS untuk tab sidebar yang aktif
  const tabClass = (tab) =>
    `flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors duration-200 font-league-spartan ${
      activeTab === tab ? 'bg-mainBlue text-white' : 'text-greyText hover:bg-blue-100'
    }`;

  return (
    <div className="flex h-screen font-league-spartan">
      {/* Sidebar navigasi */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 transition-transform transform bg-white ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="flex flex-col items-center w-full h-full p-6 bg-white">
          <div className="mb-6 text-center">
            <img src={tdLogo} alt="Travel Day Logo" className="h-16 mx-auto mb-2" />
            <h2 className="text-[30px] font-bold text-blue-600">Dashboard</h2>
          </div>
          <nav className="flex flex-col w-full space-y-4">
            {/* Menampilkan tab navigasi sidebar */}
            <button className={tabClass('dashboard')} onClick={() => setActiveTab('dashboard')}>
              <FaChartPie /> <span>Dashboard</span>
            </button>
            <button className={tabClass('banner')} onClick={() => setActiveTab('banner')}>
              <FaImages /> <span>Banner</span>
            </button>
            <button className={tabClass('promos')} onClick={() => setActiveTab('promos')}>
              <FaTag /> <span>Promos</span>
            </button>
            <button className={tabClass('activities')} onClick={() => setActiveTab('activities')}>
              <FaThList /> <span>Activities</span>
            </button>
            <button className={tabClass('users')} onClick={() => setActiveTab('users')}>
              <FaUser /> <span>Users</span>
            </button>
            <button className={tabClass('categories')} onClick={() => setActiveTab('categories')}>
              <FaThList /> <span>Categories</span>
            </button>
          </nav>
          {/* Tombol kembali ke halaman Home */}
          <button
            className="flex items-center mt-auto mb-4 space-x-2 text-[16px] text-greyText hover:text-blue-600"
            onClick={() => navigate('/')}
          >
            <FaHome /> <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Konten utama dashboard */}
      <div className="flex-1 p-8 bg-blueBg">
        <button className="p-2 text-blue-600 md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        {renderContent()}
      </div>

      {/* Overlay untuk sidebar di layar mobile */}
      {isSidebarOpen && <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
    </div>
  );
};

export default Dashboard;