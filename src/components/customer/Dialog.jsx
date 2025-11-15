import { FileCheckIcon } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FiAlertTriangle, FiCheck, FiCheckCircle, FiClock, FiX } from "react-icons/fi";

const BookingProgressBar = ({ startTime, endTime, StartDate, EndDate,Status }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("pending");
  const [timeDisplay, setTimeDisplay] = useState("");

  console.log("booking status", Status);

  //  Interval sirf tab chale jab Status !== "returned" ho
  useEffect(() => {
    if (Status === "returned") {
      return; // Agar return ho gaya hai to interval set nahi karna
    }

    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  }, [Status]); //  Status ko dependency me rakha

  // Time parsing helper
  const parseDateTimeToTimestamp = (dateStr, timeStr) => {
    try {
      const [time, period] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (period.toUpperCase() === "PM" && hours !== 12) hours += 12;
      if (period.toUpperCase() === "AM" && hours === 12) hours = 0;

      const [year, month, day] = dateStr.split("-").map(Number);
      const date = new Date(year, month - 1, day, hours, minutes);

      if (isNaN(date.getTime())) throw new Error("Invalid date/time");

      return date.getTime();
    } catch (err) {
      console.error("Error parsing date/time:", err, { dateStr, timeStr });
      return null;
    }
  };

  const startTimestamp = parseDateTimeToTimestamp(StartDate, startTime);
  const endTimestamp = parseDateTimeToTimestamp(EndDate, endTime);

  const formatTimeDifference = (timeDiff) => {
    const absTimeDiff = Math.max(0, Math.floor(timeDiff));
    const days = Math.floor(absTimeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((absTimeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((absTimeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((absTimeDiff % (1000 * 60)) / 1000);

    let result = [];
    if (days > 0) result.push(`${days}d`);
    if (hours > 0 || days > 0) result.push(`${hours}h`);
    if (minutes > 0 || hours > 0 || days > 0) result.push(`${minutes}m`);
    result.push(`${seconds}s`);

    return result.join(" ") || "0s";
  };


  useEffect(() => {
    if (!startTime || !endTime || !StartDate || !EndDate || !startTimestamp || !endTimestamp) {
      setError("Invalid date or time inputs");
    } else if (startTimestamp >= endTimestamp) {
      setError("Start time must be before end time");
    } else {
      setError(null);
    }
  }, [startTime, endTime, StartDate, EndDate, startTimestamp, endTimestamp, Status]);

  const totalDuration = endTimestamp && startTimestamp ? endTimestamp - startTimestamp : 0;
  const elapsedTime = startTimestamp ? currentTime - startTimestamp : 0;
  const progress =
    totalDuration > 0 ? Math.min(100, Math.max(0, (elapsedTime / totalDuration) * 100)) : 0;

  useEffect(() => {

    if (Status === "returned") {
      setStatus("returned");
      setTimeDisplay("Car Returned");
      return;
    }

    if (error) {
      setTimeDisplay("Error: Invalid times");
      setStatus("error");
      return;
    }

    if (currentTime < startTimestamp) {
      const timeToStart = startTimestamp - currentTime;
      setStatus("pending");
      setTimeDisplay(`Time left: ${formatTimeDifference(timeToStart)}`);
    } else if (currentTime >= startTimestamp && currentTime <= endTimestamp) {
      const remaining = endTimestamp - currentTime;
      setStatus("active");
      setTimeDisplay(`Time left: ${formatTimeDifference(remaining)}`);
    } else if (currentTime > endTimestamp) {
      const overdueTime = currentTime - endTimestamp;
      setStatus("overdue");
      setTimeDisplay(`Overdue by: ${formatTimeDifference(overdueTime)}`);
    }
  }, [currentTime, startTimestamp, endTimestamp, error, Status]); 


  const getProgressColor = () => {
    switch (status) {
      case "overdue":
        return "bg-gradient-to-r from-red-500 to-red-700";
      case "pending":
        return "bg-gradient-to-r from-gray-500 to-gray-700";
      case "error":
        return "bg-gradient-to-r from-red-300 to-red-500";
      case "returned": 
        return "bg-gradient-to-r from-green-500 to-green-700";
      default:
        return "bg-gradient-to-r from-blue-500 to-blue-700";
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case "pending":
        return "Booking will start soon";
      case "active":
        return "Booking in progress";
      case "overdue":
        return "Overdue";
      case "error":
        return "Error";
      case "returned": 
        return "Car Returned";
      default:
        return "";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "pending":
      case "active":
        return <FiClock className="mr-1" />;
      case "overdue":
      case "error":
        return <FiAlertTriangle className="mr-1" />;
      case "returned":
        return <FiCheckCircle className="mr-1" />;
      default:
        return null;
    }
  };
  return (
    <div className="w-full mb-6">
      <div className="w-full max-w-[90vw] sm:max-w-[600px] mx-auto relative">
        {/* Progress Bar Container */}
        <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
          {/* Progress Indicator */}
          <div
            className={`h-full rounded-full ${getProgressColor()} shadow-md transition-all duration-300`}
            style={{
              width: `${status === "pending" || status === "error" ? 0 : progress}%`,
            }}
          ></div>
        </div>

        {/* Moving Car Icon - Only show when booking is active or overdue */}
        {(status === "active" || status === "overdue") && (
          <div
            className="absolute top-0 transform -translate-y-1/2 transition-all duration-300"
            style={{ left: `calc(${progress}% - 35px)` }}
          >
            {/* Uncomment when car icon is available */}
            {/* <img
              src="/src/assets/barcar.png"
              alt="Car Icon"
              className="w-20 h-20"
            /> */}
          </div>
        )}

        {/* Status and Time Information */}
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center text-sm font-medium">
            {getStatusIcon()}
            <span
              className={
                status === "overdue" || status === "error"
                  ? "text-red-600"
                  : "text-gray-700"
              }
            >
              {getStatusMessage()}
            </span>
          </div>
          <div className="text-sm text-gray-500">{timeDisplay}</div>
        </div>
      </div>
    </div>
  );
};

const Dialog = ({ isOpen, onClose, car, bookingDetails, showroom }) => {
  if (!isOpen) return null;

  // Convert booking dates to timestamps
  const startTime = new Date(bookingDetails.startDateTime).getTime();
  const endTime = new Date(bookingDetails.endDateTime).getTime();
  const StartDate = new Date(bookingDetails.startDateTime);
  const EndDate = new Date(bookingDetails.endDateTime);
  let totalDays = Math.ceil((EndDate - StartDate) / (1000 * 60 * 60 * 24));
  if (totalDays === 0) totalDays = 1;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 h-auto max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <FiX size={24} />
        </button>

        {/* Modal Title */}
        <h2 className="text-3xl font-bold text-center mb-4">
          {car.carBrand} {car.carModel}
        </h2>

        {/* Car Images */}
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {car.images?.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:3000/uploads/${img}`}
              alt={`Car ${index}`}
              className="w-full max-w-md h-48 object-cover rounded-lg border shadow-md cursor-pointer hover:scale-105 transition-transform"
            />
          ))}
        </div>

        {/* Progress Bar */}
        <BookingProgressBar
          startTime={bookingDetails.starttime}
          endTime={bookingDetails.endtime}
          StartDate={bookingDetails.startDateTime}
          EndDate={bookingDetails.endDateTime}
          Status={bookingDetails.BookingStatus}
        />

        {/* Combined Table for Booking and Car Details */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border text-sm">
            <tbody>
              <tr className="hover:bg-gray-50 border-t">
                <td className="p-3 font-bold">Booked By</td>
                <td className="p-3" colSpan={3}>
                  {sessionStorage.getItem("name")}
                </td>
              </tr>

              <tr className="hover:bg-gray-50 border-t">
                <td className="p-3 font-bold">Renting Period</td>
                <td className="p-3" colSpan={3}>
                  {bookingDetails.startDateTime} - {bookingDetails.endDateTime}
                </td>
              </tr>

              <tr className="hover:bg-gray-50 border-t">
                <td className="p-3 font-bold">Time Slot</td>
                <td className="p-3" colSpan={3}>
                  {"StartTime "} {bookingDetails.starttime} - {"EndTime "}
                  {bookingDetails.endtime}
                </td>
              </tr>

              <tr className="hover:bg-gray-50 border-t">
                <td className="p-3 font-bold">Total Duration</td>
                <td className="p-3 font-medium text-blue-700">
                  {totalDays} Day(s)
                </td>
                {/* <td className="p-3 font-medium text-blue-700">
      {bookingDetails.totalHours} Hour(s)
    </td> */}
                <td className="p-3"></td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border p-3 font-bold">Car Model</td>
                <td className="border p-3">{car.carModel}</td>
                <td className="border p-3 font-bold">Color</td>
                <td className="border p-3">{car.color}</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border p-3 font-bold">Mileage</td>
                <td className="border p-3">{car.mileage} miles</td>
                <td className="border p-3 font-bold">Transmission</td>
                <td className="border p-3">{car.transmission}</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border p-3 font-bold">Engine Type</td>
                <td className="border p-3">{car.engineType}</td>
                <td className="border p-3 font-bold">Registration Year</td>
                <td className="border p-3">{car.year}</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border p-3 font-bold">Fuel Type</td>
                <td className="border p-3">{car.fuelType}</td>
                <td className="border p-3 font-bold">Seat Capacity</td>
                <td className="border p-3">{car.seatCapacity}</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border p-3 font-bold">Body Type</td>
                <td className="border p-3">{car.bodyType}</td>
                <td className="border p-3 font-bold">Price</td>
                <td className="border p-3 font-bold">{car.rentRate} Rs/Day</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border p-3 font-bold">Showroom Name</td>
                <td className="border p-3">{showroom?.showroomName}</td>
                <td className="border p-3 font-bold">Showroom Address</td>
                <td className="border p-3">{showroom?.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  car: PropTypes.shape({
    carBrand: PropTypes.string.isRequired,
    carModel: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    color: PropTypes.string,
    mileage: PropTypes.string,
    transmission: PropTypes.string,
    engineType: PropTypes.string,
    year: PropTypes.string,
    fuelType: PropTypes.string,
    seatCapacity: PropTypes.string,
    bodyType: PropTypes.string,
    rentRate: PropTypes.string,
  }).isRequired,
  bookingDetails: PropTypes.shape({
    startDateTime: PropTypes.string.isRequired,
    endDateTime: PropTypes.string.isRequired,
  }).isRequired,
  showroom: PropTypes.shape({
    showroomName: PropTypes.string,
    address: PropTypes.string,
  }),
};

export default Dialog;
