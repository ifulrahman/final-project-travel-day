import React, { useState } from 'react';
import axios from 'axios';

// Komponen modal untuk menambah banner baru.
const AddBannerModal = ({ onClose, onBannerAdded }) => {
  const [name, setName] = useState(''); // Menyimpan nama banner yang diinput oleh user.
  const [imageFile, setImageFile] = useState(null); // Menyimpan file gambar yang dipilih untuk diupload.
  const [isUploading, setIsUploading] = useState(false); // Menyimpan status apakah proses upload gambar sedang berlangsung.

  const apiKey = '24405e01-fbc1-45a5-9f5a-be13afcd757c'; // API Key untuk autentikasi ke API.
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiIxZDE0OWNhYy1iOWJhLTQyYTMtYWY3ZC00MGZjOTMzMmRjMTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY1NTc3Nzd9.XfJCJ1vUoRCuLst1Y1R2fnOAqA8cgHIvzsWkQQnYhpo'; // Token untuk autentikasi Bearer ke API.

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
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
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

  // Fungsi untuk menambahkan banner baru.
  const handleAddBanner = async () => {
    if (!imageFile) {
      alert('Please select an image file'); // Menampilkan pesan jika user belum memilih gambar.
      return;
    }

    try {
      const imageUrl = await handleUploadImage(); // Mengupload gambar terlebih dahulu dan mendapatkan URL-nya.
      await axios.post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner',
        {
          name,
          imageUrl,
        },
        {
          headers: {
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onBannerAdded(); // Memanggil callback untuk memperbarui daftar banner setelah sukses menambah.
      onClose(); // Menutup modal setelah banner berhasil ditambahkan.
    } catch (error) {
      console.error('Error adding banner', error);
    }
  };

  // Fungsi untuk menangani perubahan file gambar yang dipilih.
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 transition-all duration-300 ease-out transform scale-95 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Create New Banner</h2>
        <div className="mb-4">
          <label className="block mb-2">Banner Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Menyimpan input nama banner dari user.
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter banner name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Banner Image</label>
          <input
            type="file"
            onChange={handleFileChange} // Menangani perubahan file gambar yang dipilih.
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end">
          <button className="px-4 py-2 mr-2 text-white bg-gray-500 rounded hover:bg-gray-600" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            onClick={handleAddBanner} // Menyimpan banner baru ke server.
            disabled={isUploading} // Menonaktifkan tombol saat gambar sedang diupload.
          >
            {/* Menampilkan status saat proses upload berlangsung */}
            {isUploading ? 'Uploading...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBannerModal;