import React from "react";
import logo from "../../assets/logo.png";
const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center gap-3 my-4">
          <img
            className="w-[15%] h-[10%] rounded-full "
            src={logo}
            alt="logo"
          />
          <h1 className="font-bold text-[25px] text-blue-500">RentRush</h1>
        </div>
        <p className="mb-4 text-lg">{message}</p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
