import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight, FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa'; // Import icons dari react-icons untuk tombol.
import EditBannerModal from './EditBannerModal';
import DeleteBannerModal from './DeleteBannerModal';
import AddBannerModal from './AddBannerModal';
import DetailsBannerModal from './DetailsBannerModal'; // Tambahkan import modal detail banner

// Komponen utama untuk menampilkan daftar banner, menambah, mengedit, dan menghapus banner.
const BannersTable = () => {
  const [banners, setBanners] = useState([]); // Menyimpan daftar banner yang diambil dari API.
  const [selectedBanner, setSelectedBanner] = useState(null); // Menyimpan banner yang sedang dipilih untuk diedit atau dihapus.
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Menyimpan status apakah modal edit terbuka.
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Menyimpan status apakah modal delete terbuka.
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Menyimpan status apakah modal tambah terbuka.
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // Menyimpan status modal detail
  const [message, setMessage] = useState(''); // Menyimpan pesan notifikasi.
  const [toastType, setToastType] = useState(''); // Menyimpan jenis notifikasi (sukses/gagal).
  const [currentPage, setCurrentPage] = useState(1); // Menyimpan nomor halaman saat ini pada tabel.
  const bannersPerPage = 6; // Menentukan jumlah banner yang ditampilkan per halaman.

  const apiKey = '24405e01-fbc1-45a5-9f5a-be13afcd757c'; // API Key untuk autentikasi ke API.
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiIxZDE0OWNhYy1iOWJhLTQyYTMtYWY3ZC00MGZjOTMzMmRjMTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY1NTc3Nzd9.XfJCJ1vUoRCuLst1Y1R2fnOAqA8cgHIvzsWkQQnYhpo'; // Token untuk autentikasi Bearer ke API.

  useEffect(() => {
    fetchBanners(); // Mengambil data banner saat komponen pertama kali dirender.
  }, []);

  // Fungsi untuk mengambil data banner dari API.
  const fetchBanners = async () => {
    try {
      const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners', {
        headers: {
          apiKey: apiKey,
          Authorization: `Bearer ${token}`,
        },
      });
      setBanners(response.data.data); // Menyimpan data banner yang berhasil diambil ke dalam state.
    } catch (error) {
      console.error('Error fetching banners', error);
      showToast('Failed to fetch banners', 'error'); // Menampilkan notifikasi jika gagal mengambil data.
    }
  };

  // Fungsi untuk membuka modal edit dan menyimpan banner yang dipilih.
  const handleEditClick = (banner) => {
    setSelectedBanner(banner);
    setIsEditModalOpen(true);
  };

  // Fungsi untuk membuka modal delete dan menyimpan banner yang dipilih.
  const handleDeleteClick = (banner) => {
    setSelectedBanner(banner);
    setIsDeleteModalOpen(true);
  };

  // Fungsi untuk membuka modal tambah banner.
  const handleAddBannerClick = () => {
    setIsAddModalOpen(true);
  };

  // Fungsi untuk membuka modal detail banner.
  const handleDetailClick = (banner) => {
    setSelectedBanner(banner);
    setIsDetailModalOpen(true);
  };

  // Fungsi untuk menampilkan notifikasi (toast).
  const showToast = (message, type) => {
    setMessage(message);
    setToastType(type);
    setTimeout(() => {
      setMessage(''); // Menghilangkan pesan setelah beberapa detik.
    }, 3000);
  };

  // Logika untuk pagination.
  const indexOfLastBanner = currentPage * bannersPerPage;
  const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
  const currentBanners = banners.slice(indexOfFirstBanner, indexOfLastBanner);

  const totalPages = Math.ceil(banners.length / bannersPerPage); // Menghitung jumlah total halaman.

  // Fungsi untuk pindah ke halaman selanjutnya.
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Fungsi untuk pindah ke halaman sebelumnya.
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold md:text-3xl">Banner List</h1>
        <button
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          onClick={handleAddBannerClick} // Membuka modal tambah banner.
        >
          (+) Add Banner
        </button>
      </div>
      {/* Menampilkan daftar banner dengan grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {currentBanners.map((banner) => (
          <div key={banner.id} className="overflow-hidden bg-white shadow rounded-3xl">
            <img src={banner.imageUrl} alt={banner.name} className="object-cover w-full h-44" />
            <div className="p-4">
              <h2 className="text-lg font-bold md:text-xl">{banner.name}</h2>
              <div className="flex justify-start mt-2">
                <button
                  className="relative p-2 mr-2 bg-yellow-500 rounded-full hover:bg-yellow-600 group"
                  onClick={() => handleEditClick(banner)} // Memilih banner untuk diedit.
                >
                  <FaEdit className="text-white" />
                  <span className="absolute hidden px-2 py-1 text-xs text-white transform -translate-x-1/2 bg-gray-800 rounded -top-8 left-1/2 group-hover:block">
                    Edit
                  </span>
                </button>
                <button
                  className="relative p-2 mr-2 bg-red-500 rounded-full hover:bg-red-600 group"
                  onClick={() => handleDeleteClick(banner)} // Memilih banner untuk dihapus.
                >
                  <FaTrash className="text-white" />
                  <span className="absolute hidden px-2 py-1 text-xs text-white transform -translate-x-1/2 bg-gray-800 rounded -top-8 left-1/2 group-hover:block">
                    Delete
                  </span>
                </button>
                <button
                  className="relative p-2 bg-blue-500 rounded-full hover:bg-blue-600 group"
                  onClick={() => handleDetailClick(banner)} // Memilih banner untuk melihat detail
                >
                  <FaInfoCircle className="text-white" />
                  <span className="absolute hidden px-2 py-1 text-xs text-white transform -translate-x-1/2 bg-gray-800 rounded -top-8 left-1/2 group-hover:block">
                    Details
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Kontrol Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="p-2 text-white bg-gray-500 rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={handlePrevPage}
          disabled={currentPage === 1} // Menonaktifkan tombol jika berada di halaman pertama.
        >
          <FaArrowLeft />
        </button>
        <span className="flex items-center">
          Page {currentPage} of {totalPages} {/* Menampilkan nomor halaman saat ini */}
        </span>
        <button
          className="p-2 text-white bg-gray-500 rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={handleNextPage}
          disabled={currentPage === totalPages} // Menonaktifkan tombol jika berada di halaman terakhir.
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Modal untuk menambah banner */}
      {isAddModalOpen && (
        <AddBannerModal
          onClose={() => setIsAddModalOpen(false)}
          onBannerAdded={() => {
            fetchBanners(); // Memperbarui daftar banner setelah menambah.
            showToast('Banner added successfully', 'success'); // Menampilkan notifikasi sukses.
          }}
        />
      )}

      {/* Modal untuk mengedit banner */}
      {isEditModalOpen && (
        <EditBannerModal
          banner={selectedBanner}
          onClose={() => setIsEditModalOpen(false)}
          onBannerUpdated={() => {
            fetchBanners(); // Memperbarui daftar banner setelah mengedit.
            showToast('Banner updated successfully', 'success'); // Menampilkan notifikasi sukses.
          }}
        />
      )}

      {/* Modal untuk menghapus banner */}
      {isDeleteModalOpen && (
        <DeleteBannerModal
          banner={selectedBanner}
          onClose={() => setIsDeleteModalOpen(false)}
          onBannerDeleted={() => {
            fetchBanners(); // Memperbarui daftar banner setelah menghapus.
            showToast('Banner deleted successfully', 'success'); // Menampilkan notifikasi sukses.
          }}
        />
      )}

      {/* Modal untuk melihat detail banner */}
      {isDetailModalOpen && (
        <DetailsBannerModal
          banner={selectedBanner}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}

      {/* Custom Toast untuk menampilkan pesan notifikasi */}
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
    </div>
  );
};

export default BannersTable;