import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import AddActivityModal from './AddActivityModal';
import EditActivityModal from './EditActivityModal';
import DeleteActivityModal from './DeleteActivityModal';

// Komponen utama untuk menampilkan, menambah, mengedit, dan menghapus aktivitas.
const ActivitiesTable = () => {
  const [activities, setActivities] = useState([]); // Menyimpan daftar aktivitas yang diambil dari API.
  const [newActivity, setNewActivity] = useState({
    title: '',
    description: '',
    category: '',
  }); // Menyimpan data aktivitas baru yang akan ditambahkan.
  const [editingActivity, setEditingActivity] = useState(null); // Menyimpan data aktivitas yang sedang diedit.
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Menyimpan status apakah modal tambah aktivitas atau tidak.
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Menyimpan status apakah modal edit aktivitas atau tidak.
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Menyimpan status apakah modal hapus aktivitas atau tidak.
  const [activityToDelete, setActivityToDelete] = useState(null); // Menyimpan data aktivitas yang akan dihapus.
  const [message, setMessage] = useState(''); // Menyimpan pesan notifikasi (sukses/gagal).
  const [toastType, setToastType] = useState(''); // Menyimpan jenis notifikasi (sukses/gagal).
  const [currentPage, setCurrentPage] = useState(1); // Menyimpan nomor halaman saat ini pada tabel.
  const activitiesPerPage = 5; // Menentukan jumlah aktivitas yang ditampilkan per halaman.

  const apiKey = '24405e01-fbc1-45a5-9f5a-be13afcd757c'; // API Key untuk autentikasi ke API.
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiIxZDE0OWNhYy1iOWJhLTQyYTMtYWY3ZC00MGZjOTMzMmRjMTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY1NTc3Nzd9.XfJCJ1vUoRCuLst1Y1R2fnOAqA8cgHIvzsWkQQnYhpo'; // Token untuk autentikasi Bearer ke API.

  useEffect(() => {
    fetchActivities(); // Mengambil data aktivitas saat komponen pertama kali dirender.
  }, []);

  // Fungsi untuk mengambil data aktivitas dari API.
  const fetchActivities = async () => {
    try {
      const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities', {
        headers: {
          apiKey: apiKey,
          Authorization: `Bearer ${token}`,
        },
      });
      setActivities(response.data.data); // Menyimpan data aktivitas yang berhasil diambil ke dalam state.
    } catch (error) {
      console.error('Error fetching activities:', error); // Menampilkan error jika terjadi kegagalan.
    }
  };

  // Fungsi untuk menghapus aktivitas yang dipilih.
  const handleDeleteActivity = async () => {
    if (!activityToDelete) return; // Menghindari penghapusan jika tidak ada aktivitas yang dipilih.
    try {
      await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${activityToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKey,
          },
        }
      );
      fetchActivities(); // Memperbarui daftar aktivitas setelah penghapusan.
      setIsDeleteModalOpen(false); // Menutup modal hapus setelah berhasil.
      showToast('Activity deleted successfully', 'success'); // Menampilkan notifikasi sukses.
    } catch (error) {
      console.error('Error deleting activity:', error); // Menampilkan error jika penghapusan gagal.
      showToast('Failed to delete activity', 'error'); // Menampilkan notifikasi error.
    }
  };

  // Fungsi untuk menampilkan notifikasi selama beberapa detik.
  const showToast = (message, type) => {
    setMessage(message);
    setToastType(type);
    setTimeout(() => {
      setMessage(''); // Menghilangkan pesan setelah 3 detik.
    }, 3000);
  };

  // Komponen untuk menampilkan tiap baris aktivitas pada tabel.
  const ActivityItem = ({ activity }) => (
    <tr>
      <td className="p-4">{activity.title}</td>
      <td className="p-4">{activity.category.name}</td>
      <td className="p-4">{new Date(activity.createdAt).toLocaleDateString()}</td>
      <td className="p-4">{new Date(activity.updatedAt).toLocaleDateString()}</td>
      <td className="p-4">
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setEditingActivity(activity); // Menyimpan aktivitas yang akan diedit.
              setIsEditModalOpen(true); // Membuka modal edit.
            }}
            className="relative p-2 bg-yellow-500 rounded-full hover:bg-yellow-600 group"
          >
            <FaEdit className="text-white" />
            <span className="absolute hidden px-2 py-1 text-xs text-white transform -translate-x-1/2 bg-gray-800 rounded -top-8 left-1/2 group-hover:block">
              Edit
            </span>
          </button>
          <button
            onClick={() => {
              setActivityToDelete(activity); // Menyimpan aktivitas yang akan dihapus.
              setIsDeleteModalOpen(true); // Membuka modal hapus.
            }}
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
  );

  // Mengatur data aktivitas yang akan ditampilkan sesuai dengan halaman saat ini.
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = activities.slice(indexOfFirstActivity, indexOfLastActivity);
  const totalPages = Math.ceil(activities.length / activitiesPerPage); // Menghitung jumlah total halaman.

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
    <div className="p-8">
      <h1 className="text-3xl font-bold">Manage Activities</h1>
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="px-4 py-2 my-4 text-white bg-green-500 rounded-md hover:bg-green-600"
      >
        (+) Add Activity
      </button>

      {/* Menampilkan notifikasi jika ada pesan */}
      {message && (
        <div
          className={`fixed top-4 right-4 flex items-center space-x-2 px-4 py-2 rounded-md shadow-lg
            ${toastType === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' : ''}
            ${toastType === 'error' ? 'bg-red-100 border-l-4 border-red-500 text-red-700' : ''}
          `}
        >
          <span>{message}</span>
          <button onClick={() => setMessage('')} className="ml-4 font-bold">X</button>
        </div>
      )}

      {/* Tabel aktivitas */}
      <table className="min-w-full mt-4 bg-white shadow-md rounded-3xl">
        <thead>
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Created At</th>
            <th className="p-4 text-left">Updated At</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentActivities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} /> // Menampilkan tiap aktivitas di tabel.
          ))}
        </tbody>
      </table>

      {/* Navigasi pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="p-2 text-white bg-gray-500 rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </button>
        <span className="flex items-center">
          Page {currentPage} of {totalPages} {/* Menampilkan informasi halaman saat ini */}
        </span>
        <button
          className="p-2 text-white bg-gray-500 rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Modal untuk menambah, mengedit, dan menghapus aktivitas */}
      {isAddModalOpen && (
        <AddActivityModal
          isOpen={isAddModalOpen}
          activity={newActivity}
          onClose={() => setIsAddModalOpen(false)}
          onChange={setNewActivity}
          onActivityAdded={fetchActivities}
        />
      )}

      {editingActivity && (
        <EditActivityModal
          isOpen={isEditModalOpen}
          activity={editingActivity}
          onClose={() => setIsEditModalOpen(false)}
          onActivityUpdated={fetchActivities}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteActivityModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDeleteActivity}
        />
      )}
    </div>
  );
};

export default ActivitiesTable;