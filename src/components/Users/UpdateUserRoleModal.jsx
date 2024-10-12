import React from 'react';

// Komponen UpdateUserRoleModal menerima beberapa props seperti isOpen, onClose, onConfirm, userName, dan newRole.
// Digunakan untuk menampilkan modal konfirmasi perubahan peran (role) user.
const UpdateUserRoleModal = ({ isOpen, onClose, onConfirm, userName, newRole }) => {
    if (!isOpen) return null; // Jika modal tidak terbuka, jangan render apapun (return null).

    return (
        // Modal muncul di tengah layar dengan latar belakang yang agak gelap (bg-opacity-50).
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded-md shadow-md">
                <h2 className="text-lg font-semibold">Confirm Role Change</h2>
                {/* Menampilkan pesan konfirmasi perubahan role untuk user tertentu */}
                <p>Are you sure you want to change the role of <strong>{userName}</strong> to <strong>{newRole}</strong>?</p>
                <div className="flex justify-end mt-4">
                    {/* Tombol untuk membatalkan (menutup modal) */}
                    <button
                        className="px-4 py-2 mr-2 text-gray-700 bg-gray-300 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    {/* Tombol untuk mengonfirmasi perubahan role */}
                    <button
                        className="px-4 py-2 text-white bg-blue-500 rounded"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserRoleModal;