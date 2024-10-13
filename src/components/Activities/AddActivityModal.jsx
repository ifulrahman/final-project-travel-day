import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Komponen modal untuk menambah aktivitas baru.
const AddActivityModal = ({ isOpen, onClose, onActivityAdded }) => {
  const [activity, setActivity] = useState({
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
    location_map: '',
  }); // Menyimpan data aktivitas yang diisi oleh user.
  const [categories, setCategories] = useState([]); // Menyimpan daftar kategori yang diambil dari API.
  const [imageUploading, setImageUploading] = useState(false); // Menyimpan status apakah proses upload gambar sedang berlangsung.

  const apiKey = '24405e01-fbc1-45a5-9f5a-be13afcd757c'; // API Key untuk autentikasi ke API.
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiIxZDE0OWNhYy1iOWJhLTQyYTMtYWY3ZC00MGZjOTMzMmRjMTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY1NTc3Nzd9.XfJCJ1vUoRCuLst1Y1R2fnOAqA8cgHIvzsWkQQnYhpo'; // Token untuk autentikasi Bearer ke API.

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories', {
          headers: {
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data.data); // Menyimpan daftar kategori yang berhasil diambil dari API.
      } catch (error) {
        console.error('Error fetching categories:', error); // Menampilkan error jika gagal mengambil kategori.
      }
    };

    fetchCategories(); // Mengambil data kategori saat modal dibuka.
  }, []);

  // Fungsi untuk menangani perubahan input.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivity((prev) => ({ ...prev, [name]: value })); // Mengubah nilai properti dalam state activity.
  };

  // Fungsi untuk mengupload gambar ke server.
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
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
      setActivity((prev) => ({ ...prev, imageUrl: response.data.url })); // Menyimpan URL gambar yang berhasil diupload.
    } catch (error) {
      console.error('Error uploading image', error); // Menampilkan error jika terjadi kegagalan upload gambar.
    } finally {
      setImageUploading(false); // Mengubah status upload gambar setelah proses selesai.
    }
  };

  // Fungsi untuk menambah aktivitas baru.
  const handleAddActivity = async () => {
    const formData = {
      title: activity.title,
      description: activity.description,
      price: parseFloat(activity.price), // Mengonversi price menjadi number (float)
      price_discount: parseFloat(activity.price_discount), // Mengonversi price_discount menjadi number (float)
      rating: parseFloat(activity.rating), // Mengonversi rating menjadi number (float)
      total_reviews: parseInt(activity.total_reviews, 10), // Mengonversi total_reviews menjadi number (integer)
      facilities: activity.facilities,
      address: activity.address,
      province: activity.province,
      city: activity.city,
      categoryId: activity.categoryId,
      imageUrls: [activity.imageUrl],
      location_map: activity.location_map,
    };

    try {
      await axios.post(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity',
        formData,
        {
          headers: {
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      onActivityAdded(); // Memanggil fungsi callback untuk memperbarui daftar aktivitas setelah berhasil menambah data.
      onClose(); // Menutup modal setelah aktivitas berhasil ditambahkan.
    } catch (error) {
      console.error('Error creating activity', error); // Menampilkan error jika gagal menambah aktivitas.
    }
  };

  return (
    <div className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm`}>
      <div className="w-full max-w-2xl max-h-screen p-6 overflow-y-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Add Activity</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Input untuk memilih kategori aktivitas */}
          <div>
            <label>Category:</label>
            <select
              name="categoryId"
              value={activity.categoryId}
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
              placeholder="Enter activity title"
              value={activity.title}
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
              placeholder="Enter price"
              value={activity.price}
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
              placeholder="Enter discount price"
              value={activity.price_discount}
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
              placeholder="Enter rating (e.g. 4.5)"
              value={activity.rating}
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
              placeholder="Enter total reviews"
              value={activity.total_reviews}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
          </div>
          {/* Input untuk fasilitas yang tersedia */}
          <div className="col-span-2">
            <label>Facilities:</label>
            <textarea
              name="facilities"
              placeholder="Enter available facilities"
              value={activity.facilities}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
          </div>
          {/* Input untuk deskripsi aktivitas */}
          <div className="col-span-2">
            <label>Description:</label>
            <textarea
              name="description"
              placeholder="Enter activity description"
              value={activity.description}
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
              placeholder="Enter province"
              value={activity.province}
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
              placeholder="Enter city"
              value={activity.city}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
          </div>
          {/* Input untuk alamat lengkap */}
          <div className="col-span-2">
            <label>Address:</label>
            <textarea
              name="address"
              placeholder="Enter address"
              value={activity.address}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
          </div>
          {/* Input untuk lokasi peta dalam format iframe */}
          <div className="col-span-2">
            <label>Location Map (iframe code):</label>
            <textarea
              name="location_map"
              placeholder="Paste iframe code for location map"
              value={activity.location_map}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
          </div>
          {/* Input untuk mengupload gambar aktivitas */}
          <div className="col-span-2">
            <label>Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            {imageUploading && <p>Uploading image...</p>}
            {activity.imageUrl && <img src={activity.imageUrl} alt="Activity" className="h-32 mt-2" />}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 text-gray-700 bg-gray-300 rounded"
          >
            Close
          </button>
          <button
            onClick={handleAddActivity}
            className="px-4 py-2 text-white bg-blue-500 rounded"
            disabled={imageUploading} // Menonaktifkan tombol saat proses upload gambar sedang berlangsung.
          >
            Add Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddActivityModal;