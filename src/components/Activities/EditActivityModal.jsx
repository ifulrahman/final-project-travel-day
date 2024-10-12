import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Komponen modal untuk mengedit aktivitas yang sudah ada.
const EditActivityModal = ({ isOpen, onClose, activity, onActivityUpdated }) => {
  const [updatedActivity, setUpdatedActivity] = useState({
    title: '',
    imageUrl: '',
    categoryId: '',
    description: '',
    price: '',
    price_discount: '',
    rating: '',
    total_reviews: '',
    facilities: '',
    address: '',
    province: '',
    city: '',
    location_maps: '',
  }); // Menyimpan data aktivitas yang akan diperbarui.
  const [categories, setCategories] = useState([]); // Menyimpan daftar kategori yang diambil dari API.
  const [selectedImage, setSelectedImage] = useState(null); // Menyimpan file gambar yang dipilih.
  const [imageUploading, setImageUploading] = useState(false); // Menyimpan status apakah proses upload gambar sedang berlangsung.

  const apiKey = '24405e01-fbc1-45a5-9f5a-be13afcd757c'; // API Key untuk autentikasi ke API.
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiIxZDE0OWNhYy1iOWJhLTQyYTMtYWY3ZC00MGZjOTMzMmRjMTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY1NTc3Nzd9.XfJCJ1vUoRCuLst1Y1R2fnOAqA8cgHIvzsWkQQnYhpo'; // Token untuk autentikasi Bearer ke API.

  useEffect(() => {
    if (activity) {
      setUpdatedActivity({
        title: activity.title || '',
        imageUrl: activity.imageUrls?.[0] || '',
        categoryId: activity.category?.id || '',
        description: activity.description || '',
        price: activity.price || '',
        price_discount: activity.price_discount || '',
        rating: activity.rating || '',
        total_reviews: activity.total_reviews || '',
        facilities: activity.facilities || '',
        address: activity.address || '',
        province: activity.province || '',
        city: activity.city || '',
        location_maps: activity.location_maps || '',
      }); // Mengisi state dengan data aktivitas yang akan diedit.
    }
  }, [activity]);

  useEffect(() => {
    if (isOpen) {
      fetchCategories(); // Memuat daftar kategori saat modal terbuka.
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories', {
        headers: {
          apiKey: apiKey,
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data.data); // Menyimpan kategori yang diambil dari API.
    } catch (error) {
      console.error('Error fetching categories:', error); // Menampilkan error jika gagal mengambil kategori.
    }
  };

  // Fungsi untuk mengunggah gambar baru.
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setImageUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
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
      const imageUrl = response.data.url;
      setUpdatedActivity((prev) => ({ ...prev, imageUrl })); // Mengupdate URL gambar setelah berhasil diunggah.
    } catch (error) {
      console.error('Error uploading image', error);
      alert('Gagal mengunggah gambar. Silakan coba lagi.'); // Menampilkan pesan error jika upload gagal.
    } finally {
      setImageUploading(false); // Mengubah status upload setelah proses selesai.
    }
  };

  // Fungsi untuk menangani perubahan input form.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedActivity((prev) => ({ ...prev, [name]: value })); // Mengupdate nilai di state berdasarkan input.
  };

  // Fungsi untuk memperbarui data aktivitas.
  const handleUpdateActivity = async () => {
    const formData = {
      title: updatedActivity.title,
      description: updatedActivity.description,
      price: updatedActivity.price,
      price_discount: updatedActivity.price_discount,
      rating: updatedActivity.rating,
      total_reviews: updatedActivity.total_reviews,
      facilities: updatedActivity.facilities,
      address: updatedActivity.address,
      province: updatedActivity.province,
      city: updatedActivity.city,
      categoryId: updatedActivity.categoryId,
      imageUrls: [updatedActivity.imageUrl],
      location_maps: updatedActivity.location_maps,
    };

    try {
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${activity.id}`,
        formData,
        {
          headers: {
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (typeof onActivityUpdated === 'function') {
        onActivityUpdated(); // Memanggil callback untuk memperbarui daftar aktivitas setelah sukses update.
      }

      onClose(); // Menutup modal setelah update berhasil.
    } catch (error) {
      console.error('Error updating activity', error);
      alert('Terjadi kesalahan saat memperbarui aktivitas. Mohon periksa kembali data yang dimasukkan.'); // Menampilkan pesan jika terjadi kesalahan.
    }
  };

  if (!isOpen) return null; // Jika modal tidak terbuka, jangan render apa pun.

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-screen p-6 overflow-y-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Edit Activity</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Input untuk memilih kategori aktivitas */}
          <div>
            <label>Category:</label>
            <select
              name="categoryId"
              value={updatedActivity.categoryId}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            >
              <option value="">Choose a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {/* Input untuk judul aktivitas */}
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={updatedActivity.title}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
          </div>
          {/* Input untuk harga aktivitas */}
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={updatedActivity.price}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
          </div>
          {/* Input untuk harga diskon */}
          <div>
            <label>Price Discount:</label>
            <input
              type="number"
              name="price_discount"
              value={updatedActivity.price_discount}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
          </div>
          {/* Input untuk rating aktivitas */}
          <div>
            <label>Rating:</label>
            <input
              type="number"
              name="rating"
              value={updatedActivity.rating}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
          </div>
          {/* Input untuk jumlah ulasan */}
          <div>
            <label>Total Reviews:</label>
            <input
              type="number"
              name="total_reviews"
              value={updatedActivity.total_reviews}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
          </div>
          {/* Input untuk fasilitas */}
          <div className="col-span-2">
            <label>Facilities:</label>
            <textarea
              name="facilities"
              value={updatedActivity.facilities}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
          </div>
          {/* Input untuk deskripsi */}
          <div className="col-span-2">
            <label>Description:</label>
            <textarea
              name="description"
              value={updatedActivity.description}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
          </div>
          {/* Input untuk provinsi */}
          <div>
            <label>Province:</label>
            <input
              type="text"
              name="province"
              value={updatedActivity.province}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
          </div>
          {/* Input untuk kota */}
          <div>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={updatedActivity.city}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
          </div>
          {/* Input untuk alamat */}
          <div className="col-span-2">
            <label>Address:</label>
            <textarea
              name="address"
              value={updatedActivity.address}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
          </div>
          {/* Input untuk kode iframe peta lokasi */}
          <div className="col-span-2">
            <label>Location Maps:</label>
            <textarea
              name="location_maps"
              value={updatedActivity.location_maps}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              placeholder="Paste iframe embed code here"
            />
          </div>
          {/* Input untuk mengupload gambar */}
          <div className="col-span-2">
            <label>Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            {imageUploading && <p>Uploading image...</p>}
            {updatedActivity.imageUrl && <img src={updatedActivity.imageUrl} alt="Activity" className="h-32 mt-2" />}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose} // Menutup modal tanpa menyimpan perubahan.
            className="px-4 py-2 mr-2 text-gray-700 bg-gray-300 rounded"
          >
            Close
          </button>
          <button
            onClick={handleUpdateActivity} // Menyimpan perubahan aktivitas.
            className="px-4 py-2 text-white bg-blue-500 rounded"
            disabled={imageUploading} // Menonaktifkan tombol jika gambar sedang diunggah.
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditActivityModal;