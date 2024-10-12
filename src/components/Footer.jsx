import React from 'react';
import tdLogo from '../assets/td-logo-footer.png';

const Footer = () => {
  return (
    <footer className="py-12 text-white bg-blueText font-league-spartan">
      <div className="container grid grid-cols-1 gap-8 px-4 mx-auto md:grid-cols-2 lg:grid-cols-4 md:px-24">
        
        {/* Untuk menampilkan logo dan ikon media sosial */}
        <div>
          <img src={tdLogo} alt="Travel Day Logo" className="h-20 mb-8" />
          <div className="flex space-x-4">
            <a href="https://instagram.com" className="hover:text-gray-300">
              <i className="text-2xl fab fa-instagram"></i> 
            </a>
            <a href="https://twitter.com" className="hover:text-gray-300">
              <i className="text-2xl fab fa-twitter"></i> 
            </a>
            <a href="https://youtube.com" className="hover:text-gray-300">
              <i className="text-2xl fab fa-youtube"></i> 
            </a>
          </div>
        </div>

        {/* Section "For Beginners" yang berisi tautan untuk pengguna baru */}
        <div>
          <h3 className="mb-6 text-2xl font-semibold">For Beginners</h3>
          <ul>
            <li><a href="/" className="text-lg hover:text-gray-300">New Account</a></li>
            <li><a href="/" className="text-lg hover:text-gray-300">Start Booking</a></li>
            <li><a href="/" className="text-lg hover:text-gray-300">Use Payment</a></li>
          </ul>
        </div>

        {/* Section "Explore Us" yang berisi tautan navigasi ke halaman utama situs */}
        <div>
          <h3 className="mb-6 text-2xl font-semibold">Explore Us</h3>
          <ul>
            <li><a href="/" className="text-lg hover:text-gray-300">Home</a></li>
            <li><a href="/" className="text-lg hover:text-gray-300">Destinations</a></li>
            <li><a href="/" className="text-lg hover:text-gray-300">Promo</a></li>
            <li><a href="/" className="text-lg hover:text-gray-300">About</a></li>
            <li><a href="/" className="text-lg hover:text-gray-300">Gallery</a></li>
          </ul>
        </div>

        {/* Section "Connect Us" yang berisi informasi kontak */}
        <div>
          <h3 className="mb-6 text-2xl font-semibold">Connect Us</h3>
          <ul>
            <li className="flex items-center space-x-2 text-lg">
              <i className="fas fa-phone"></i>
              <span>(+62)81315669406</span>
            </li>
            <li className="flex items-center mt-4 space-x-2 text-lg">
              <i className="fas fa-envelope"></i>
              <span>travelday@gmail.com</span>
            </li>
            <li className="flex items-center mt-4 space-x-2 text-lg">
              <i className="fas fa-map-marker-alt"></i>
              <span>Depok, West Java</span>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;