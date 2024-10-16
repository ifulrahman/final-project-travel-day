import React from 'react';

const AddToCartModal = ({ activity, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Confirm Add to Cart</h2>
        <p className="mb-6">Are you sure you want to add <strong>{activity.title}</strong> to the cart?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-800 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;