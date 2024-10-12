import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Komponen modal untuk melihat dan mengedit profil pengguna.
const ModalProfile = ({
  isOpen, // Menyimpan status apakah modal terbuka atau tidak.
  onClose, // Fungsi untuk menutup modal.
  profileData, // Menyimpan data profil yang akan diedit.
  setProfileData, // Fungsi untuk mengubah data profil.
  setUser, // Fungsi untuk memperbarui data user setelah berhasil diperbarui.
  setMessage, // Fungsi untuk mengatur pesan notifikasi.
  setToastType, // Fungsi untuk mengatur tipe notifikasi (sukses/error).
  refreshUserData, // Fungsi untuk memperbarui data pengguna setelah update.
}) => {
  const [loading, setLoading] = useState(false); // Menyimpan status loading saat proses update.
  const [userData, setUserData] = useState(null); // Menyimpan data pengguna yang diambil dari API.

  // Mengambil data user saat modal dibuka.
  useEffect(() => {
    if (isOpen) {
      const token = localStorage.getItem('token'); // Mengambil token dari local storage.
      axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        },
      })
      .then((response) => {
        setUserData(response.data.data); // Menyimpan data user yang berhasil diambil.
        setProfileData({
          name: response.data.data.name,
          email: response.data.data.email,
          phoneNumber: response.data.data.phoneNumber,
        });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setMessage('Failed to load user data'); // Menampilkan pesan error jika gagal mengambil data.
        setToastType('error');
      });
    }
  }, [isOpen, setProfileData, setMessage, setToastType]);

  // Fungsi untuk mengupload gambar profil baru.
  const handleImageUpload = (imageFile) => {
    const token = localStorage.getItem('token');
    if (!token || !imageFile) return;

    const formData = new FormData();
    formData.append('image', imageFile);

    return axios.post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data.url) // Mengembalikan URL gambar yang berhasil diupload.
    .catch((error) => {
      console.error('Error uploading image:', error);
      setMessage('Failed to upload image'); // Menampilkan pesan error jika gagal mengupload gambar.
      setToastType('error');
    });
  };

  // Fungsi untuk memperbarui profil pengguna.
  const handleProfileUpdate = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoading(true);
    let profileImageUrl = userData.profilePictureUrl; // Menggunakan URL gambar lama jika tidak ada gambar baru.

    // Jika ada gambar baru, lakukan upload.
    if (profileData.profileImage) {
      const uploadedImageUrl = await handleImageUpload(profileData.profileImage);
      if (uploadedImageUrl) {
        profileImageUrl = uploadedImageUrl; // Mengganti URL gambar jika upload berhasil.
      }
    }

    const formData = {
      name: profileData.name,
      email: profileData.email,
      phoneNumber: profileData.phoneNumber,
      profilePictureUrl: profileImageUrl,
    };

    axios.post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
      },
    })
    .then((response) => {
      setUser(response.data.data); // Memperbarui data user di aplikasi.
      onClose(); // Menutup modal setelah berhasil update.
      setMessage('Profile updated successfully'); // Menampilkan pesan sukses.
      setToastType('success');
      refreshUserData(); // Memperbarui data user di tampilan.
    })
    .catch((error) => {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile'); // Menampilkan pesan error jika update gagal.
      setToastType('error');
    })
    .finally(() => {
      setLoading(false); // Mengatur status loading menjadi false setelah selesai.
    });
  };

  if (!isOpen) return null; // Menyembunyikan modal jika tidak terbuka.

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="w-full max-w-4xl p-4 mx-2 bg-white rounded-lg shadow-lg sm:p-6 md:p-8">
        <h2 className="mb-4 text-xl font-bold md:text-2xl">Profile</h2>
        <div className="flex flex-col md:flex-row">
          {userData && (
            <div className="flex flex-col items-center p-4 md:w-1/2">
              <img
                src={userData.profilePictureUrl || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="object-cover w-24 h-24 mb-4 rounded-full md:w-32 md:h-32"
              />
              <p className="text-lg font-semibold">{userData.name}</p>
              <p className="text-sm text-gray-500">{userData.role}</p>
              <p className="mt-2 text-sm text-gray-500">Phone: {userData.phoneNumber}</p>
            </div>
          )}

          <div className="p-4 md:w-1/2">
            <h3 className="mb-4 text-lg font-bold">Edit Profile:</h3>
            <input
              type="text"
              value={profileData.name || ''}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              placeholder="Your name"
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="email"
              value={profileData.email || ''}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              placeholder="Your email"
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              value={profileData.phoneNumber || ''}
              onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
              placeholder="Phone Number"
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="file"
              onChange={(e) => setProfileData({ ...profileData, profileImage: e.target.files[0] })}
              className="w-full mb-4"
            />
            <button
              onClick={handleProfileUpdate} // Menyimpan perubahan profil.
              className="w-full px-4 py-2 mb-2 text-white bg-blue-600 rounded md:w-auto hover:bg-blue-700"
              disabled={loading} // Menonaktifkan tombol saat proses update berlangsung.
            >
              {loading ? 'Updating...' : 'Update Profile'} {/* Menampilkan status saat proses update berlangsung. */}
            </button>
            <button
              onClick={onClose} // Menutup modal tanpa melakukan perubahan.
              className="w-full px-4 py-2 text-red-600 md:w-auto"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProfile;