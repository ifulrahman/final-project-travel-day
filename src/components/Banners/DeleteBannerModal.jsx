import React from 'react';
import axios from 'axios';

// Komponen modal untuk menghapus banner.
const DeleteBannerModal = ({ banner, onClose, onBannerDeleted }) => {
  const apiKey = '24405e01-fbc1-45a5-9f5a-be13afcd757c'; // API Key untuk autentikasi ke API.
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiIxZDE0OWNhYy1iOWJhLTQyYTMtYWY3ZC00MGZjOTMzMmRjMTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY1NTc3Nzd9.XfJCJ1vUoRCuLst1Y1R2fnOAqA8cgHIvzsWkQQnYhpo'; // Token untuk autentikasi Bearer ke API.

  // Fungsi untuk menghapus banner.
  const handleDelete = async () => {
    try {
      await axios.delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-banner/${banner.id}`, {
        headers: {
          apiKey: apiKey,
          Authorization: `Bearer ${token}`,
        },
      });
      onBannerDeleted(); // Memanggil callback untuk memperbarui daftar banner setelah penghapusan.
      onClose(); // Menutup modal setelah banner dihapus.
    } catch (error) {
      console.error('Error deleting banner', error); // Menampilkan error jika terjadi kegagalan saat menghapus.
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 transition-all duration-300 ease-out transform scale-95 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Delete Banner</h2>
        <p>Are you sure you want to delete {banner.name}?</p> {/* Menampilkan nama banner yang akan dihapus */}
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 mr-2 text-white bg-gray-500 rounded hover:bg-gray-600" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBannerModal;