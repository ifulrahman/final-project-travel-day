import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi
import australia from '../assets/australia.jpg';
import makkah from '../assets/makkah.jpg';
import mandalika from '../assets/mandalika.jpg';

// Komponen Destinations untuk menampilkan daftar destinasi dalam bentuk kartu
const Destinations = () => {
  const navigate = useNavigate(); // Inisialisasi hook useNavigate

  return (
    <section className="p-6 pb-16 md:p-12 font-league-spartan bg-blueBg pt-18 md:pb-28">
      {/* Judul besar sebagai latar belakang untuk tampilan */}
      <h2 className="text-[45px] md:text-[85px] font-extralight font-lora mb-[-10px] md:mb-[-30px] text-left text-blueText text-opacity-10 pl-6 md:pl-24">
        Explore
      </h2>
      {/* Judul utama untuk bagian ini */}
      <h2 className="text-[28px] md:text-[45px] font-lora font-semibold mb-4 md:mb-8 text-left text-blueText pl-6 md:pl-24">
        Our Destinations
      </h2>

      {/* Grid responsif untuk menampilkan destinasi dalam bentuk kartu */}
      <div className="grid grid-cols-1 gap-8 px-6 md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:px-24 mb-28">

        {/* Kartu destinasi untuk Australia */}
        <div className="relative overflow-hidden transition-shadow duration-300 bg-white shadow-lg rounded-3xl hover:shadow-2xl">
          <img src={australia} alt="Australia" className="object-cover w-full h-64 md:h-72 lg:h-80" />
          <div className="p-4 bg-white md:p-6">
            <h3 className="flex items-center justify-between text-lg font-medium md:text-xl md:text-2xl text-blueText">
              Australia
              {/* Rating menggunakan icon bintang */}
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="text-sm text-yellow-400 md:text-base fa fa-star"></i>
                ))}
              </div>
            </h3>
            {/* Deskripsi singkat tentang destinasi */}
            <p className="mt-5 text-sm text-gray-500 md:text-base">
              We offer a variety of travel packages, from budget-friendly adventures to luxury getaways.
            </p>
            {/* Tombol dan harga paket */}
            <div className="flex items-center justify-between mt-7">
              <button
                className="px-3 py-2 text-sm text-white transition rounded-lg md:px-4 md:py-2 bg-mainBlue hover:bg-blue-700 md:text-base"
                onClick={() => navigate('/404-not-found')} // Arahkan ke halaman 404
              >
                Explore Now
              </button>
              <span className="text-sm md:text-lg text-mainBlue">IDR 3.998.000<span className="text-[10px] md:text-[11px] text-black font-medium"> PER TOUR</span></span>
            </div>
          </div>
        </div>

        {/* Kartu destinasi untuk Mandalika */}
        <div className="relative overflow-hidden transition-shadow duration-300 bg-white shadow-lg rounded-3xl hover:shadow-2xl">
          <img src={mandalika} alt="Mandalika" className="object-cover w-full h-64 md:h-72 lg:h-80" />
          <div className="p-4 bg-white md:p-6">
            <h3 className="flex items-center justify-between text-lg font-medium md:text-xl md:text-2xl text-blueText">
              Mandalika
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="text-sm text-yellow-400 md:text-base fa fa-star"></i>
                ))}
              </div>
            </h3>
            <p className="mt-5 text-sm text-gray-500 md:text-base">
              Experience the wonders of Mandalika with our exclusive tour packages.
            </p>
            <div className="flex items-center justify-between mt-7">
              <button
                className="px-3 py-2 text-sm text-white transition rounded-lg md:px-4 md:py-2 bg-mainBlue hover:bg-blue-700 md:text-base"
                onClick={() => navigate('/404-not-found')} // Arahkan ke halaman 404
              >
                Explore Now
              </button>
              <span className="text-sm md:text-lg text-mainBlue">IDR 500.899<span className="text-[10px] md:text-[11px] text-black font-medium"> PER TOUR</span></span>
            </div>
          </div>
        </div>

        {/* Kartu destinasi untuk Makkah */}
        <div className="relative overflow-hidden transition-shadow duration-300 bg-white shadow-lg rounded-3xl hover:shadow-2xl">
          <img src={makkah} alt="Makkah" className="object-cover w-full h-64 md:h-72 lg:h-80" />
          <div className="p-4 bg-white md:p-6">
            <h3 className="flex items-center justify-between text-lg font-medium md:text-xl md:text-2xl text-blueText">
              Makkah
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="text-sm text-yellow-400 md:text-base fa fa-star"></i>
                ))}
              </div>
            </h3>
            <p className="mt-5 text-sm text-gray-500 md:text-base">
              Experience a spiritual journey to Makkah with our premium packages.
            </p>
            <div className="flex items-center justify-between mt-7">
              <button
                className="px-3 py-2 text-sm text-white transition rounded-lg md:px-4 md:py-2 bg-mainBlue hover:bg-blue-700 md:text-base"
                onClick={() => navigate('/404-not-found')} // Arahkan ke halaman 404
              >
                Explore Now
              </button>
              <span className="text-sm md:text-lg text-mainBlue">IDR 12.750.999<span className="text-[10px] md:text-[11px] text-black font-medium"> PER TOUR</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Destinations;