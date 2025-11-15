import React from "react";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <p className="mb-6 text-lg text-gray-800">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
