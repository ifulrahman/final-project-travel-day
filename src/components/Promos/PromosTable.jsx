import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate'; // Fungsi untuk memformat tanggal.
import AddPromoModal from './AddPromoModal';
import EditPromoModal from './EditPromoModal';
import DeletePromoModal from './DeletePromoModal';

const PromosTable = () => {
  const [promos, setPromos] = useState([]); // State untuk menyimpan daftar promo.
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Status untuk membuka modal tambah promo.
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Status untuk membuka modal edit promo.
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Status untuk membuka modal hapus promo.
  const [editingPromo, setEditingPromo] = useState(null); // Menyimpan data promo yang sedang diedit.
  const [deletingPromo, setDeletingPromo] = useState(null); // Menyimpan data promo yang akan dihapus.
  const [message, setMessage] = useState(''); // Menyimpan pesan notifikasi.
  const [toastType, setToastType] = useState(''); // Menyimpan tipe notifikasi (success/error).
  const [currentPage, setCurrentPage] = useState(1); // Menyimpan halaman saat ini untuk pagination.
  const promosPerPage = 5; // Jumlah promo yang ditampilkan per halaman.

  // API Key dan Token untuk autentikasi API.
  const apiKey = '24405e01-fbc1-45a5-9f5a-be13afcd757c';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiIxZDE0OWNhYy1iOWJhLTQyYTMtYWY3ZC00MGZjOTMzMmRjMTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY1NTc3Nzd9.XfJCJ1vUoRCuLst1Y1R2fnOAqA8cgHIvzsWkQQnYhpo';

  // Menjalankan fetchPromos saat komponen pertama kali dirender.
  useEffect(() => {
    fetchPromos();
  }, []);

  // Menghapus pesan notifikasi setelah 2 detik.
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  // Fungsi untuk mengambil data promo dari API.
  const fetchPromos = async () => {
    try {
      const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos', {
        headers: {
          apiKey: apiKey,
          Authorization: `Bearer ${token}`,
        },
      });
      setPromos(response.data.data); // Menyimpan data promo ke state.
    } catch (error) {
      console.error('Error fetching promos', error);
    }
  };

  // Fungsi untuk memperbarui promo yang sedang diedit.
  const handleUpdatePromo = async () => {
    if (!editingPromo) return;
    try {
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${editingPromo.id}`,
        {
          ...editingPromo,
          promo_discount_price: Number(editingPromo.promo_discount_price),
          minimum_claim_price: Number(editingPromo.minimum_claim_price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKey,
          },
        }
      );
      fetchPromos(); // Memuat ulang daftar promo setelah diperbarui.
      setIsEditModalOpen(false); // Menutup modal edit.
      setEditingPromo(null); // Menghapus data promo yang sedang diedit dari state.
      setToastType('success');
      setMessage('Promo updated successfully');
    } catch (error) {
      console.error('Error updating promo', error);
      setToastType('error');
      setMessage('Failed to update promo');
    }
  };

  // Fungsi untuk menutup modal delete.
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingPromo(null);
  };

  // Fungsi untuk menghapus promo yang dipilih.
  const handleDeletePromo = async () => {
    if (!deletingPromo) return;
    try {
      await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${deletingPromo.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKey,
          },
        }
      );
      fetchPromos(); // Memuat ulang daftar promo setelah penghapusan.
      handleCloseDeleteModal(); // Menutup modal delete.
      setToastType('success');
      setMessage('Promo deleted successfully');
    } catch (error) {
      console.error('Error deleting promo', error);
      setToastType('error');
      setMessage('Failed to delete promo');
    }
  };

  // Logika untuk pagination.
  const indexOfLastPromo = currentPage * promosPerPage;
  const indexOfFirstPromo = indexOfLastPromo - promosPerPage;
  const currentPromos = promos.slice(indexOfFirstPromo, indexOfLastPromo);
  const totalPages = Math.ceil(promos.length / promosPerPage);

  // Fungsi untuk halaman selanjutnya.
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Fungsi untuk halaman sebelumnya.
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold">Manage Promotions</h1>
      <button
        onClick={() => setIsAddModalOpen(true)} // Membuka modal untuk menambah promo.
        className="px-4 py-2 my-4 text-white bg-green-500 rounded-md hover:bg-green-600"
      >
        (+) Add Promo
      </button>

      {/* Notifikasi pesan */}
      {message && (
        <div
          className={`fixed top-4 right-4 flex items-center space-x-2 px-4 py-2 rounded-md shadow-lg
            ${toastType === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' : ''}
            ${toastType === 'error' ? 'bg-red-100 border-l-4 border-red-500 text-red-700' : ''}
          `}
        >
          {toastType === 'success' && <span className="text-green-600">✔️</span>}
          {toastType === 'error' && <span className="text-red-600">❌</span>}
          <p>{message}</p>
          <button onClick={() => setMessage('')} className="ml-4 font-bold">X</button>
        </div>
      )}

      <table className="min-w-full mt-4 bg-white shadow-md rounded-3xl">
        <thead>
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Promo Code</th>
            <th className="p-4 text-left">Created At</th>
            <th className="p-4 text-left">Updated At</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPromos.map((promo) => (
            <tr key={promo.id}>
              <td className="p-4">{promo.title}</td>
              <td className="p-4">{promo.promo_code}</td>
              <td className="p-4">{formatDate(promo.createdAt)}</td> {/* Menampilkan tanggal pembuatan */}
              <td className="p-4">{formatDate(promo.updatedAt)}</td> {/* Menampilkan tanggal update */}
              <td className="p-4">
                <div className="flex space-x-2">
                  <button
                    className="relative p-2 bg-yellow-500 rounded-full hover:bg-yellow-600 group"
                    onClick={() => {
                      setEditingPromo(promo); // Menyimpan promo yang akan diedit.
                      setIsEditModalOpen(true); // Membuka modal edit.
                    }}
                  >
                    <FaEdit className="text-white" />
                    <span className="absolute hidden px-2 py-1 text-xs text-white transform -translate-x-1/2 bg-gray-800 rounded -top-8 left-1/2 group-hover:block">
                      Edit
                    </span>
                  </button>
                  <button
                    className="relative p-2 bg-red-500 rounded-full hover:bg-red-600 group"
                    onClick={() => {
                      setDeletingPromo(promo); // Menyimpan promo yang akan dihapus.
                      setIsDeleteModalOpen(true); // Membuka modal delete.
                    }}
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

      {/* Kontrol Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="p-2 text-white bg-gray-500 rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={handlePrevPage}
          disabled={currentPage === 1} // Disable jika di halaman pertama.
        >
          <FaArrowLeft />
        </button>
        <span className="flex items-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="p-2 text-white bg-gray-500 rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={handleNextPage}
          disabled={currentPage === totalPages} // Disable jika di halaman terakhir.
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Modal Tambah Promo */}
      <AddPromoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onPromoAdded={() => {
          fetchPromos(); // Refresh data promo setelah menambah.
          setToastType('success');
          setMessage('Promo added successfully');
        }}
      />

      {/* Modal Edit Promo */}
      {editingPromo && (
        <EditPromoModal
          isOpen={isEditModalOpen}
          promo={editingPromo}
          onClose={() => setIsEditModalOpen(false)}
          onChange={(updatedPromo) => setEditingPromo(updatedPromo)} // Memperbarui data promo yang sedang diedit.
          onSave={handleUpdatePromo} // Menyimpan perubahan promo.
        />
      )}

      {/* Modal Hapus Promo */}
      {deletingPromo && (
        <DeletePromoModal
          promo={deletingPromo}
          onClose={handleCloseDeleteModal} // Menutup modal hapus.
          fetchPromos={fetchPromos} // Memuat ulang data setelah penghapusan.
          onDelete={handleDeletePromo} // Menangani penghapusan promo.
        />
      )}
    </div>
  );
};

export default PromosTable;