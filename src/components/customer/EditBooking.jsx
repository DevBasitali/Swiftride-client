import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Toast from "../Toast";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const EditBookingModal = ({ booking, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    rentalStartDate: "",
    rentalEndDate: "",
    rentalStartTime: "",
    rentalEndTime: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Initialize form with booking data
  useEffect(() => {
    if (booking) {
      setFormData({
        rentalStartDate: booking.rentalStartDate || "",
        rentalEndDate: booking.rentalEndDate || "",
        rentalStartTime: booking.rentalStartTime || "",
        rentalEndTime: booking.rentalEndTime || ""
      });
    }
  }, [booking]);

  const resetForm = useCallback(() => {
    setFormData({
      rentalStartDate: "",
      rentalEndDate: "",
      rentalStartTime: "",
      rentalEndTime: ""
    });
    setValidationErrors({});
    setShowConfirmDialog(false);
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['rentalEndDate', 'rentalEndTime'];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = "This field is required";
      }
    });

    // Add date validation if needed
    if (formData.rentalStartDate && formData.rentalEndDate) {
      const startDate = new Date(formData.rentalStartDate);
      const endDate = new Date(formData.rentalEndDate);
      
      if (endDate < startDate) {
        errors.rentalEndDate = "End date cannot be before start date";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Toast("Please fix the errors in the form", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/bookcar/update/${booking._id}`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const successMessage = response.data.message;
        const invoiceUrl = response.data.invoiceUrl;

        if (invoiceUrl) {
          Toast(
            <>
              {successMessage}{" "}
              <a
                href={invoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700"
              >
                Download Invoice
              </a>
            </>,
            "success"
          );
        } else {
          Toast(successMessage, "success");
        }

        handleClose();
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      const errorMessage = error.response?.data?.message || "Failed to update booking";
      Toast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-grey bg-opacity-10 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Update Booking</h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          setShowConfirmDialog(true);
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Rental Start Date:</label>
              <input
                type="date"
                name="rentalStartDate"
                value={formData.rentalStartDate}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                  validationErrors.rentalStartDate ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
                }`}
                disabled={isLoading}
              />
              {validationErrors.rentalStartDate && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.rentalStartDate}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Rental End Date:</label>
              <input
                type="date"
                name="rentalEndDate"
                value={formData.rentalEndDate}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                  validationErrors.rentalEndDate ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
                }`}
                disabled={isLoading}
              />
              {validationErrors.rentalEndDate && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.rentalEndDate}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Rental Start Time:</label>
              <input
                type="time"
                name="rentalStartTime"
                value={formData.rentalStartTime}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Rental End Time:</label>
              <input
                type="time"
                name="rentalEndTime"
                value={formData.rentalEndTime}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                  validationErrors.rentalEndTime ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
                }`}
                disabled={isLoading}
              />
              {validationErrors.rentalEndTime && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.rentalEndTime}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Booking"}
            </button>
          </div>
        </form>

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div 
              className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold text-center mb-4">
                {booking?.carId?.carBrand} {booking?.carId?.carModel}
              </h2>

              {/* Car Images */}
              <div className="flex justify-center gap-4 mb-6 flex-wrap">
                {booking?.carId?.images?.map((img, index) => (
                  <img
                    key={index}
                    src={`${API_BASE_URL}/uploads/${img}`}
                    alt={`${booking.carId.carBrand} ${index}`}
                    className="w-full max-w-md h-48 object-cover rounded-lg border shadow-md cursor-pointer hover:scale-105 transition-transform"
                  />
                ))}
              </div>

              {/* Booking Summary */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Booking Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Rental Period:</p>
                    <p>
                      {formData.rentalStartDate} at {formData.rentalStartTime} to{" "}
                      {formData.rentalEndDate} at {formData.rentalEndTime}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Car Details:</p>
                    <p>
                      {booking?.carId?.carModel} ({booking?.carId?.year})
                    </p>
                  </div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="p-3 font-semibold">Booked By</td>
                      <td className="p-3">{sessionStorage.getItem("name")}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Car Model</td>
                      <td className="p-3">{booking?.carId?.carModel}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Color</td>
                      <td className="p-3">{booking?.carId?.color}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Mileage</td>
                      <td className="p-3">{booking?.carId?.mileage} miles</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Transmission</td>
                      <td className="p-3">{booking?.carId?.transmission}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Price</td>
                      <td className="p-3 font-bold">{booking?.carId?.rentRate} rs/Day</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Showroom</td>
                      <td className="p-3">{booking?.showroomId?.showroomName}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Address</td>
                      <td className="p-3">{booking?.showroomId?.address}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                >
                  Back to Edit
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {isLoading ? "Updating..." : "Confirm Update"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

EditBookingModal.propTypes = {
  booking: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default EditBookingModal;
