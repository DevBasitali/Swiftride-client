import React from "react";
import { Link } from "react-router-dom";
import EditBookingModal from "./EditBooking";

function BookingCard({
  booking,
  handleSeeDetails,
  ReturnCar,
  setModelOpen,
  setSelectedBooking,
  setShowDialog,
  openDialog,
  ModelOpen,
}) {
  const CurrentDate = new Date();
  const BookingStartDate = new Date(booking.rentalStartDate);
  const BookingEndDate = new Date(booking.rentalEndDate);
const BookingStartDateTime = new Date(`${booking.rentalStartDate} ${booking.StartTime}`);
const BookingEndDateTime = new Date(`${booking.rentalEndDate} ${booking.EndTime}`);
console.log("CurrentDateTime:", CurrentDate);
console.log("BookingStartDateTime:", BookingStartDateTime);
console.log("BookingEndDateTime:", BookingEndDateTime);

const isActive = CurrentDate >= BookingStartDateTime && CurrentDate <= BookingEndDateTime;
console.log("isActive:", isActive);
const userEndTime = new Date(`${booking.rentalEndDate} ${booking.EndTime}`);
  const isOverdue=CurrentDate> userEndTime
  console.log("CurrentDate",CurrentDate)
  console.log("UserTime",userEndTime);
    console.log("overdue",isOverdue)
    // console.log("booking peding payment",)
  const StatusBadge = ({ label, color }) => (
    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${color}`}>
      {label}
    </span>
  );

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col w-[380px] transition duration-300 hover:shadow-lg border border-gray-200">
      <img
        src={`http://localhost:3000/uploads/${booking.carDetails.images[0]}`}
        alt={`${booking.carDetails.carBrand} ${booking.carDetails.carModel}`}
        className="w-full h-55 object-cover bg-gray-100"
      />

      <div className="text-40px p-4 flex flex-col justify-between flex-grow space-y-3">
        {/* Car Info */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">
            {booking.carDetails.carBrand} {booking.carDetails.carModel}
          </h3>
          <p className="text-40px text-gray-500 mb-1">{booking.carDetails.carType}</p>
          <p className="text-40px text-gray-600 flex items-center">
            <svg
              className="w-6 h-6 mr-1 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
            >
              <path   strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75L12 6.75m0 0l2.25 3m-2.25-3v10.5" />
            </svg>
            {booking.carDetails.transmission}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-40px text-gray-700 font-medium">PKR {booking.carDetails.rentRate}/Day</span>
          {   CurrentDate >= BookingStartDateTime && CurrentDate <= BookingEndDateTime  && (
            <Link to={`/customer/CarDetailsScreen/${booking._id}`}>
              <button className="text-40px text-blue-600 hover:underline">Extend Booking</button>
            </Link>
          )}
        </div>

        {/* Booking Status & Actions */}
        <div className="space-y-2">
          {/* Status Message */}
          {booking.status === "returned" ? (
            <StatusBadge label="✔️ Completed" color="bg-green-100 text-green-700" />
          ):booking.carDetails.availability==="In Maintenance"||booking.carDetails.availability==="Pending Payment"?(
            <>
              <StatusBadge label="🛠 In Maintenance" color="bg-red-100 text-red-700"/>
              <StatusBadge label=" Payment Due" color="bg-red-100 text-red-700" />
              <button
                onClick={() => handleSeeDetails(booking)}
                className="w-full bg-red-500 text-white py-1 rounded-md text-sm hover:bg-red-600 transition"
              >
                📄 See Maintenance Details
              </button>
            </>
          ) : booking.status === "return initiated" ? (
            <StatusBadge label="⏳ Pending Return" color="bg-orange-100 text-orange-700" />
          ) : isOverdue ? (
            <button
              onClick={() => ReturnCar(booking._id)}
              className="w-full bg-red-600 text-white py-1 rounded-md text-sm hover:bg-red-700"
            >
              🔙 Return Car  
           </button>
          ) : isActive ? (
            <StatusBadge label="🚗 Active Booking" color="bg-blue-100 text-blue-700" />
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setModelOpen(true)}
                className="flex-1 bg-blue-500 text-white py-1 rounded-md text-sm hover:bg-blue-600"
              >
                ✏️ Update
              </button>
              <button
                onClick={() => {
                  setSelectedBooking(booking._id);
                  setShowDialog(true);
                }}
                className="flex-1 bg-red-500 text-white py-1 rounded-md text-sm hover:bg-red-600"
              >
                ❌ Cancel
              </button>
            </div>
          )}
        </div>

        {/* View Details */}
        <button
          onClick={() => openDialog(booking)}
          className="mt-2 text-30px text-blue-600 hover:underline text-left"
        >
          🚘 View Car Details
        </button>
      </div>

      {/* Edit Booking Modal */}
      <EditBookingModal
        booking={booking}
        isOpen={ModelOpen}
        onClose={() => setModelOpen(false)}
      />
    </div>
  );
}

export default BookingCard;
