import React from 'react';
import axios from 'axios';

// Komponen modal untuk menghapus promo.
const DeletePromoModal = ({ promo, onClose, fetchPromos }) => {
  const apiKey = '24405e01-fbc1-45a5-9f5a-be13afcd757c'; // API Key untuk autentikasi ke API.
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiIxZDE0OWNhYy1iOWJhLTQyYTMtYWY3ZC00MGZjOTMzMmRjMTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY1NTc3Nzd9.XfJCJ1vUoRCuLst1Y1R2fnOAqA8cgHIvzsWkQQnYhpo'; // Token untuk autentikasi Bearer ke API.

  // Fungsi untuk menghapus promo berdasarkan ID.
  const handleDeletePromo = async () => {
    try {
      await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${promo.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKey,
          },
        }
      );
      fetchPromos(); // Memuat ulang daftar promo setelah penghapusan berhasil.
      onClose(); // Menutup modal setelah penghapusan berhasil.
    } catch (error) {
      console.error('Error deleting promo', error); // Menampilkan pesan error jika gagal menghapus promo.
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="mb-4 text-xl font-bold">Delete Promo</h2>
        <p>Are you sure you want to delete the promo <strong>{promo.title}</strong>?</p> {/* Menampilkan nama promo yang akan dihapus */}
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 mr-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleDeletePromo} // Menjalankan fungsi untuk menghapus promo.
            className="px-4 py-2 text-white bg-red-500 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePromoModal;