import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Drawer({ isOpen, onClose }) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setShowPopup(true); // Show the popup
    setTimeout(() => {
      setShowPopup(false); // Hide the popup
      onClose(); // Close the drawer
      navigate("/"); // Redirect to the home screen
    }, 3000); // Show popup for 3 seconds
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg z-50`}
      >
        <div className="bg-gray-200 p-4 shadow flex justify-between items-center">
          <h2 className="text-xl font-bold text-black">Menu</h2>
          <button onClick={onClose} className="text-gray-500">
            X
          </button>
        </div>

        <div className="p-6 space-y-4 text-left">
          <Link
            to="/showroom/Dashboard"
            className="block text-lg font-semibold text-gray-800 hover:bg-gray-100 p-2 rounded"
            onClick={onClose}
          >
            Home
          </Link>
          <Link
            to="/showroom/inventory"
            className="block text-lg font-semibold text-gray-800 hover:bg-gray-100 p-2 rounded"
            onClick={onClose}
          >
            Inventory
          </Link>
          <Link
            to="/customer/bookings"
            className="block text-lg font-semibold text-gray-800 hover:bg-gray-100 p-2 rounded"
            onClick={onClose}
          >
            Bookings
          </Link>
          <button
            onClick={handleSignOut}
            className="block text-lg font-semibold text-gray-800 hover:bg-gray-100 p-2 rounded w-full text-left"
          >
            Sign Out
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Popup for Sign Out */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              You have successfully signed out!
            </h2>
          </div>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setShowPopup(false)}
          ></div>
        </div>
      )}
    </>
  );
}
export default Drawer;
