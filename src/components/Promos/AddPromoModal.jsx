import React, { useState } from 'react';
import axios from 'axios';

// Komponen modal untuk menambah promo baru.
const AddPromoModal = ({ isOpen, onClose, onPromoAdded }) => {
  const [newPromo, setNewPromo] = useState({
    title: '',
    description: '',
    promo_code: '',
    promo_discount_price: '',
    minimum_claim_price: '',
    terms_condition: '',
    imageUrl: '',
  });
  const [selectedImage, setSelectedImage] = useState(null); // Menyimpan file gambar yang dipilih oleh user.

  const apiKey = '24405e01-fbc1-45a5-9f5a-be13afcd757c'; // API Key untuk autentikasi ke API.
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiIxZDE0OWNhYy1iOWJhLTQyYTMtYWY3ZC00MGZjOTMzMmRjMTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY1NTc3Nzd9.XfJCJ1vUoRCuLst1Y1R2fnOAqA8cgHIvzsWkQQnYhpo'; // Token untuk autentikasi Bearer ke API.

  // Fungsi untuk mengupload gambar promo.
  const handleImageUpload = async () => {
    if (!selectedImage) return null; // Jika tidak ada gambar yang dipilih, return null.

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          apiKey: apiKey,
        },
      });
      return response.data.url; // Mengembalikan URL gambar yang berhasil diupload.
    } catch (error) {
      console.error('Error uploading image:', error);
      return null; // Return null jika upload gambar gagal.
    }
  };

  // Fungsi untuk membuat promo baru.
  const handleCreatePromo = async () => {
    // Validasi untuk memastikan semua field terisi.
    if (
      !newPromo.title ||
      !newPromo.description ||
      !newPromo.promo_code ||
      !newPromo.promo_discount_price ||
      !newPromo.minimum_claim_price ||
      !newPromo.terms_condition
    ) {
      alert('Please fill in all fields before creating a promo.');
      return;
    }

    try {
      const imageUrl = await handleImageUpload(); // Mengupload gambar dan mendapatkan URL.
      if (!imageUrl) {
        alert('Image upload failed. Please try again.');
        return;
      }

      // Mengirim data promo baru ke API.
      await axios.post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo',
        {
          ...newPromo,
          promo_discount_price: Number(newPromo.promo_discount_price), // Mengonversi harga diskon ke number.
          minimum_claim_price: Number(newPromo.minimum_claim_price), // Mengonversi harga minimal klaim ke number.
          imageUrl: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKey,
          },
        }
      );
      onPromoAdded(); // Memanggil callback untuk memperbarui daftar promo.
      onClose(); // Menutup modal setelah promo berhasil ditambahkan.
    } catch (error) {
      console.error('Error creating promo', error);
      alert('Error creating promo. Please check the input data.'); // Menampilkan pesan jika terjadi error saat membuat promo.
    }
  };

  if (!isOpen) return null; // Menyembunyikan modal jika tidak terbuka.

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Add Promo</h2>
        <input
          type="text"
          placeholder="Title"
          value={newPromo.title}
          onChange={(e) => setNewPromo({ ...newPromo, title: e.target.value })} // Menyimpan input title.
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Promo Code"
          value={newPromo.promo_code}
          onChange={(e) => setNewPromo({ ...newPromo, promo_code: e.target.value })} // Menyimpan input promo code.
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Promo Discount Price"
          value={newPromo.promo_discount_price}
          onChange={(e) => setNewPromo({ ...newPromo, promo_discount_price: e.target.value })} // Menyimpan input harga diskon.
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Min Claim Price"
          value={newPromo.minimum_claim_price}
          onChange={(e) => setNewPromo({ ...newPromo, minimum_claim_price: e.target.value })} // Menyimpan input harga minimal klaim.
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Description"
          value={newPromo.description}
          onChange={(e) => setNewPromo({ ...newPromo, description: e.target.value })} // Menyimpan input deskripsi.
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Terms Condition"
          value={newPromo.terms_condition}
          onChange={(e) => setNewPromo({ ...newPromo, terms_condition: e.target.value })} // Menyimpan input syarat dan ketentuan.
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files[0])} // Menyimpan file gambar yang dipilih.
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <div className="flex flex-col justify-end space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <button
            onClick={onClose} // Menutup modal tanpa menyimpan perubahan.
            className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleCreatePromo} // Menyimpan promo baru.
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Add Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPromoModal;