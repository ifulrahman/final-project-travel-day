import React, { useState } from 'react';
import { Switch } from '@headlessui/react'; // Menggunakan komponen Switch dari Headless UI untuk toggle.
import axios from 'axios';

// Komponen UserCard menerima data user sebagai props dan menampilkan detail user.
const UserCard = ({ user }) => {
    // State untuk melacak apakah user adalah admin atau bukan.
    const [isAdmin, setIsAdmin] = useState(user.role === 'admin');
    const [message, setMessage] = useState(''); // State untuk pesan toast.
    const [toastType, setToastType] = useState(''); // State untuk tipe pesan (success atau error).

    // Fungsi untuk mengubah peran (role) user.
    const handleRoleChange = async () => {
        try {
            // Mengirim permintaan API untuk memperbarui peran user.
            const response = await axios.post(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${user.id}`,
                { role: isAdmin ? 'user' : 'admin' }, // Mengubah role berdasarkan state isAdmin.
                {
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiIxZDE0OWNhYy1iOWJhLTQyYTMtYWY3ZC00MGZjOTMzMmRjMTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY1NTc3Nzd9.XfJCJ1vUoRCuLst1Y1R2fnOAqA8cgHIvzsWkQQnYhpo',
                        'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                    },
                }
            );
            setIsAdmin(!isAdmin); // Mengubah status isAdmin sesuai dengan perubahan yang dilakukan.
            showToast('Role updated successfully', 'success'); // Menampilkan pesan sukses.
            console.log('Role updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating user role:', error);
            showToast('Error updating role', 'error'); // Menampilkan pesan error jika terjadi kesalahan.
        }
    };

    // Fungsi untuk menampilkan pesan (toast).
    const showToast = (message, type) => {
        setMessage(message);
        setToastType(type);
        setTimeout(() => {
            setMessage(''); // Menghapus pesan setelah 3 detik.
        }, 3000);
    };

    return (
        <div className="flex flex-col items-center p-4 text-center bg-white shadow-md rounded-3xl">
            {/* Menampilkan gambar profil user */}
            <img
                src={user.profilePictureUrl || 'https://via.placeholder.com/100'}
                alt={user.name}
                className="object-cover w-24 h-24 mb-4 rounded-full"
            />
            <h3 className="text-lg font-semibold">{user.name}</h3> {/* Nama user */}
            <p className="text-gray-500">{user.email}</p> {/* Email user */}
            <p className="text-gray-500">{user.phoneNumber || '-'}</p> {/* Nomor telepon user atau '-' jika tidak ada */}

            {/* Toggle untuk mengubah role antara admin dan user */}
            <div className="flex items-center mt-4">
                <span className="mr-2">{isAdmin ? 'Admin' : 'User'}</span>
                <Switch
                    checked={isAdmin}
                    onChange={handleRoleChange} // Memanggil fungsi untuk mengubah role ketika toggle berubah.
                    className={`${isAdmin ? 'bg-blue-500' : 'bg-gray-300'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
                >
                    <span className="sr-only">Toggle Role</span>
                    <span
                        className={`${isAdmin ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    />
                </Switch>
            </div>

            {/* Menampilkan pesan notifikasi (toast) jika ada */}
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

export default UserCard;