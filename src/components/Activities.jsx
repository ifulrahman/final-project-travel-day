import React from 'react';
import Slider from 'react-slick'; // Import Slider dari 'react-slick' untuk membuat tampilan slide

// Komponen Activities untuk menampilkan daftar aktivitas dalam bentuk slider
const Activities = ({ activities }) => {
  const settings = {
    dots: true, // Tampilkan titik navigasi di bawah slider
    infinite: true, // Slide akan terus berputar tanpa akhir
    speed: 500, // Kecepatan transisi slide
    slidesToShow: 4, // Tampilkan 4 slide pada layar besar
    slidesToScroll: 1, // Scroll satu slide setiap kali
    autoplay: true, // Aktifkan fitur autoplay
    autoplaySpeed: 3000, // Interval waktu autoplay (3 detik)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Tampilkan 3 slide pada layar menengah
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Tampilkan 2 slide pada layar kecil
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Tampilkan 1 slide pada layar sangat kecil
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Fungsi untuk memotong teks deskripsi jika lebih panjang dari maxLength
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <section className="p-6 bg-white md:p-12 font-league-spartan pt-18 pb-28">
      {/* Judul latar belakang besar yang bersifat dekoratif */}
      <h2 className="text-[45px] md:text-[85px] font-extralight font-lora mb-[-10px] md:mb-[-30px] text-left text-blueText text-opacity-10 pl-6 md:pl-24">
        Activities
      </h2>
      {/* Judul utama untuk bagian ini */}
      <h2 className="text-[28px] md:text-[45px] font-lora font-semibold mb-4 md:mb-8 text-left text-blueText pl-6 md:pl-24">
        Our Activities
      </h2>

      <div className="px-4 md:px-24 pb-36">
        {/* Slider untuk menampilkan daftar aktivitas */}
        <Slider {...settings}>
          {activities.map((activity, index) => (
            <div key={index} className="p-4">
              <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                <img
                  src={activity.imageUrls[0]} // Menampilkan gambar utama dari aktivitas
                  alt={activity.title}
                  className="object-cover w-full h-56 md:h-64"
                />
                <div className="p-4">
                  {/* Judul dari aktivitas */}
                  <h3 className="text-lg font-semibold text-blueText">{activity.title}</h3>
                  {/* Deskripsi aktivitas yang dipersingkat */}
                  <p className="mt-2 text-gray-600">
                    {truncateText(activity.description, 60)} {/* Batasi deskripsi menjadi 60 karakter */}
                  </p>
                  {/* Tombol untuk melihat detail aktivitas */}
                  <button className="px-4 py-2 mt-4 text-sm text-white rounded-full bg-mainBlue hover:bg-blue-600">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Activities;