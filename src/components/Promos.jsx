import React from 'react';

const Promos = ({ promos }) => {
  return (
    <section className="p-6 pb-16 bg-white md:p-12 font-league-spartan pt-18 md:pb-28">
      {/* Judul dan Subjudul Promo */}
      <h2 className="text-[45px] md:text-[85px] font-extralight font-lora mb-[-10px] md:mb-[-30px] text-left text-blueText text-opacity-10 pl-6 md:pl-24">
        Promos
      </h2>
      <h2 className="text-[28px] md:text-[45px] font-lora font-semibold mb-4 md:mb-8 text-left text-blueText pl-6 md:pl-24">
        Current Promos
      </h2>
      
      <div className="overflow-hidden">
        {/* Container untuk menampilkan promo dengan efek scroll */}
        <div className="flex gap-6 px-6 md:px-24 animate-scroll-fast md:animate-scroll-medium lg:animate-scroll-slow">
          {promos.map((promo, index) => (
            <div
              key={index}
              className="min-w-[200px] bg-white shadow-lg rounded-lg flex-shrink-0"
            >
              {/* Gambar Promo dan Kode Promo */}
              <div className="relative">
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="object-cover w-full h-64 rounded-t-lg"
                />
                <span className="absolute px-2 py-1 text-sm font-medium text-white rounded-xl bg-mainBlue top-2 right-2">
                  PROMO CODE: <br />{promo.promo_code}
                </span>
              </div>

              {/* Detail Promo */}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{promo.title}</h3>
                <p className="mt-2 text-gray-600">{promo.description}</p>
                {/* format menampilkan harga agar diberikan titik setiap 3 angka */}
                <p className="mt-2 font-sans text-sm font-extrabold text-red-500">
                  🏷️ Promo Discount IDR {promo.promo_discount_price.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promos;