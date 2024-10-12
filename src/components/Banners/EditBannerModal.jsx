import React, { useState } from 'react';
import axios from 'axios';

// Komponen modal untuk mengedit banner yang sudah ada.
const EditBannerModal = ({ banner, onClose, onBannerUpdated }) => {
  const [name, setName] = useState(banner.name); // Menyimpan nama banner yang akan diedit.
  const [imageFile, setImageFile] = useState(null); // Menyimpan file gambar baru jika user memilih untuk mengganti gambar.
  const [isUploading, setIsUploading] = useState(false); // Menyimpan status apakah proses upload gambar sedang berlangsung.

  const apiKey = '24405e01-fbc1-45a5-9f5a-be13afcd757c'; // API Key untuk autentikasi ke API.
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiIxZDE0OWNhYy1iOWJhLTQyYTMtYWY3ZC00MGZjOTMzMmRjMTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY1NTc3Nzd9.XfJCJ1vUoRCuLst1Y1R2fnOAqA8cgHIvzsWkQQnYhpo'; // Token untuk autentikasi Bearer ke API.

  // Fungsi untuk mengunggah gambar baru jika dipilih oleh user.
  const handleUploadImage = async () => {
    if (!imageFile) return null;

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

  // Fungsi untuk menyimpan perubahan pada banner.
  const handleSave = async () => {
    try {
      let newImageUrl = banner.imageUrl;

      if (imageFile) {
        newImageUrl = await handleUploadImage(); // Mengupload gambar baru jika ada dan mengganti URL gambar.
      }

      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${banner.id}`,
        {
          name,
          imageUrl: newImageUrl, // Menyimpan nama dan URL gambar baru.
        },
        {
          headers: {
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onBannerUpdated(); // Memanggil callback untuk memperbarui daftar banner setelah penyimpanan.
      onClose(); // Menutup modal setelah perubahan disimpan.
    } catch (error) {
      console.error('Error updating banner', error); // Menampilkan error jika terjadi kesalahan saat menyimpan.
    }
  };

  // Fungsi untuk menangani perubahan file gambar yang dipilih.
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Edit Banner</h2>
        <div className="mb-4">
          <label className="block mb-2">Banner Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Menyimpan perubahan nama banner.
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Choose New Banner Image (optional)</label>
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
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleSave} // Menyimpan perubahan pada banner.
            disabled={isUploading} // Menonaktifkan tombol jika gambar sedang diunggah.
          >
            {isUploading ? 'Uploading...' : 'Save'} {/* Menampilkan status saat proses upload berlangsung. */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBannerModal;