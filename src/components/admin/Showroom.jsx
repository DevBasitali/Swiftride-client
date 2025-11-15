import {
  faBan,
  faCheck,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import axios from "axios";
import Toast from "../Toast";

const Base_Url = import.meta.env.VITE_API_URL;

const Showroom = ({ value, refectch }) => {
  const [statuses, setStatuses] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShowroom, setSelectedShowroom] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [nextStatus, setNextStatus] = useState("");
  const [actionType, setActionType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [reviews, setReviews] = useState([]); // State for reviews
  const [isLoadingReviews, setIsLoadingReviews] = useState(false); // Loading state for reviews

  useEffect(() => {
    const initialStatuses = {};
    value.forEach((showroom) => {
      initialStatuses[showroom._id] = showroom.status || "active";
    });
    setStatuses(initialStatuses);
  }, [value]);

  // Generate dummy reviews
  const generateDummyReviews = (showroomId) => {
    const dummyUserNames = [
      "John Doe",
      "Jane Smith",
      "Alex Brown",
      "Emily Davis",
    ];
    const dummyComments = [
      "Average experience, could be better.",
      "Great showroom, highly recommend!",
      "Not satisfied with the service.",
      "Good selection but slow response.",
    ];
    const currentDate = new Date();

    return Array.from({ length: 3 }, (_, index) => ({
      _id: `${showroomId}-dummy-${index}`,
      userName:
        dummyUserNames[Math.floor(Math.random() * dummyUserNames.length)],
      rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
      comment: dummyComments[Math.floor(Math.random() * dummyComments.length)],
      createdAt: new Date(
        currentDate.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000 // Random date within last 30 days
      ).toISOString(),
    }));
  };

  // Fetch reviews for a showroom
  const fetchReviews = async (showroomId) => {
    try {
      setIsLoadingReviews(true);
      const url = `${Base_Url}/api/reviews/showroom/${showroomId}`;
      const response = await axios.get(url);
      const fetchedReviews = response.data.reviews || [];

      // Use dummy reviews if no real reviews are found
      const reviewsToSet =
        fetchedReviews.length > 0
          ? fetchedReviews
          : generateDummyReviews(showroomId);
      setReviews(reviewsToSet);
    } catch (error) {
      // Toast("Failed to fetch reviews, showing dummy reviews", "warn");
      // Fallback to dummy reviews on error
      setReviews(generateDummyReviews(showroomId));
    } finally {
      setIsLoadingReviews(false);
    }
  };

  const banShowroom = async (id) => {
    try {
      const url = `${Base_Url}/api/admin/banshowroom/${id}`;
      const response = await axios.post(url);
      if (response?.data?.msg) Toast(response?.data?.msg, "success");

      setStatuses((prevStatuses) => ({
        ...prevStatuses,
        [id]: nextStatus,
      }));
      setIsModalOpen(false);
      refectch();
    } catch (error) {
      Toast(error.response?.data?.msg || "An error occurred", "error");
    }
  };

  const updateShowroomApproval = async (id, approve) => {
    try {
      const url = `${Base_Url}/api/admin/approve/${id}`;
      const response = await axios.put(url, { isApproved: approve ? 1 : 0 });
      if (response.data?.message === "Showroom approval rejected!") {
        Toast("Showroom approval rejected!", "warn");
      } else Toast(response.data?.message, "success");

      setSelectedShowroom((prev) => ({
        ...prev,
        isApproved: approve,
      }));
      setIsModalOpen(false);
      refectch();
    } catch (error) {
      Toast(error.response?.message || "An error occurred", "error");
    }
  };

  const openConfirmDialog = (id, status, type) => {
    setSelectedShowroom((prev) => ({ ...prev, _id: id }));
    setNextStatus(status);
    setActionType(type);
    if (type === "ban" && status === "banned") {
      // Fetch reviews when banning
    }
    setIsConfirmDialogOpen(true);
  };

  const handleStatusChange = () => {
    if (selectedShowroom?._id) {
      if (actionType === "ban") {
        banShowroom(selectedShowroom._id);
      } else if (actionType === "approve") {
        updateShowroomApproval(selectedShowroom._id, nextStatus === "approved");
      }
    }
    setIsConfirmDialogOpen(false);
    setReviews([]); // Clear reviews after action
    refectch();
  };

  // Filter showrooms based on active tab
  const needApprovalShowrooms = value.filter(
    (showroom) => !showroom.isApproved
  );
  const bannedShowrooms = value.filter(
    (showroom) => showroom.status.toLowerCase() === "banned"
  );
  const filteredShowrooms = value.filter((showroom) =>
    showroom.showroomName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCurrentShowrooms = () => {
    switch (activeTab) {
      case "needApproval":
        return needApprovalShowrooms;
      case "banned":
        return bannedShowrooms;
      default:
        return filteredShowrooms;
    }
  };

  const renderShowroomCard = (data) => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const createdAt = new Date(data.createdAt);
    return (
      <div
        key={data._id}
        onClick={() => {
          setSelectedShowroom(data);
          setIsModalOpen(true);
          fetchReviews(data._id); // Fetch reviews when opening the modal
        }}
        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-between transform hover:-translate-y-1"
      >
        <h3 className="text-lg font-semibold text-gray-800">
          {data.showroomName}
        </h3>
        {createdAt > twoDaysAgo && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </span>
        )}
      </div>
    );
  };

  // Render reviews in the confirmation dialog
  const renderReviews = () => {
    if (isLoadingReviews) {
      return <p className="text-gray-500">Loading reviews...</p>;
    }
    if (reviews.length === 0) {
      return (
        <p className="text-gray-500">No reviews found for this showroom.</p>
      );
    }
    return (
      <div className="mt-4 max-h-60 overflow-y-auto">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Reviews</h4>
        {reviews.map((review) => (
          <div
            key={review._id}
            className="border-b border-gray-200 py-2 text-sm"
          >
            <p className="font-semibold">{review.userName}</p>
            <p className="text-yellow-500">Rating: {review.rating}/5</p>
            <p className="text-gray-600">{review.comment}</p>
            <p className="text-gray-400 text-xs">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Showroom Management
      </h2>

      {/* Search Input */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search showrooms by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 pl-12 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm shadow-sm"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {[
              {
                name: "All Showrooms",
                key: "all",
                count: filteredShowrooms.length,
              },
              {
                name: "Need Approval",
                key: "needApproval",
                count: needApprovalShowrooms.length,
              },
              { name: "Banned", key: "banned", count: bannedShowrooms.length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`${
                  activeTab === tab.key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-all duration-200`}
              >
                {tab.name}
                <span
                  className={`${
                    activeTab === tab.key
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  } ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${tab.key === "needApproval" && tab.count !== 0 ? "bg-red-500 text-white" : ""}`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Showroom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getCurrentShowrooms().length > 0 ? (
          getCurrentShowrooms().map(renderShowroomCard)
        ) : (
          <p className="text-gray-500 col-span-full text-center py-8">
            No showrooms found for this category.
          </p>
        )}
      </div>

      {/* Showroom Details Modal */}
      {isModalOpen && selectedShowroom && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 hover:scale-[1.01]">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-5 tracking-tight">
                {selectedShowroom.showroomName}
              </h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <p className="flex items-center">
                  <span className="font-semibold w-24">Owner:</span>
                  <span>{selectedShowroom.ownerName}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-semibold w-24">CNIC:</span>
                  <span>{selectedShowroom.cnic}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-semibold w-24">Address:</span>
                  <span>{selectedShowroom.address}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-semibold w-24">Approval:</span>
                  <span
                    className={`${
                      selectedShowroom.isApproved === 1
                        ? "text-green-600"
                        : "text-yellow-600"
                    } font-medium`}
                  >
                    {selectedShowroom.isApproved === 1 ? "Approved" : "Pending"}
                  </span>
                </p>
                {selectedShowroom.isApproved === 1 && (
                  <p className="flex items-center">
                    <span className="font-semibold w-24">Status:</span>
                    <span
                      className={`${
                        statuses[selectedShowroom._id] === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      } font-medium`}
                    >
                      {statuses[selectedShowroom._id] === "active"
                        ? "Active"
                        : "Banned"}
                    </span>
                  </p>
                )}
              </div>
            </div>
            {selectedShowroom.isApproved === 1 && (
              <div className="bg-gray-100 px-6 py-4 rounded-t-2xl border-b border-gray-200">
                {renderReviews()}
              </div>
            )}

            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl">
              <div className="flex flex-wrap gap-3 justify-end">
                {selectedShowroom.isApproved === 0 && (
                  <>
                    <button
                      className="flex-1 min-w-[120px] py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                      onClick={() =>
                        openConfirmDialog(
                          selectedShowroom._id,
                          "approved",
                          "approve"
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faCheck} />
                      Approve
                    </button>
                    <button
                      className="flex-1 min-w-[120px] py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                      onClick={() =>
                        openConfirmDialog(
                          selectedShowroom._id,
                          "rejected",
                          "approve"
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} />
                      Reject
                    </button>
                  </>
                )}
                {selectedShowroom.isApproved === 1 && (
                  <button
                    className={`flex-1 min-w-[120px] py-2.5 px-4 ${
                      statuses[selectedShowroom._id] === "active"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    } text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2`}
                    onClick={() =>
                      openConfirmDialog(
                        selectedShowroom._id,
                        statuses[selectedShowroom._id] === "active"
                          ? "banned"
                          : "active",
                        "ban"
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={
                        statuses[selectedShowroom._id] === "active"
                          ? faBan
                          : faCheck
                      }
                    />
                    {statuses[selectedShowroom._id] === "active"
                      ? "Ban"
                      : "Activate"}
                  </button>
                )}
                <button
                  className="flex-1 min-w-[120px] py-2.5 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors duration-200"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog with Reviews */}
      {isConfirmDialogOpen && (
        <ConfirmationDialog
          message={
            actionType === "ban"
              ? nextStatus === "banned"
                ? "Are you sure you want to ban this showroom?"
                : "Are you sure you want to activate this showroom?"
              : nextStatus === "approved"
                ? "Are you sure you want to approve this showroom?"
                : "Are you sure you want to reject this showroom?"
          }
          onConfirm={handleStatusChange}
          onCancel={() => {
            setIsConfirmDialogOpen(false);
            setReviews([]); // Clear reviews on cancel
          }}
        ></ConfirmationDialog>
      )}
    </section>
  );
};

export default Showroom;
