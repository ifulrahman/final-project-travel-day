import React, { useState } from 'react';
import axios from 'axios';

// Komponen modal untuk menambah kategori baru.
const AddCategoryModal = ({ onClose, refreshCategories }) => {
  const [name, setName] = useState(''); // Menyimpan nama kategori yang diinput oleh user.
  const [imageFile, setImageFile] = useState(null); // Menyimpan file gambar yang dipilih untuk diupload.
  const [isUploading, setIsUploading] = useState(false); // Menyimpan status apakah proses upload gambar sedang berlangsung.

  const API_KEY = '24405e01-fbc1-45a5-9f5a-be13afcd757c'; // API Key untuk autentikasi ke API.
  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiIxZDE0OWNhYy1iOWJhLTQyYTMtYWY3ZC00MGZjOTMzMmRjMTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY1NTc3Nzd9.XfJCJ1vUoRCuLst1Y1R2fnOAqA8cgHIvzsWkQQnYhpo'; // Token untuk autentikasi Bearer ke API.

  // Fungsi untuk mengupload gambar ke server.
  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      setIsUploading(true); // Mengatur status upload gambar menjadi true saat proses upload dimulai.
      const response = await axios.post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image',
        formData,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setIsUploading(false); // Mengatur status upload menjadi false setelah selesai.
      return response.data.url; // Mengembalikan URL gambar yang berhasil diupload.
    } catch (error) {
      setIsUploading(false);
      console.error('Error uploading image', error);
      throw new Error('Image upload failed'); // Melempar error jika upload gambar gagal.
    }
  };

  // Fungsi untuk menambah kategori baru.
  const handleAddCategory = async () => {
    if (!imageFile) {
      alert('Please select an image file'); // Menampilkan pesan jika user belum memilih gambar.
      return;
    }

    try {
      const imageUrl = await handleUploadImage(); // Mengupload gambar terlebih dahulu dan mendapatkan URL-nya.
      await axios.post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-category',
        {
          name,
          imageUrl,
        },
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      refreshCategories(); // Memanggil callback untuk memperbarui daftar kategori setelah sukses menambah.
      onClose(); // Menutup modal setelah kategori berhasil ditambahkan.
    } catch (error) {
      console.error('Error adding category', error); // Menampilkan error jika terjadi kegagalan saat menambah kategori.
    }
  };

  // Fungsi untuk menangani perubahan file gambar yang dipilih.
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="p-6 transition-all duration-300 ease-out transform scale-95 bg-white rounded-lg shadow-lg z-60">
        <h2 className="mb-4 text-xl font-bold">Add New Category</h2>
        <div className="mb-4">
          <label className="block mb-2">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Menyimpan input nama kategori dari user.
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter category name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category Image</label>
          <input
            type="file"
            onChange={handleFileChange} // Menangani perubahan file gambar yang dipilih.
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end">
          <button className="px-4 py-2 mr-2 text-white bg-gray-500 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded"
            onClick={handleAddCategory} // Menyimpan kategori baru ke server.
            disabled={isUploading} // Menonaktifkan tombol saat gambar sedang diupload.
          >
            {isUploading ? 'Uploading...' : 'Confirm'} {/* Menampilkan status saat proses upload berlangsung. */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;