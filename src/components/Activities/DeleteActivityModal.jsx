import React from 'react';

// Komponen modal untuk mengonfirmasi penghapusan aktivitas.
const DeleteActivityModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null; // Jika modal tidak terbuka, jangan render apa pun.

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Background semi-transparan untuk memberi efek fokus pada modal */}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Are you sure you want to delete this activity?</h2>
        <p className="mb-6">This action cannot be undone.</p>
        <div className="flex justify-end space-x-4">
          {/* Tombol untuk membatalkan penghapusan */}
          <button
            onClick={onClose} // Menutup modal tanpa menghapus data.
            className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          {/* Tombol untuk mengonfirmasi penghapusan */}
          <button
            onClick={onDelete} // Memanggil fungsi untuk menghapus data.
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteActivityModal;