import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faIdCard,
  faBuilding,
  faTimes,
  faSearch,
  faBan,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ConfirmationDialog from "./ConfirmationDialog";

const Base_Url = import.meta.env.VITE_API_URL;

const Customers = ({ data }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statuses, setStatuses] = useState({});
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [nextStatus, setNextStatus] = useState("");

  useEffect(() => {
    const initialStatuses = {};
    data.forEach((user) => {
      initialStatuses[user._id] = user.status || "active";
    });
    setStatuses(initialStatuses);
  }, [data]);

  const openModal = (user) => setSelectedUser(user);
  const closeModal = () => setSelectedUser(null);

  const openConfirmDialog = (id, status) => {
    setSelectedUser((prev) => ({ ...prev, _id: id }));
    setNextStatus(status);
    setIsConfirmDialogOpen(true);
  };

  const handleStatusChange = async () => {
    if (!selectedUser?._id) return;
    try {
      const url = `${Base_Url}/api/admin/banshowroom/${selectedUser._id}`;
      const response = await axios.post(url);
      alert(response.data.msg);

      setStatuses((prev) => ({
        ...prev,
        [selectedUser._id]: nextStatus,
      }));
      closeModal();
    } catch (err) {
      alert(err.response?.data?.msg || "An error occurred.");
    }
    setIsConfirmDialogOpen(false);
  };

  const filteredData = data.filter((user) =>
    user.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="mb-8 mx-10 w-full">
      <h2 className="text-4xl font-bold text-[#394A9A] mb-6 text-center">
        Customer Accounts
      </h2>

      {/* 🔍 Search Box */}
      <div className="max-w-lg mx-auto mb-10">
        <div className="relative">
          <input
            type="text"
            className="w-full py-3 pl-12 pr-4 rounded-full border-2 border-gray-200 shadow focus:outline-none focus:ring-2 focus:ring-[#394A9A] focus:border-[#394A9A] transition-all text-sm"
            placeholder="Search by customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Customer List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((user) => (
            <div
              key={user._id}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer text-center border border-gray-100 hover:border-[#394A9A]"
              onClick={() => openModal(user)}
            >
              <p className="text-lg font-semibold text-[#394A9A] hover:underline">
                {user.ownerName}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 italic">
            No customers found.
          </p>
        )}
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            <div className="flex flex-col items-center text-center space-y-4">
              {selectedUser.images?.[0] ? (
                <img
                  src={`http://localhost:3000/uploads/${selectedUser.images[0]}`}
                  alt="Customer"
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#394A9A]"
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-[#394A9A] text-white text-3xl">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              )}

              <h3 className="text-2xl font-semibold text-gray-800">
                {selectedUser.ownerName}
              </h3>
              <p className="text-sm text-gray-500 italic capitalize">
                Role: {selectedUser.role}
              </p>

              {selectedUser.showroomName && (
                <p className="text-gray-700 text-sm">
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className="mr-2 text-[#394A9A]"
                  />
                  {selectedUser.showroomName}
                </p>
              )}
              <p className="text-gray-700 text-sm">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="mr-2 text-[#394A9A]"
                />
                {selectedUser.email}
              </p>
              <p className="text-gray-700 text-sm">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="mr-2 text-[#394A9A]"
                />
                {selectedUser.contactNumber}
              </p>
              <p className="text-gray-700 text-sm">
                <FontAwesomeIcon
                  icon={faIdCard}
                  className="mr-2 text-[#394A9A]"
                />
                {selectedUser.cnic}
              </p>
              <p className="text-gray-700 text-sm">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="mr-2 text-[#394A9A]"
                />
                {selectedUser.address}
              </p>

              {/* Status */}
              <p className="mt-2 text-sm font-medium">
                Status:{" "}
                <span
                  className={
                    statuses[selectedUser._id] === "active"
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {statuses[selectedUser._id] === "active"
                    ? "Active"
                    : "Banned"}
                </span>
              </p>

              {/* Ban/Activate Button */}
              <button
                className={`w-full mt-4 py-2 rounded-lg text-white font-semibold transition-colors duration-200 ${
                  statuses[selectedUser._id] === "active"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={() =>
                  openConfirmDialog(
                    selectedUser._id,
                    statuses[selectedUser._id] === "active"
                      ? "banned"
                      : "active"
                  )
                }
              >
                <FontAwesomeIcon
                  icon={
                    statuses[selectedUser._id] === "active" ? faBan : faCheck
                  }
                  className="mr-2"
                />
                {statuses[selectedUser._id] === "active"
                  ? "Ban Customer"
                  : "Activate Customer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {isConfirmDialogOpen && (
        <ConfirmationDialog
          message={
            nextStatus === "banned"
              ? "Are you sure you want to ban this customer?"
              : "Are you sure you want to activate this customer?"
          }
          onConfirm={handleStatusChange}
          onCancel={() => setIsConfirmDialogOpen(false)}
        />
      )}
    </section>
  );
};

export default Customers;
