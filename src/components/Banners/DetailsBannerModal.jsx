import React from 'react';

const DetailsBannerModal = ({ banner, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Banner Details</h2>
        <img src={banner.imageUrl} alt={banner.name} className="object-cover w-full h-64 mb-4 rounded-lg" />
        <p><strong>Name:</strong> {banner.name}</p>
        <p><strong>Created At:</strong> {new Date(banner.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(banner.updatedAt).toLocaleString()}</p>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsBannerModal;