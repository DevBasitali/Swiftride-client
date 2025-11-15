import { useState, useEffect } from "react";
import ShowroomCard from "./ShowroomCard";
import Navbar from "./Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import PropTypes from "prop-types";
import Footer from "./Footer";

const Base_Url = import.meta.env.VITE_API_URL;

const Showrooms = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Base_Url}/api/admin/adminview`);
      setData(response.data.showroomSection);
      console.log("Showrooms fetched:", response.data.showroomSection);
      response.data.showroomSection
      console.log("Showroom approve",response.data.showroomSection[0].isApproved);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((showroom) =>
    showroom.showroomName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />

      {/* Background Section with animated gradient */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-blue-100 to-transparent opacity-20 -z-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>
        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            Explore Our Showrooms
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover Our Showrooms Collection Across Different Locations
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search showrooms by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pl-6 pr-14 rounded-full border border-gray-200 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300 bg-white/90 backdrop-blur-sm"
            />
            <div className="absolute inset-y-0 right-6 flex items-center">
              <Search className="text-gray-500 hover:text-blue-600 transition-colors" size={22} />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-blue-400 rounded-full mb-4"></div>
                <span className="text-lg text-gray-600">Loading showrooms...</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-red-50 rounded-xl">
              <span className="text-lg text-red-600 font-medium">
                Error loading showrooms: {error}
              </span>
              <button 
                onClick={fetchData}
                className="mt-4 px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-16 bg-blue-50 rounded-xl">
              <span className="text-lg text-gray-600">
                {searchQuery ? 
                  `No showrooms found matching "${searchQuery}"` : 
                  "No showrooms available at the moment"}
              </span>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-6 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredData.filter((showroom=>showroom.isApproved === 1)).map((showroom, index) => (
                <ShowroomCard key={index} value={showroom} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

Showrooms.propTypes = {
  showroomSection: PropTypes.array,
};

export default Showrooms;
