import React, { useState } from 'react';
import axios from 'axios';

// Komponen modal untuk mengedit promo yang ada.
const EditPromoModal = ({ isOpen, promo, onClose, onChange, onSave }) => {
  const [selectedImage, setSelectedImage] = useState(null); // Menyimpan file gambar yang dipilih user.
  const [imageUploading, setImageUploading] = useState(false); // Status untuk melacak apakah gambar sedang diupload.

  // API Key dan Token untuk autentikasi ke API.
  const apiKey = '24405e01-fbc1-45a5-9f5a-be13afcd757c';
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiIxZDE0OWNhYy1iOWJhLTQyYTMtYWY3ZC00MGZjOTMzMmRjMTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY1NTc3Nzd9.XfJCJ1vUoRCuLst1Y1R2fnOAqA8cgHIvzsWkQQnYhpo';

  if (!isOpen) return null; // Jika modal tidak terbuka, jangan tampilkan komponen ini.

  // Fungsi untuk menangani upload gambar baru.
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(file); // Menyimpan file gambar yang dipilih.
    setImageUploading(true); // Mengubah status menjadi 'uploading' saat gambar diunggah.

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
            apiKey: apiKey,
          },
        }
      );

      const imageUrl = response.data.url;
      onChange({ ...promo, imageUrl }); // Memperbarui URL gambar pada objek promo.
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.'); // Menampilkan pesan error jika gagal mengupload gambar.
    } finally {
      setImageUploading(false); // Mengembalikan status menjadi 'tidak uploading' setelah selesai.
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Edit Promo</h2>
        <input
          type="text"
          placeholder="Title"
          value={promo.title || ''}
          onChange={(e) => onChange({ ...promo, title: e.target.value })} // Menyimpan perubahan pada title promo.
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={promo.description || ''}
          onChange={(e) => onChange({ ...promo, description: e.target.value })} // Menyimpan perubahan pada deskripsi promo.
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Promo Code"
          value={promo.promo_code || ''}
          onChange={(e) => onChange({ ...promo, promo_code: e.target.value })} // Menyimpan perubahan pada kode promo.
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Discount Price"
          value={promo.promo_discount_price || ''}
          onChange={(e) => onChange({ ...promo, promo_discount_price: e.target.value })} // Menyimpan perubahan pada harga diskon promo.
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Min Claim Price"
          value={promo.minimum_claim_price || ''}
          onChange={(e) => onChange({ ...promo, minimum_claim_price: e.target.value })} // Menyimpan perubahan pada harga klaim minimum.
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Terms Condition"
          value={promo.terms_condition || ''}
          onChange={(e) => onChange({ ...promo, terms_condition: e.target.value })} // Menyimpan perubahan pada syarat dan ketentuan.
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange} // Mengunggah gambar baru.
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        /> 
        {imageUploading && <p className="text-gray-500">Uploading image...</p>} 
        {promo.imageUrl && (
          <p className="text-gray-500">
            Current Image URL: <a href={promo.imageUrl} target="_blank" rel="noopener noreferrer">{promo.imageUrl}</a>
          </p>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose} // Menutup modal tanpa menyimpan perubahan.
            className="px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={onSave} // Menyimpan perubahan promo.
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            disabled={imageUploading} // Menonaktifkan tombol jika gambar sedang di-upload.
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPromoModal;