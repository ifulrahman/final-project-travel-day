import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import icon arrow
import UserCard from './UserCard'; // Import komponen UserCard untuk menampilkan data user

// Komponen utama untuk menampilkan daftar user
const UserList = () => {
    const [users, setUsers] = useState([]); // State untuk menyimpan data semua user
    const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
    const usersPerPage = 8; // Jumlah user per halaman

    // useEffect untuk mengambil data user dari API saat komponen pertama kali dimuat
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user',
                    {
                        headers: {
                            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiIxZDE0OWNhYy1iOWJhLTQyYTMtYWY3ZC00MGZjOTMzMmRjMTciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY1NTc3Nzd9.XfJCJ1vUoRCuLst1Y1R2fnOAqA8cgHIvzsWkQQnYhpo',
                            'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                        },
                    }
                );
                setUsers(response.data.data); // Menyimpan data user ke state
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers(); // Memanggil fungsi untuk mengambil data user
    }, []);

    // Menghitung indeks data user yang akan ditampilkan
    const indexOfLastUser = currentPage * usersPerPage; // Indeks user terakhir yang ditampilkan di halaman ini
    const indexOfFirstUser = indexOfLastUser - usersPerPage; // Indeks user pertama yang ditampilkan di halaman ini
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser); // Mendapatkan user yang akan ditampilkan di halaman saat ini

    const totalPages = Math.ceil(users.length / usersPerPage); // Menghitung total halaman yang diperlukan

    // Fungsi untuk mengganti halaman berikutnya
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1); // Mengubah ke halaman berikutnya jika belum mencapai halaman terakhir
        }
    };

    // Fungsi untuk mengganti halaman sebelumnya
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1); // Mengubah ke halaman sebelumnya jika belum di halaman pertama
        }
    };

    return (
        <div className="p-4">
            {/* Menampilkan daftar user dalam grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {currentUsers.map((user) => (
                    <UserCard key={user.id} user={user} /> // Menampilkan setiap user menggunakan komponen UserCard
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                {/* Tombol untuk halaman sebelumnya */}
                <button
                    className="p-2 text-white bg-gray-500 rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1} // Disable tombol jika di halaman pertama
                >
                    <FaArrowLeft />
                </button>
                {/* Menampilkan halaman saat ini dan total halaman */}
                <span className="flex items-center mx-4">
                    Page {currentPage} of {totalPages}
                </span>
                {/* Tombol untuk halaman berikutnya */}
                <button
                    className="p-2 text-white bg-gray-500 rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages} // Disable tombol jika di halaman terakhir
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default UserList;