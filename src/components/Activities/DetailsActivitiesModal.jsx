import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const DetailsActivitiesModal = ({ activityId, onClose }) => {
  const [activity, setActivity] = useState(null); // State untuk menyimpan data aktivitas

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
        setActivity(response.data.data); // Menyimpan data aktivitas yang diambil
      } catch (error) {
        console.error('Error fetching activity details:', error);
      }
    };

    fetchActivityDetails();
  }, [activityId]);

  if (!activity) {
    return <div>Loading...</div>; // Menampilkan pesan loading jika data belum tersedia
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