import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; 
import axios from 'axios';
import banner from '../assets/banner.jpg';
import Highlight from '../components/Highlight'; 
import Destinations from '../components/Destinations'; 
import Footer from '../components/Footer';
import Promos from '../components/Promos'; 
import Categories from '../components/Categories'; 
import Activities from '../components/Activities'; 
import Banner from '../components/Banner';
import Gallery from '../components/Gallery';

const API_URL = 'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1'; // Base URL untuk API
const API_KEY = '24405e01-fbc1-45a5-9f5a-be13afcd757c'; // API Key untuk autentikasi

const LandingPage = () => {
  const [banners, setBanners] = useState([]); // State untuk menyimpan data banners
  const [promos, setPromos] = useState([]); // State untuk menyimpan data promos
  const [categories, setCategories] = useState([]); // State untuk menyimpan data categories
  const [activities, setActivities] = useState([]); // State untuk menyimpan data activities

  // Mengambil data dari API saat komponen pertama kali di-render
  useEffect(() => {
    axios.get(`${API_URL}/banners`, { headers: { apiKey: API_KEY } })
      .then(response => setBanners(response.data.data)) // Menyimpan data banners ke state
      .catch(error => console.error('Error fetching banners:', error)); // Error handling jika terjadi kesalahan saat mengambil data banners

    axios.get(`${API_URL}/promos`, { headers: { apiKey: API_KEY } })
      .then(response => setPromos(response.data.data)) // Menyimpan data promos ke state
      .catch(error => console.error('Error fetching promos:', error)); // Error handling jika terjadi kesalahan saat mengambil data promos

    axios.get(`${API_URL}/categories`, { headers: { apiKey: API_KEY } })
      .then(response => setCategories(response.data.data)) // Menyimpan data categories ke state
      .catch(error => console.error('Error fetching categories:', error)); // Error handling jika terjadi kesalahan saat mengambil data categories

    axios.get(`${API_URL}/activities`, { headers: { apiKey: API_KEY } })
      .then(response => setActivities(response.data.data)) // Menyimpan data activities ke state
      .catch(error => console.error('Error fetching activities:', error)); // Error handling jika terjadi kesalahan saat mengambil data activities
  }, []);

  return (
    <div>
      <Navbar /> {/* Navbar untuk navigasi utama */}
      <header className="font-league-spartan h-[480px] md:h-[600px] lg:h-[680px] bg-cover bg-center text-white flex items-center justify-start relative" 
        style={{ backgroundImage: `url(${banner})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blueText via-transparent to-transparent"></div>
        {/* Overlay untuk memberikan efek gradient pada header */}
        <div className="relative z-10 px-6 text-left md:pl-16 lg:pl-32">
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl lg:text-7xl font-lora">
            Spend your holiday
          </h1>
          <p className="mt-4 md:mt-6 lg:mt-10 text-base md:text-lg lg:text-[18px] max-w-md md:max-w-lg">
            We offer a variety of travel packages, from budget-friendly adventures to luxury getaways, ensuring an unforgettable experience for all types of travelers and preferences.
          </p>
          <button className="px-4 py-2 mt-4 text-sm font-semibold bg-white md:px-6 md:py-3 md:mt-6 md:text-base text-blueText rounded-xl hover:bg-blue-50">
            Explore Now
          </button>
        </div>
      </header>

      <Banner banners={banners} /> {/* Menampilkan komponen Banner dengan data yang diambil dari API */}
      <Destinations /> {/* Menampilkan komponen Destinations */}
      <Promos promos={promos} /> {/* Menampilkan komponen Promos dengan data yang diambil dari API */}
      <Categories categories={categories} /> {/* Menampilkan komponen Categories dengan data yang diambil dari API */}
      <Activities activities={activities} /> {/* Menampilkan komponen Activities dengan data yang diambil dari API */}
      <Gallery /> {/* Menampilkan galeri destinasi */}
      <Footer /> {/* Menampilkan footer halaman */}
    </div>
  );
};

export default LandingPage;