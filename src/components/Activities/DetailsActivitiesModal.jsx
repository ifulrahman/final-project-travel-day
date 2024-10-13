import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const DetailsActivitiesModal = ({ activityId, onClose }) => {
  const [activity, setActivity] = useState(null); // State untuk menyimpan data aktivitas
  const [loading, setLoading] = useState(true); // State untuk loading

  useEffect(() => {
    // Fungsi untuk mengambil detail aktivitas dari API
    const fetchActivityDetails = async () => {
      try {
        const response = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${activityId}`,
          {
            headers: {
              apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c', // Sesuaikan API Key
              Authorization: `Bearer your_token_here`, // Sesuaikan token
            },
          }
        );
        setTimeout(() => {
          setActivity(response.data.data); // Menyimpan data aktivitas yang diambil
          setLoading(false); // Menonaktifkan loading setelah 1 detik
        }, 1000); // Membuat loading selama 1 detik
      } catch (error) {
        console.error('Error fetching activity details:', error);
        setLoading(false); // Tetap menonaktifkan loading meskipun ada error
      }
    };

    fetchActivityDetails();
  }, [activityId]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
        {/* Menampilkan animasi loading */}
        <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!activity) {
    return <div>Error fetching activity details.</div>; // Menampilkan pesan error jika gagal mengambil data
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg max-h-full p-4 overflow-y-auto bg-white rounded-lg shadow-lg md:max-w-2xl lg:max-w-4xl md:p-6">
        {/* Icon "X" untuk menutup modal di pojok kanan atas */}
        <button
          className="absolute p-2 text-white transition duration-300 ease-in-out transform bg-red-500 rounded-full top-2 right-2 hover:bg-red-700 hover:scale-110"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="mb-4 text-xl font-bold text-center md:text-2xl md:text-left">{activity.title}</h2>
        <img
          src={activity.imageUrls[0]}
          alt={activity.title}
          className="object-cover w-full h-40 mb-4 rounded-lg md:h-64"
        />
        <p className="text-sm md:text-base"><strong>Price Discount:</strong> {activity.price_discount}</p>
        <p className="text-sm md:text-base"><strong>Rating:</strong> {activity.rating}</p>
        <p className="text-sm md:text-base"><strong>Facilities:</strong> {activity.facilities}</p>
        <p className="text-sm md:text-base"><strong>Address:</strong> {activity.address}</p>
        <p className="text-sm md:text-base"><strong>City:</strong> {activity.city}</p>

        {/* Menampilkan peta lokasi jika tersedia */}
        {activity.location_maps ? (
          <div className="mt-4">
            <strong>Location Map:</strong>
            <div
              className="flex justify-center w-full h-40 mt-2 md:h-64"
              dangerouslySetInnerHTML={{ __html: activity.location_maps }} // Render peta dari iframe
            />
          </div>
        ) : (
          <p className="mt-4"><strong>Location Map:</strong> Not available</p>
        )}
      </div>
    </div>
  );
};

export default DetailsActivitiesModal;