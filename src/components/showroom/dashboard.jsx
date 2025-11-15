import { useEffect, useState } from "react";
import ShowroomNavbar from "./showroomNavbar";
import Drawer from "./drawer";
import CarCard from "./carCard";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import {
  FiRefreshCw,
  FiPlus,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
} from "react-icons/fi";

const Base_Url = import.meta.env.VITE_API_URL;

const ShowroomDashboard = () => {
  const [cars, setCars] = useState([]);
  const [activeTab, setActiveTab] = useState("Available");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const showroomLogoUrl = `${
    import.meta.env.VITE_API_URL
  }/Uploads/${sessionStorage.getItem("logo")}`;
  const showroomName = sessionStorage.getItem("showroomName");

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${Base_Url}/api/car/get-all-cars`, {
        withCredentials: true,
      });
      setCars(response.data);
      const hasRentedCars = response.data.some(
        (car) => car.availability === "Rented Out"
      );
      setActiveTab(hasRentedCars ? "Rented Out" : "Available");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  // Filter cars
  const availableCars = cars.filter((car) => car.availability === "Available");
  const rentedCars = cars.filter((car) => car.availability === "Rented Out");
  const maintenanceCars = cars.filter(
    (car) =>
      car.availability === "Pending Return" ||
      car.availability === "In Maintenance"
  );

  const tabConfig = [
    {
      name: "Available",
      count: availableCars.length,
      icon: <FiCheckCircle className="mr-2" />,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: "Rented Out",
      count: rentedCars.length,
      icon: <FiClock className="mr-2" />,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      name: "Maintenance",
      count: maintenanceCars.length,
      icon: <FiAlertTriangle className="mr-2" />,
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
  ];

  const getCurrentCars = () => {
    switch (activeTab) {
      case "Rented Out":
        return rentedCars;
      case "Maintenance":
        return maintenanceCars;
      default:
        return availableCars;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ShowroomNavbar onMenuClick={toggleDrawer} />
      {/* <LowerNavbar /> */}

      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />

      <main className="container mx-auto px-4 py-8">
        {/* Header with actions */}
        <div className="flex items-start mb-6">
          <div className="flex items-center mr-10 gap-1">
            <img
              src={showroomLogoUrl}
              alt="Showroom Logo"
              className="h-20 w-22 rounded-[10px] border-2 border-gray-200 shadow-sm mr-2"
            />
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
                {showroomName}
              </h2>
            </div>
          </div>
          <span className="line-vertical hidden md:block w-[2px] h-16 bg-gray-300 mx-4" />

          <div className="ml-auto flex-1 items-start between gap-4">
            <div className="flex flex-col md:flex-row justify-between items-start  mb-4 gap-1">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                  Car Dashboard
                </h1>
                <p className="text-gray-600">
                  Manage your showroom's Car inventory
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={fetchVehicles}
                  className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
                >
                  <FiRefreshCw className="mr-2" />
                  Refresh
                </button>
                <Link
                  to="/showroom/inventory"
                  className="inline-flex items-center px-6 py-2 bg-[#C17D3C] text-white rounded-lg hover:bg-[#A56A33] transition"
                >
                  <FiPlus className="mr-2" />
                  Add New Vehicle
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tabConfig.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium text-white transition-all ${
                activeTab === tab.name
                  ? `${tab.color} shadow-lg transform scale-105`
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {tab.icon}
              {tab.name}
              <span className="ml-2 bg-white bg-opacity-30 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C17D3C]"></div>
            </div>
          ) : getCurrentCars().length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
              {getCurrentCars().map((car, index) => (
                <CarCard key={index} car={car} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="mx-auto max-w-md">
                <h3 className="text-xl font-medium text-gray-700 mb-3">
                  No {activeTab.toLowerCase()} vehicles found
                </h3>
                <p className="text-gray-500 mb-6">
                  {activeTab === "Available"
                    ? "All vehicles are currently rented or in maintenance"
                    : "No vehicles match this status"}
                </p>
                {/* <button className="px-6 py-2 bg-[#C17D3C] text-white rounded-lg hover:bg-[#A56A33] transition">
                  <FiPlus className="inline mr-2" />
                  Add New Vehicle
                </button> */}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ShowroomDashboard;
