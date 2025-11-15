import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import UserCard from "../customer/userCard";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { 
  FiMapPin, 
  FiClock, 
  FiPhone, 
  FiMail, 
  FiCheckCircle,
  FiShield,
  FiStar
} from "react-icons/fi";

const Base_Url = import.meta.env.VITE_API_URL;

function Showroomcars() {
  const { id: showroomid } = useParams();
  const location = useLocation();
  const showroom = location.state?.showroom;
  const [allcar, setAllCar] = useState([]);
  const [filter, setFilter] = useState("available");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(
          `${Base_Url}/api/getshowroomcar/${showroomid}`,
          { withCredentials: true }
        );
        setAllCar(response.data.totalcar);
      } catch (error) {
        console.error("Error fetching cars:", error.response);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [showroomid]);

  const filteredCars = allcar.filter((car) =>
    filter === "available"
      ? car.availability === "Available"
      : car.availability === "Rented Out"
  );

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="w-full lg:w-2/5">
              <div className="relative h-80 rounded-xl shadow-lg overflow-hidden">
                <img
                  src={`http://localhost:3000/uploads/${showroom.images[0]}`}
                  alt={showroom.showroomName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "/path/to/default/image.png";
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h1 className="text-2xl font-bold text-white">
                    {showroom.showroomName}
                  </h1>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-3/5">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About Our Showroom</h2>
                <p className="text-gray-600 mb-6">
                  {showroom.about || `Welcome to ${showroom.showroomName}, your premier destination for quality vehicles and 
                  exceptional service. With ${showroom.yearsOfExperience || 'many'} years in the automotive industry, we pride ourselves 
                  on offering a curated selection of vehicles to meet every need and budget.`}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start">
                    <FiMapPin className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Location</h3>
                      <p className="text-gray-600">{showroom.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiClock className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Operating Hours</h3>
                      <p className="text-gray-600">{showroom.operatingHours || 'Mon-Sun: 12AM - 12PM'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiPhone className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Contact</h3>
                      <p className="text-gray-600">{showroom.contactNumber || '+92 XXX XXXXXXX'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiMail className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Email</h3>
                      <p className="text-gray-600">{showroom.email || 'info@showroom.com'}</p>
                    </div>
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    className={`px-4 py-2 rounded-full font-medium text-sm flex items-center ${
                      filter === "available"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setFilter("available")}
                  >
                    <FiCheckCircle className="mr-2" />
                    Available Cars
                  </button>
                  <button
                    className={`px-4 py-2 rounded-full font-medium text-sm flex items-center ${
                      filter === "rented"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setFilter("rented")}
                  >
                    <FiShield className="mr-2" />
                    Rented Out Cars
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Our Values Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-5 rounded-lg">
                <FiStar className="text-blue-500 text-2xl mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">Premium Selection</h3>
                <p className="text-gray-600">
                  Carefully curated vehicles with regular maintenance checks to ensure top performance.
                </p>
              </div>
              <div className="bg-blue-50 p-5 rounded-lg">
                <FiShield className="text-blue-500 text-2xl mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">Trust & Safety</h3>
                <p className="text-gray-600">
                  Fully insured vehicles with 24/7 roadside assistance for your peace of mind.
                </p>
              </div>
              <div className="bg-blue-50 p-5 rounded-lg">
                <FiCheckCircle className="text-blue-500 text-2xl mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">Customer First</h3>
                <p className="text-gray-600">
                  Our dedicated team is committed to providing exceptional service tailored to your needs.
                </p>
              </div>
            </div>
          </div>

          {/* Cars Section */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {filter === "available" ? "Available Vehicles" : "Rented Out Vehicles"}
              </h2>
              <p className="text-gray-600">
                {filteredCars.length} {filteredCars.length === 1 ? "vehicle" : "vehicles"} found
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car, index) => (
                  <UserCard key={index} car={car} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  {filter === "available"
                    ? "No vehicles currently available"
                    : "No vehicles currently rented out"}
                </h3>
                <p className="text-gray-500">
                  Please check back later or contact us for more information
                </p>
              </div>
            )}
          </div>

          {/* Services Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-gray-800 mb-2">Flexible Rentals</h3>
                <p className="text-gray-600">
                  Daily, weekly, and monthly rental options to suit your schedule and budget.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-gray-800 mb-2">Maintenance Services</h3>
                <p className="text-gray-600">
                  Comprehensive maintenance and repair services to keep your vehicle in top condition.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-gray-800 mb-2">24/7 Support</h3>
                <p className="text-gray-600">
                  Round-the-clock customer support for any questions or emergencies.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default Showroomcars;
