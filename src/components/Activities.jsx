import React, { useState, useEffect } from 'react';
import Slider from 'react-slick'; // Import Slider dari 'react-slick' untuk membuat tampilan slide
import { FaShoppingCart } from 'react-icons/fa';
import DetailsActivitiesModal from '../components/Activities/DetailsActivitiesModal'; // Import Modal Detail
import AddToCartModal from '../components/Cart/AddToCartModal'; // Import AddToCartModal
import axios from 'axios';

// Komponen Activities untuk menampilkan daftar aktivitas dalam bentuk slider
const Activities = ({ activities }) => {
  const [selectedActivity, setSelectedActivity] = useState(null); // State untuk aktivitas yang dipilih
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk mengatur modal
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false); // State untuk AddToCartModal
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(''); // State untuk toast message
  const [toastType, setToastType] = useState(''); // State untuk toast type (success or error)

  const apiKey = '24405e01-fbc1-45a5-9f5a-be13afcd757c';
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user', {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey,
          },
        });
        setUser(response.data.data); 
        setIsLoading(false); 
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false); 
      }
    };

    fetchUserData();
  }, [token]);

  const settings = {
    dots: true, // Tampilkan titik navigasi di bawah slider
    infinite: true, // Slide akan terus berputar tanpa akhir
    speed: 500, // Kecepatan transisi slide
    slidesToShow: 4, // Tampilkan 4 slide pada layar besar
    slidesToScroll: 1, // Scroll satu slide setiap kali
    autoplay: true, // Aktifkan fitur autoplay
    autoplaySpeed: 3000, // Interval waktu autoplay (3 detik)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Tampilkan 3 slide pada layar menengah
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Tampilkan 2 slide pada layar kecil
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Tampilkan 1 slide pada layar sangat kecil
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Fungsi untuk memotong teks deskripsi jika lebih panjang dari maxLength
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Fungsi untuk membuka modal detail
  const handleDetailsClick = (activity) => {
    setSelectedActivity(activity); // Menyimpan aktivitas yang dipilih
    setIsModalOpen(true); // Membuka modal
  };

  const handleAddToCart = (activity) => {
    setSelectedActivity(activity);
    setIsAddToCartModalOpen(true); // Open modal
  };

  const confirmAddToCart = async () => {
    try {
      await axios.post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/add-cart',
        { activityId: selectedActivity.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey,
          },
        }
      );
      // Set message and toast type for success
      setMessage('Activity added to cart!');
      setToastType('success');
      setIsAddToCartModalOpen(false); // Close modal setelah confirmation
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Set message and toast type for error
      setMessage('Failed to add activity to cart');
      setToastType('error');
      setIsAddToCartModalOpen(false); // Close modal even if there's an error
    }

    // Hide the toast after 3 seconds
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const cancelAddToCart = () => {
    setIsAddToCartModalOpen(false); // Close modal on cancel
  };

  if (isLoading) {
    return <p>Loading activities...</p>;
  }

  return (
    <section className="p-6 bg-white md:p-12 font-league-spartan pt-18 pb-28">
      {/* Judul latar belakang besar yang bersifat dekoratif */}
      <h2 className="text-[45px] md:text-[85px] font-extralight font-lora mb-[-10px] md:mb-[-30px] text-left text-blueText text-opacity-10 pl-6 md:pl-24">
        Activities
      </h2>
      {/* Judul utama untuk bagian ini */}
      <h2 className="text-[28px] md:text-[45px] font-lora font-semibold mb-4 md:mb-8 text-left text-blueText pl-6 md:pl-24">
        Our Activities
      </h2>

      <div className="px-4 md:px-24 pb-36">
        {/* Slider untuk menampilkan daftar aktivitas */}
        <Slider {...settings}>
          {activities.map((activity, index) => (
            <div key={index} className="p-4">
              <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                <img
                  src={activity.imageUrls[0]} // Menampilkan gambar utama dari aktivitas
                  alt={activity.title}
                  className="object-cover w-full h-56 md:h-64"
                />
                <div className="p-4">
                  {/* Judul dari aktivitas */}
                  <h3 className="text-lg font-semibold text-blueText">{activity.title}</h3>
                  {/* Deskripsi aktivitas yang dipersingkat */}
                  <p className="mt-2 text-gray-600">
                    {truncateText(activity.description, 60)} {/* Batasi deskripsi menjadi 60 karakter */}
                  </p>
                  <p className="mt-2">
                    <b>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(activity.price)}/ person</b>
                  </p>
                  {/* Tombol untuk melihat detail aktivitas */}
                  <button
                    className="px-4 py-2 mt-4 text-sm text-white rounded-full bg-mainBlue hover:bg-blue-600"
                    onClick={() => handleDetailsClick(activity)} // Membuka modal ketika tombol diklik
                  >
                    Details
                  </button>

                  {user?.role === 'user' && (
                    <button
                      className="flex items-center px-4 py-2 mt-2 text-sm text-white bg-green-500 rounded-full hover:bg-green-600"
                      onClick={() => handleAddToCart(activity)}
                    >
                      <FaShoppingCart className="mr-2" /> Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Modal Detail Activities */}
      {isModalOpen && selectedActivity && (
        <DetailsActivitiesModal
          activityId={selectedActivity.id}
          onClose={() => setIsModalOpen(false)} // Menutup modal
        />
      )}

      {/* Modal Konfirmasi Add to Cart */}
      {isAddToCartModalOpen && selectedActivity && (
        <AddToCartModal
          activity={selectedActivity}
          onConfirm={confirmAddToCart}
          onCancel={cancelAddToCart}
        />
      )}

      {/* Toast Notification */}
      {message && (
        <div
          className={`fixed top-4 right-4 flex items-center space-x-2 px-4 py-2 rounded-md shadow-lg
            ${toastType === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' : ''}
            ${toastType === 'error' ? 'bg-red-100 border-l-4 border-red-500 text-red-700' : ''}
          `}
        >
          {toastType === 'success' && <span className="text-green-600">✔️</span>}
          {toastType === 'error' && <span className="text-red-600">❌</span>}
          <p>{message}</p>
          <button onClick={() => setMessage('')} className="ml-4 font-bold">X</button>
        </div>
      )}
    </section>
  );
};

export default Activities;