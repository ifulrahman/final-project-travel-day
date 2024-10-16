import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaHome } from 'react-icons/fa'; // Ikon untuk tombol hapus dan kembali ke Home
import { useNavigate } from 'react-router-dom'; // Untuk navigasi
import DeleteCartModal from '../components/Cart/DeleteCartModal'; // Import komponen modal untuk konfirmasi penghapusan
import BankLogo from '../assets/bank-logo.jpg';
import tdLogo from '../assets/td-logo.png'; // Import logo TD

const CartsPage = () => {
  // State untuk menyimpan data cart, pesan toast, dan kontrol modal
  const [carts, setCarts] = useState([]);
  const [message, setMessage] = useState(''); // State untuk menampilkan pesan notifikasi toast
  const [toastType, setToastType] = useState(''); // State untuk tipe toast (success atau error)
  const [selectedCart, setSelectedCart] = useState(null); // State untuk item cart yang dipilih untuk dihapus
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State untuk kontrol modal delete
  const navigate = useNavigate(); // Menggunakan navigate untuk kembali ke Home

  // UseEffect untuk mengambil data carts dari API saat komponen pertama kali di-render
  useEffect(() => {
    const fetchCarts = async () => {
      try {
        // Request untuk mengambil data cart
        const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/carts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
        });
        setCarts(response.data.data); // Mengatur data carts yang diterima dari API
      } catch (error) {
        console.error('Failed to fetch carts:', error);
        setMessage('Failed to fetch carts'); // Pesan error jika gagal
        setToastType('error'); // Tipe toast error
        setTimeout(() => {
          setMessage(''); // Hapus pesan toast setelah 3 detik
        }, 3000);
      }
    };

    fetchCarts(); // Panggil fungsi fetchCarts saat komponen di-mount
  }, []);

  // Fungsi untuk menghapus item cart
  const handleDeleteCart = async () => {
    if (selectedCart) {
      try {
        // Request untuk menghapus item cart berdasarkan ID
        await axios.delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-cart/${selectedCart.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
        });
        // Mengupdate state carts dengan menghapus item yang sesuai
        setCarts((prevCarts) => prevCarts.filter((cart) => cart.id !== selectedCart.id));
        setMessage('Item removed from cart'); // Pesan sukses
        setToastType('success'); // Tipe toast sukses
        setSelectedCart(null); // Reset selected cart setelah penghapusan
      } catch (error) {
        console.error('Failed to delete cart item:', error);
        setMessage('Failed to remove item from cart'); // Pesan error jika gagal menghapus
        setToastType('error');
      }

      setIsDeleteModalOpen(false); // Tutup modal setelah menghapus
      setTimeout(() => {
        setMessage(''); // Hapus pesan toast setelah 3 detik
      }, 3000);
    }
  };

  // Fungsi untuk mengubah jumlah item di cart
  const handleQuantityChange = async (cart, delta) => {
    const newQuantity = cart.quantity + delta;
    if (newQuantity > 0) {
      try {
        // Request untuk update jumlah item
        await axios.post(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-cart/${cart.id}`,
          { quantity: newQuantity },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            },
          }
        );
        // Update state carts dengan jumlah baru
        setCarts(prevCarts =>
          prevCarts.map(c => (c.id === cart.id ? { ...c, quantity: newQuantity } : c))
        );
        setMessage('Quantity updated'); // Pesan sukses
        setToastType('success');
      } catch (error) {
        console.error('Failed to update cart quantity:', error);
        setMessage('Failed to update cart quantity'); // Pesan error jika gagal update
        setToastType('error');
      }

      setTimeout(() => {
        setMessage(''); // Hapus pesan setelah 3 detik
      }, 3000);
    }
  };

  // Fungsi untuk format Rupiah (IDR) dengan titik di setiap 3 angka
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  };

  // Fungsi untuk menghitung subtotal dari seluruh item cart
  const calculateSubtotal = () => {
    return carts.reduce((sum, cart) => sum + cart.activity.price * cart.quantity, 0);
  };

  const tax = 0;
  const shipping = 0;
  const total = calculateSubtotal() + tax + shipping; // Total keseluruhan harga

  // Fungsi untuk membuka modal konfirmasi delete
  const openDeleteModal = (cart) => {
    setSelectedCart(cart); // Pilih cart yang akan dihapus
    setIsDeleteModalOpen(true); // Tampilkan modal konfirmasi
  };

  // Fungsi untuk menutup modal tanpa menghapus
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false); // Tutup modal
    setSelectedCart(null); // Reset selected cart
  };

  return (
    <div className="container p-6 mx-auto font-league-spartan">
      {/* Logo TD di pojok kiri atas */}
      <div className="absolute top-4 left-4">
        <img src={tdLogo} alt="TD Logo" className="w-24 h-12" />
      </div>

      <h1 className="mb-6 font-bold text-center text-[30px] text-blue-600">Cart</h1>

      {/* Layout Grid untuk Cart dan Informasi Pembayaran */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Kolom Kiri: Shopping Cart */}
        <div className="p-4 bg-white border rounded-lg shadow-lg lg:col-span-2">
          <h2 className="mb-4 text-xl font-bold">Shopping Cart</h2>
          {carts.length > 0 ? (
            <div>
              {/* Render item cart */}
              {carts.map((cart) => (
                <div key={cart.id} className="flex justify-between py-4 border-b">
                  <div className="flex items-center space-x-4">
                    <img src={cart.activity.imageUrls[0]} alt={cart.activity.title} className="object-cover w-12 h-12 rounded-lg" />
                    <div>
                      <h3 className="text-lg font-semibold">{cart.activity.title}</h3>
                      <p className="text-sm text-gray-500">Price: {formatRupiah(cart.activity.price)}/ person</p>
                      <div className="flex items-center mt-1 space-x-2">
                        {/* Tombol untuk mengurangi jumlah */}
                        <button
                          className="px-2 py-1 bg-gray-200 rounded-full"
                          onClick={() => handleQuantityChange(cart, -1)}
                        >
                          -
                        </button>
                        <span>{cart.quantity}</span>
                        {/* Tombol untuk menambah jumlah */}
                        <button
                          className="px-2 py-1 bg-gray-200 rounded-full"
                          onClick={() => handleQuantityChange(cart, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* Harga total item cart */}
                    <span className="font-bold text-green-500">{formatRupiah(cart.activity.price * cart.quantity)}</span>
                    {/* Tombol delete */}
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => openDeleteModal(cart)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}

              {/* Subtotal dan total */}
              <div className="mt-4">
                <p className="text-right">Subtotal: {formatRupiah(calculateSubtotal())}</p>
                <p className="text-xl font-bold text-right">Total: {formatRupiah(total)}</p>
              </div>
            </div>
          ) : (
            <p className='opacity-50'><i>Your cart is empty</i></p>
          )}
        </div>

        {/* Kolom Kanan: Informasi Pembayaran */}
        <div className="p-4 bg-white border rounded-lg shadow-lg">
          <h2 className="mb-4 text-xl font-bold">Your Information</h2>
          <div className="mb-4">
            <p>Role : User</p>
          </div>

          <h2 className="mb-4 text-xl font-bold">Payment Options</h2>
          <div className="flex justify-center space-x-4">
            <img src={BankLogo} alt="Bank" className="h-8 sm:h-6 lg:h-10" />
          </div>
          <button className="w-full px-6 py-2 mt-4 font-bold text-white bg-green-500 rounded-full hover:bg-green-600">
            Buy now
          </button>
        </div>
      </div>

      {/* Tombol "Back to Home" di bagian bawah */}
      <div className="mt-8 text-start">
        <button
          className="flex items-center px-4 py-2 text-white bg-gray-500 rounded-full hover:bg-gray-600"
          onClick={() => navigate('/')}
        >
          <FaHome className="mr-2" /> Back to Home
        </button>
      </div>

      {/* Toast Notification untuk pesan sukses atau error */}
      {message && (
        <div
          className={`fixed top-4 right-4 flex items-center space-x-2 px-4 py-2 rounded-md shadow-lg
            ${toastType === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' : ''}
            ${toastType === 'error' ? 'bg-red-100 border-l-4 border-red-500 text-red-700':''}`}
        >
          {toastType === 'success' && <span className="text-green-600">✔️</span>}
          {toastType === 'error' && <span className="text-red-600">❌</span>}
          <p>{message}</p>
          {/* Tombol untuk menutup toast */}
          <button onClick={() => setMessage('')} className="ml-4 font-bold">X</button>
        </div>
      )}

      {/* Modal konfirmasi delete */}
      {isDeleteModalOpen && (
        <DeleteCartModal
          onClose={closeDeleteModal}
          onConfirm={handleDeleteCart}
          cartItem={selectedCart}
        />
      )}
    </div>
  );
};

export default CartsPage;