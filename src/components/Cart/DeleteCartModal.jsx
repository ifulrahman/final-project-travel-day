import React from 'react';

const DeleteCartModal = ({ onClose, onConfirm, cartItem }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="p-6 bg-white rounded-lg shadow-lg font-league-spartan"> 
        <h2 className="text-xl font-bold">Delete Item</h2>
        <p>Are you sure you want to delete <strong>{cartItem?.activity?.title}</strong> from your cart?</p>
        <div className="flex justify-end mt-4 space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCartModal;