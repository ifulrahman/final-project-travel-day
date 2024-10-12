import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditCategoryModal from './EditCategoryModal';
import AddCategoryModal from './AddCategoryModal';
import DeleteCategoryModal from './DeleteCategoryModal';
import { FaArrowLeft, FaArrowRight, FaEdit, FaTrash } from 'react-icons/fa';

// Komponen utama untuk menampilkan daftar kategori, serta menambah, mengedit, dan menghapus kategori.
const CategoriesTable = () => {
  const [categories, setCategories] = useState([]); // Menyimpan daftar kategori yang diambil dari API.
  const [editingCategory, setEditingCategory] = useState(null); // Menyimpan kategori yang sedang diedit.
  const [deletingCategory, setDeletingCategory] = useState(null); // Menyimpan kategori yang sedang dihapus.
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Menyimpan status apakah modal edit terbuka.
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Menyimpan status apakah modal tambah terbuka.
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Menyimpan status apakah modal delete terbuka.
  const [currentPage, setCurrentPage] = useState(1); // Menyimpan nomor halaman saat ini pada tabel.
  const itemsPerPage = 5; // Menentukan jumlah item per halaman.
  const [message, setMessage] = useState(''); // Menyimpan pesan notifikasi.
  const [toastType, setToastType] = useState(''); // Menyimpan jenis notifikasi (sukses/gagal/info).

  const apiKey = '24405e01-fbc1-45a5-9f5a-be13afcd757c'; // API Key untuk autentikasi ke API.
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiIxZDE0OWNhYy1iOWJhLTQyYTMtYWY3ZC00MGZjOTMzMmRjMTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY1NTc3Nzd9.XfJCJ1vUoRCuLst1Y1R2fnOAqA8cgHIvzsWkQQnYhpo'; // Token untuk autentikasi Bearer ke API.

  useEffect(() => {
    fetchCategories(); // Mengambil data kategori saat komponen pertama kali dirender.
  }, []);

  // Fungsi untuk mengambil data kategori dari API.
  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories', {
        headers: {
          apiKey: apiKey,
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data.data); // Menyimpan data kategori yang berhasil diambil ke dalam state.
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  // Fungsi untuk membuka modal edit dan menyimpan kategori yang dipilih.
  const handleEditClick = (category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  // Fungsi untuk membuka modal delete dan menyimpan kategori yang dipilih.
  const handleDeleteClick = (category) => {
    setDeletingCategory(category);
    setIsDeleteModalOpen(true);
  };

  // Fungsi untuk membuka modal tambah kategori.
  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  // Fungsi untuk menampilkan notifikasi (toast).
  const showToast = (msg, type) => {
    setMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setMessage(''); // Menghilangkan pesan setelah beberapa detik.
    }, 3000);
  };

  // Logika untuk pagination.
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categories.length / itemsPerPage); // Menghitung jumlah total halaman.

  // Fungsi untuk pindah ke halaman selanjutnya.
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Fungsi untuk pindah ke halaman sebelumnya.
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Menyesuaikan halaman jika item pada halaman saat ini habis.
  useEffect(() => {
    if (currentItems.length === 0 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentItems]);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold md:text-3xl">Manage Categories</h1>
      <button
        onClick={handleAddClick} // Membuka modal tambah kategori.
        className="px-4 py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600"
      >
        (+) Add Category
      </button>
      <table className="min-w-full mt-4 bg-white shadow-md rounded-3xl">
        <thead>
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Created At</th>
            <th className="p-4 text-left">Updated At</th>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((category) => (
            <tr key={category.id}>
              <td className="p-4">{category.name}</td>
              <td className="p-4">{new Date(category.createdAt).toLocaleDateString()}</td>
              <td className="p-4">{new Date(category.updatedAt).toLocaleDateString()}</td>
              <td className="p-4">
                <img src={category.imageUrl} alt={category.name} className="object-cover h-12 rounded-md w-18" />
              </td>
              <td className="p-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(category)} // Membuka modal edit untuk kategori yang dipilih.
                    className="relative p-2 bg-yellow-500 rounded-full hover:bg-yellow-600 group"
                  >
                    <FaEdit className="text-white" />
                    <span className="absolute hidden px-2 py-1 text-xs text-white transform -translate-x-1/2 bg-gray-800 rounded -top-8 left-1/2 group-hover:block">
                      Edit
                    </span>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(category)} // Membuka modal delete untuk kategori yang dipilih.
                    className="relative p-2 bg-red-500 rounded-full hover:bg-red-600 group"
                  >
                    <FaTrash className="text-white" />
                    <span className="absolute hidden px-2 py-1 text-xs text-white transform -translate-x-1/2 bg-gray-800 rounded -top-8 left-1/2 group-hover:block">
                      Delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */} 
      <div className="flex justify-center mt-4">
        <button
          onClick={prevPage} // Pindah ke halaman sebelumnya.
          className="p-2 text-white bg-gray-500 rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </button>
        <span className="px-4 py-2">{currentPage} of {totalPages}</span> {/* Menampilkan halaman saat ini */}
        <button
          onClick={nextPage} // Pindah ke halaman selanjutnya.
          className="p-2 text-white bg-gray-500 rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Modal untuk menambah kategori */}
      {isAddModalOpen && (
        <AddCategoryModal
          onClose={() => setIsAddModalOpen(false)}
          refreshCategories={() => {
            fetchCategories(); // Memperbarui daftar kategori setelah menambah.
            showToast('Category added successfully', 'success'); // Menampilkan notifikasi sukses.
          }}
        />
      )}

      {/* Modal untuk mengedit kategori */}
      {isEditModalOpen && editingCategory && (
        <EditCategoryModal
          isOpen={isEditModalOpen}
          category={editingCategory}
          onClose={() => setIsEditModalOpen(false)}
          onCategoryUpdated={(updatedCategory) => {
            setCategories((prevCategories) =>
              prevCategories.map((cat) =>
                cat.id === updatedCategory.id ? updatedCategory : cat
              )
            ); // Memperbarui data kategori yang diedit.
            setIsEditModalOpen(false);
            showToast('Category updated successfully', 'success'); // Menampilkan notifikasi sukses.
          }}
        />
      )}

      {/* Modal untuk menghapus kategori */}
      {isDeleteModalOpen && deletingCategory && (
        <DeleteCategoryModal
          category={deletingCategory}
          onClose={() => setIsDeleteModalOpen(false)}
          refreshCategories={() => {
            fetchCategories(); // Memperbarui daftar kategori setelah dihapus.
            showToast('Category deleted successfully', 'success'); // Menampilkan notifikasi sukses.
          }}
        />
      )}

      {/* Custom Toast untuk menampilkan pesan notifikasi */}
      {message && (
        <div
          className={`fixed top-4 right-4 flex items-center space-x-2 px-4 py-2 rounded-md shadow-lg
            ${toastType === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' : ''}
            ${toastType === 'error' ? 'bg-red-100 border-l-4 border-red-500 text-red-700' : ''}
            ${toastType === 'info' ? 'bg-blue-100 border-l-4 border-blue-500 text-blue-700' : ''}
          `}
        >
          {toastType === 'success' && <span className="text-green-600">✔️</span>}
          {toastType === 'error' && <span className="text-red-600">❌</span>}
          {toastType === 'info' && <span className="text-blue-600">ℹ️</span>}
          <p>{message}</p>
          <button onClick={() => setMessage('')} className="ml-4 font-bold">X</button>
        </div>
      )}
    </div>
  );
};

export default CategoriesTable;