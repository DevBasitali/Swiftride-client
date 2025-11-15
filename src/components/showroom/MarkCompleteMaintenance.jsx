import React, { useState } from "react";
import axios from "axios";
import Toast from "../Toast";

const Base_Url = import.meta.env.VITE_API_URL;

const MarkCompleteMaintenance = ({ carId, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${Base_Url}/api/car/complete-maintenance/${carId}`,
        {},
        { withCredentials: true },
      );
      Toast("Maintenance marked as completed!", "success");
      onClose();
    } catch (err) {
      console.error("Error marking maintenance complete:", err);
      Toast(
        err?.response?.data?.message || "Failed to mark as complete",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative text-center space-y-6">
        <h3 className="text-2xl font-bold text-[#0B132A]">
          Confirm Maintenance Completion
        </h3>
        <p className="text-gray-700">
          Are you sure you want to mark this maintenance as completed?
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="py-2 px-6 bg-[#4CAF50] text-white rounded-lg hover:bg-[#43a047] disabled:opacity-50"
          >
            {loading ? "Marking..." : "Mark as Completed"}
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            className="py-2 px-6 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>

        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default MarkCompleteMaintenance;
