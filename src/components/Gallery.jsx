import React from 'react';
import makkah from '../assets/makkah.jpg';
import australia from '../assets/australia.jpg';
import mandalika from '../assets/mandalika.jpg';
import cappadocia from '../assets/cappadocia.jpg';
import nusaPenida from '../assets/nusa-penida.jpg';

const Gallery = () => {
  return (
    <section className="p-6 md:p-12 bg-blueBg font-league-spartan">
      <h2 className="text-[28px] md:text-[45px] font-lora font-semibold text-center text-blueText mb-4 md:mb-8">
        Our Gallery
      </h2>
      <p className="px-4 mb-8 text-center text-gray-600 md:mb-12 md:px-0">
        We offer a variety of travel packages, from budget-friendly adventures to luxury getaways, <br />
        ensuring an unforgettable experience for all types of travelers and preferences.
      </p>

      {/* Grid gambar-gambar galeri */}
      <div className="grid grid-cols-1 gap-2 px-4 pb-24 sm:grid-cols-2 lg:grid-cols-3 md:gap-4 md:px-12">
        {/* Gambar utama yang memanjang di sebelah kiri pada layar besar */}
        <div className="overflow-hidden shadow-md rounded-3xl sm:row-span-2 sm:h-full">
          <div className="w-full h-[280px] sm:h-full transition-transform duration-300 ease-in-out hover:scale-105">
            <img 
              src={makkah} 
              alt="Makkah" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="overflow-hidden shadow-md rounded-3xl">
          <div className="w-full h-[200px] sm:h-[180px] md:h-[220px] lg:h-[240px] transition-transform duration-300 ease-in-out hover:scale-105">
            <img 
              src={australia} 
              alt="Australia" 
              className="object-cover w-full h-[350px]"
            />
          </div>
        </div>
        <div className="overflow-hidden shadow-md rounded-3xl">
          <div className="w-full h-[200px] sm:h-[180px] md:h-[220px] lg:h-[240px] transition-transform duration-300 ease-in-out hover:scale-105">
            <img 
              src={mandalika} 
              alt="mandalika" 
              className="object-cover w-full h-[350px]"
            />
          </div>
        </div>
        <div className="overflow-hidden shadow-md rounded-3xl">
          <div className="w-full h-[200px] sm:h-[180px] md:h-[220px] lg:h-[240px] transition-transform duration-300 ease-in-out hover:scale-105">
            <img 
              src={cappadocia} 
              alt="cappadocia}" 
              className="object-cover w-full h-[350px]"
            />
          </div>
        </div>
        <div className="overflow-hidden shadow-md rounded-3xl">
          <div className="w-full h-[200px] sm:h-[180px] md:h-[220px] lg:h-[240px] transition-transform duration-300 ease-in-out hover:scale-105">
            <img 
              src={nusaPenida} 
              alt="Nusa Penida" 
              className="object-cover w-full h-[350px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;