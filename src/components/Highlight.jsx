import React from 'react';

const Highlight = ({ isOpen }) => {
  return (
    <div
      className={`absolute transition-all duration-300 w-full z-20 flex justify-center font-league-spartan ${
        isOpen
          ? 'top-[910px] sm:top-[500px] md:top-[800px] lg:top-[850px]' // Jika isOpen true, posisi konten lebih ke bawah
          : 'top-[460px] sm:top-[500px] md:top-[700px] lg:top-[700px]' // Jika isOpen false, posisi konten lebih ke atas
      }`}
    >
      <div className="bg-white shadow-lg p-6 md:p-9 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:flex justify-between items-center w-[90%] md:w-[85%] max-w-4xl gap-4">
        <div className="flex flex-col items-center text-center">
          <span className="text-[17px] font-semibold">Explore</span>
          <span className="text-[17px] text-mainBlue">Find Your Dream Destination!</span>
        </div>
        {/* Garis vertikal sebagai pemisah antara item di layar yang lebih besar */}
        <div className="hidden h-12 border-l border-gray-300 md:block"></div>
        <div className="flex flex-col items-center text-center">
          <span className="text-[17px] font-semibold">Plans</span>
          <span className="text-[17px] text-mainBlue">Flexible Travel Plans</span>
        </div>
        <div className="hidden h-12 border-l border-gray-300 md:block"></div>
        <div className="flex flex-col items-center text-center">
          <span className="text-[17px] font-semibold">Deals & Offers</span>
          <span className="text-[17px] text-mainBlue">Exclusive Deals & Offers</span>
        </div>
        <div className="hidden h-12 border-l border-gray-300 md:block"></div>
        <div className="flex flex-col items-center text-center">
          <span className="text-[17px] font-semibold">Experience</span>
          <span className="text-[17px] text-mainBlue">Personalized Travel Experience</span>
        </div>
      </div>
    </div>
  );
};

export default Highlight;