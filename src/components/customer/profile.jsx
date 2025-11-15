import React, { useEffect, useState } from "react";
import Navbar from "../customer/Navbar";
import axios from "axios";
const Base_Url = import.meta.env.VITE_API_URL;
import { toast } from "react-toastify";
import { FiAlertCircle, FiEdit, FiSave, FiX } from "react-icons/fi";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const [address, setAddress] = useState("");
  const [cnic, setCnic] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [hasActiveBooking, setHasActiveBooking] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Fetch user data
        const userResponse = await axios.get(`${Base_Url}/api/getuser`, {
          withCredentials: true,
        });
        
        const { ownerName, email, address, contactNumber, cnic } = userResponse.data.userdata;
        setName(ownerName);
        setEmail(email);
        setAddress(address);
        setPhonenum(contactNumber);
        setCnic(cnic);

        // Check for active bookings
        const bookingResponse = await axios.get(`${Base_Url}/api/bookcar/my-bookings`, {
          withCredentials: true,
        });

        if (bookingResponse.data && bookingResponse.data.length > 0) {
          const now = new Date();
          const activeBookings = bookingResponse.data.filter(booking => {
            const endDate = new Date(booking.rentalEndDate);
            const [time, modifier] = booking.rentalEndTime.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
            if (modifier === 'PM' && hours !== 12) hours += 12;
            if (modifier === 'AM' && hours === 12) hours = 0;
            endDate.setHours(hours, minutes, 0);
            return endDate > now && booking.status !== "returned";
          });

          setHasActiveBooking(activeBookings.length > 0);
        }

      } catch (error) {
        console.error("Error fetching data:", error.message);
        if (error.response?.status === 404) {
          // No bookings found is okay
          setHasActiveBooking(false);
        } else {
          toast.error("Error loading profile data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    if (hasActiveBooking) {
      toast.warning("Cannot edit profile during active booking");
      return;
    }
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${Base_Url}/api/updateprofile`,
        {
          name: name,
          email: email,
          phonenum: phonenum,
          address: address,
          cnic: cnic,
        },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error.response?.data?.message);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Optionally reset to original values here if needed
  };

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C17D3C]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center py-10 px-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 md:p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#C17D3C]">
            Profile
          </h2>

          {hasActiveBooking && (
            <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex items-center">
                <FiAlertCircle className="text-yellow-500 mr-2 text-xl" />
                <p className="text-yellow-700">
                  Profile editing is disabled while you have an active booking.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {[
              { label: "Name", value: name, setter: setName, editable: true },
              { label: "Email", value: email, setter: setEmail, editable: true },
              { label: "Phone Number", value: phonenum, setter: setPhonenum, editable: false },
              { label: "Address", value: address, setter: setAddress, editable: true },
              { label: "CNIC", value: cnic, setter: setCnic, editable: false },
            ].map((field) => (
              <div key={field.label} className="flex flex-col space-y-2">
                <label className="text-lg font-semibold text-gray-700">
                  {field.label}
                </label>
                {isEditing ? (
                  <input
                    type={field.label === "Email" ? "email" : "text"}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    className={`border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#C17D3C] transition duration-300 ${
                      !field.editable ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                    disabled={!field.editable}
                  />
                ) : (
                  <div className="border-2 border-gray-200 p-3 rounded-lg bg-gray-50">
                    {field.value || <span className="text-gray-400">Not provided</span>}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                disabled={hasActiveBooking}
                className={`flex items-center justify-center mx-auto px-8 py-3 rounded-lg transition duration-300 ${
                  hasActiveBooking
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#C17D3C] text-white hover:bg-[#A56A33]"
                }`}
              >
                <FiEdit className="mr-2" />
                Edit Profile
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  <FiSave className="mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center justify-center bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  <FiX className="mr-2" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
