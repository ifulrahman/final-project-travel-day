import React from 'react';
import Slider from 'react-slick'; // Import Slider dari 'react-slick' untuk menampilkan slider gambar

// Komponen Banner untuk menampilkan daftar banner dalam bentuk slider
const Banner = ({ banners }) => {
  const settings = {
    dots: true, // Menampilkan titik navigasi di bawah slider
    infinite: true, // Slider akan berjalan secara berkelanjutan (infinite loop)
    speed: 500, // Kecepatan transisi antar slide
    slidesToShow: 1, // Hanya satu banner yang ditampilkan per slide
    slidesToScroll: 1, // Pindah satu slide setiap kali scroll
    autoplay: true, // Slider berjalan otomatis
    autoplaySpeed: 3000, // Interval waktu untuk autoplay (3 detik)
    responsive: [
      {
        breakpoint: 1024, // Pengaturan untuk layar dengan lebar maksimal 1024px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600, // Pengaturan untuk layar dengan lebar maksimal 600px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1, // Mulai dari slide pertama
        },
      },
      {
        breakpoint: 480, // Pengaturan untuk layar dengan lebar maksimal 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="p-6 pt-24 pb-16 bg-white md:p-12 font-league-spartan md:pt-36 md:pb-28">
      {/* Judul besar sebagai latar belakang */}
      <h2 className="text-[45px] md:text-[85px] font-extralight font-lora mb-[-10px] md:mb-[-30px] text-left text-blueText text-opacity-10 pl-6 md:pl-24">
        Banners
      </h2>
      {/* Judul utama untuk bagian ini */}
      <h2 className="text-[28px] md:text-[45px] font-lora font-semibold mb-4 md:mb-8 text-left text-blueText pl-6 md:pl-24">
        Featured Highlight
      </h2>

      <div className="px-4 md:px-24">
        {/* Slider untuk menampilkan daftar banner */}
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <div key={index}>
              <div className="overflow-hidden rounded-lg">
                <img
                  src={banner.imageUrl} // Menampilkan gambar banner
                  alt={banner.name}
                  className="object-cover w-full h-56 rounded-lg md:h-80"
                />
                {/* Menampilkan nama banner di bawah gambar */}
                <h3 className="mt-4 text-lg font-semibold text-center md:text-xl text-blueText">
                  {banner.name}
                </h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Banner;