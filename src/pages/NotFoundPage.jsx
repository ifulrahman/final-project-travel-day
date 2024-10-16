import React from 'react';
import notFoundImage from '../assets/404-not-found.png'; // Import image from assets
import { useNavigate } from 'react-router-dom'; // For navigation
import tdLogo from '../assets/td-logo.png';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-league-spartan">
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <img src={tdLogo} alt="Travel Destination" className="w-24 mb-8 sm:w-28 md:w-32 lg:w-48" /> {/* Adjust width for responsiveness */}
        <img src={notFoundImage} alt="Page Not Found" className="w-64 mb-8 md:w-96" /> {/* Adjust width for responsiveness */}
        <h1 className="mb-4 text-4xl font-bold">Page Not Found</h1>
        <p className="mb-8 text-gray-500">The page you are looking <br />for might have been removed or is temporarily unavailable.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 text-white bg-[#2954CD] rounded-full hover:bg-blue-700"
        >
          Home Page
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;