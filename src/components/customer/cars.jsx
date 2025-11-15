import { useEffect, useState } from "react";
import UserCard from "./userCard.jsx";
import Navbar from "./Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import Toast from "../Toast";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Base_Url = import.meta.env.VITE_API_URL;

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("available");

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${Base_Url}/api/car/get-cars`, {
        withCredentials: true,
      });
      setCars(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      Toast(err.data || err.message || "Something went wrong", "error");
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const filteredCars = cars
    .filter((car) =>
      `${car.carBrand} ${car.carModel} ${car.color}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((car) =>
      filter === "available"
        ? car.availability === "Available"
        : car.availability === "Rented Out"
    );

  const handleRefetch = () => {
    fetchVehicles();
  };

  return (
    <>
      <Navbar />
      
      {/* Page Background */}
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-10">

        {/* Top Filters Section */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 px-6">
          
          {/* Dropdown Filter */}
          <div className="relative w-full md:w-auto mb-4 md:mb-0">
            <select
              className="block w-full md:w-52 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="available">Available Cars</option>
              <option value="rented">Rented Out Cars</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-96 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search by brand, model, or color"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-300 text-gray-700 py-2 pl-4 pr-10 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <Search size={18} />
            </div>
          </div>

          {/* Bookings Button */}
          <Link to="/customer/bookings">
            <button className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-6 rounded-full shadow-md font-semibold">
              My Bookings
            </button>
          </Link>

        </div>

        {/* Cars Grid */}
        <div className="bg-white mx-6 rounded-xl p-6 shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCars.length > 0 ? (
              filteredCars.map((car, index) => (
                <UserCard key={index} car={car} handleRefetch={handleRefetch} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center py-8">
                {filter === "available"
                  ? "Sorry, no available cars found."
                  : "No cars currently rented out."}
              </p>
            )}
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default Cars;
