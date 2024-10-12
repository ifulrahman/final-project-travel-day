import React from 'react';
import axios from 'axios';

// Komponen modal untuk menghapus kategori.
const DeleteCategoryModal = ({ category, onClose, refreshCategories }) => {
    const API_KEY = '24405e01-fbc1-45a5-9f5a-be13afcd757c'; // API Key untuk autentikasi ke API.
    const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiIxZDE0OWNhYy1iOWJhLTQyYTMtYWY3ZC00MGZjOTMzMmRjMTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY1NTc3Nzd9.XfJCJ1vUoRCuLst1Y1R2fnOAqA8cgHIvzsWkQQnYhpo'; // Token untuk autentikasi Bearer ke API.

    // Fungsi untuk menghapus kategori.
    const handleDeleteCategory = async () => {
        try {
            await axios.delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-category/${category.id}`, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'apiKey': API_KEY
                }
            });
            await refreshCategories(); // Memperbarui daftar kategori setelah penghapusan.
            onClose(); // Menutup modal setelah kategori berhasil dihapus.

            if (currentItems.length === 1 && currentPage > 1) {
                setCurrentPage((prevPage) => prevPage - 1); // Mengatur ulang halaman jika item pada halaman saat ini habis.
            }
        } catch (error) {
            console.error('Error deleting category', error); // Menampilkan error jika terjadi kegagalan saat menghapus.
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="mb-2 text-xl font-bold">Delete Category</h3>
                <p>Are you sure you want to delete the category "{category.name}"?</p> {/* Menampilkan nama kategori yang akan dihapus */}
                <div className="flex justify-end mt-4">
                    <button
                        className="px-4 py-2 mr-2 bg-gray-300 rounded"
                        onClick={onClose} // Menutup modal tanpa menghapus kategori.
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 text-white bg-red-500 rounded"
                        onClick={handleDeleteCategory} // Menjalankan fungsi untuk menghapus kategori.
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCategoryModal;