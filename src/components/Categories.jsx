import React from 'react';

// Komponen Categories untuk menampilkan daftar kategori dalam bentuk grid
const Categories = ({ categories }) => {
  return (
    <section className="p-6 pb-16 md:p-12 font-league-spartan bg-blueBg pt-18 md:pb-28">
      {/* Judul besar sebagai latar belakang */}
      <h2 className="text-[45px] md:text-[85px] font-extralight font-lora mb-[-10px] md:mb-[-30px] text-left text-blueText text-opacity-10 pl-6 md:pl-24">
        Categories
      </h2>
      {/* Judul utama untuk bagian ini */}
      <h2 className="text-[28px] md:text-[45px] font-lora font-semibold mb-4 md:mb-8 text-left text-blueText pl-6 md:pl-24">
        Our Categories
      </h2>
      {/* Menampilkan daftar kategori dalam bentuk grid yang responsif */}
      <div className="grid grid-cols-1 gap-4 px-6 md:px-24 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative overflow-hidden transition-transform duration-300 ease-in-out transform bg-white rounded-lg shadow-lg hover:scale-105"
          >
            {/* Menampilkan gambar kategori */}
            <img
              src={category.imageUrl}
              alt={category.name}
              className="object-cover w-full h-48"
            />
            {/* Overlay gradient di bagian bawah untuk menampilkan nama kategori */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-blue-600 to-transparent">
              <h3 className="text-lg font-semibold text-white">{category.name}</h3>
              <p className="text-sm text-white">Explore this category</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;