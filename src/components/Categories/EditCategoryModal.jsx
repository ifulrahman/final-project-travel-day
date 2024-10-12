import React, { useState } from 'react';
import axios from 'axios';

// Komponen modal untuk mengedit kategori yang sudah ada.
const EditCategoryModal = ({ isOpen, category, onClose, onCategoryUpdated }) => {
  const [name, setName] = useState(category.name || ''); // Menyimpan nama kategori yang akan diedit.
  const [imageFile, setImageFile] = useState(null); // Menyimpan file gambar baru jika user memilih untuk mengganti gambar.
  const [isUploading, setIsUploading] = useState(false); // Menyimpan status apakah proses upload gambar sedang berlangsung.

  const apiKey = '24405e01-fbc1-45a5-9f5a-be13afcd757c'; // API Key untuk autentikasi ke API.
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiIxZDE0OWNhYy1iOWJhLTQyYTMtYWY3ZC00MGZjOTMzMmRjMTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY1NTc3Nzd9.XfJCJ1vUoRCuLst1Y1R2fnOAqA8cgHIvzsWkQQnYhpo'; // Token untuk autentikasi Bearer ke API.

  // Fungsi untuk mengupload gambar baru jika dipilih oleh user.
  const handleUploadImage = async () => {
    if (!imageFile) return category.imageUrl; // Menggunakan URL gambar lama jika tidak ada file baru.

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
      alert('Image upload failed. Please try again.'); // Menampilkan pesan error jika upload gagal.
      throw new Error('Image upload failed');
    }
  };

  // Fungsi untuk menyimpan perubahan pada kategori.
  const handleSave = async () => {
    if (!name.trim()) {
      alert('Please enter a category name.'); // Menampilkan pesan jika nama kategori kosong.
      return;
    }

    try {
      const newImageUrl = await handleUploadImage(); // Mengupload gambar jika ada dan mendapatkan URL baru.

      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${category.id}`,
        {
          name,
          imageUrl: newImageUrl, // Mengirim nama dan URL gambar baru ke API.
        },
        {
          headers: {
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onCategoryUpdated({ ...category, name, imageUrl: newImageUrl }); // Memanggil callback untuk memperbarui daftar kategori.
      onClose(); // Menutup modal setelah perubahan disimpan.
    } catch (error) {
      console.error('Error updating category', error);
      alert('Failed to update category. Please try again.'); // Menampilkan pesan error jika update gagal.
    }
  };

  // Fungsi untuk menangani perubahan file gambar yang dipilih.
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  if (!isOpen) return null; // Menyembunyikan modal jika tidak terbuka.

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="p-6 transition-all duration-300 ease-out transform scale-95 bg-white rounded-lg shadow-lg z-60">
        <h2 className="mb-4 text-xl font-bold">Edit Category</h2>
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
          <label className="block mb-2">Choose New Category Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange} // Menangani perubahan file gambar yang dipilih.
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end">
          <button className="px-4 py-2 mr-2 text-white bg-gray-500 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded"
            onClick={handleSave} // Menyimpan perubahan pada kategori.
            disabled={isUploading} // Menonaktifkan tombol saat gambar sedang diunggah.
          >
            {isUploading ? 'Uploading...' : 'Save'} {/* Menampilkan status saat proses upload berlangsung. */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;