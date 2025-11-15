import {
  faBell,
  faCar,
  faChartLine,
  faHome,
  faSignOutAlt,
  faStore,
  faUserPlus,
  faUsers,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Customers from "./Customers";
import Showroom from "./Showroom";
import Analytics from "./Analytics";

const Base_Url = import.meta.env.VITE_API_URL;

const Adminpage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [customerData, setCustomerData] = useState([]);
  const [showroomData, setShowroomData] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalShowrooms: 0,
    pendingApprovals: 0,
    activeCustomers: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${Base_Url}/api/admin/adminview`);
      const customers = response.data.clientSection || [];
      const showrooms = response.data.showroomSection || [];

      setCustomerData(customers);
      setShowroomData(showrooms);

      // Calculate statistics
      const filteredShowroomData = showrooms.filter(
        (showroom) => showroom.isApproved === 0
      );

      setStats({
        totalCustomers: customers.length,
        totalShowrooms: showrooms.length,
        pendingApprovals: filteredShowroomData.length,
        activeCustomers: customers.filter((c) => c.isActive).length,
      });

      setPendingApprovals(filteredShowroomData);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch data. Please try again."
      );
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const handleRefresh = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCustomers = customerData.filter(
    (customer) =>
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredShowrooms = showroomData.filter(
    (showroom) =>
      showroom.showroomName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      showroom.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#02073F] to-[#1A2A6C] p-6 text-white fixed h-full shadow-lg z-10">
        <div className="flex items-center mb-8">
          <div className="bg-white p-2 rounded-lg mr-3">
            <FontAwesomeIcon icon={faCar} className="text-[#394A9A] text-xl" />
          </div>
          <h2 className="text-2xl font-bold tracking-wide">Admin Dashboard</h2>
        </div>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg bg-[#394A9A] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-2 text-gray-300 hover:text-white"
            >
              ×
            </button>
          )}
        </div>

        <nav className="space-y-1">
          {[
            {
              id: "home",
              icon: faHome,
              text: "Dashboard",
              badge: null,
            },
            {
              id: "customers",
              icon: faUsers,
              text: "Customers",
              badge: null,
            },
            {
              id: "showrooms",
              icon: faCar,
              text: "Showrooms",
              badge: stats.pendingApprovals > 0 ? stats.pendingApprovals : null,
            },
            {
              id: "analytics",
              icon: faChartLine,
              text: "Analytics",
              badge: null,
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-[#394A9A] shadow-md"
                  : "hover:bg-[#394A9A]/80 hover:shadow-md"
              }`}
            >
              <div className="flex items-center">
                <FontAwesomeIcon icon={item.icon} className="w-5 h-5 mr-3" />
                <span>{item.text}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-4 mt-4 border-t border-[#394A9A]">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 rounded-lg hover:bg-[#394A9A]/80 hover:shadow-md transition-all duration-200 text-red-300 hover:text-red-100"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 capitalize">
            {activeTab === "home" ? "Dashboard Overview" : activeTab}
          </h1>
          <div className="flex space-x-3">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <FontAwesomeIcon icon={faRefresh} className="mr-2" />
              Refresh
            </button>
            <div className="relative">
              <button className="p-2 rounded-full bg-white shadow hover:bg-gray-100">
                <FontAwesomeIcon icon={faBell} />
                {stats.pendingApprovals > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                    {stats.pendingApprovals}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
            <button
              onClick={fetchData}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {activeTab === "home" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      icon: faUserPlus,
                      title: "Total Customers",
                      value: stats.totalCustomers,
                      change: "+12% from last month",
                      color: "blue",
                    },
                    {
                      icon: faStore,
                      title: "Total Showrooms",
                      value: stats.totalShowrooms,
                      change: "+5% from last month",
                      color: "green",
                    },
                    {
                      icon: faBell,
                      title: "Pending Approvals",
                      value: stats.pendingApprovals,
                      change: `${stats.pendingApprovals > 0 ? "Needs attention" : "All clear"}`,
                      color: "red",
                    },
                    {
                      icon: faChartLine,
                      title: "Active Customers",
                      value: stats.activeCustomers,
                      change: "Based on active status",
                      color: "yellow",
                    },
                  ].map((card, index) => (
                    <div
                      key={index}
                      className={`bg-white rounded-xl shadow p-6 transition-all hover:shadow-lg border-l-4 border-${card.color}-500`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-500 text-sm font-medium">
                            {card.title}
                          </p>
                          <p className="text-3xl font-bold text-gray-800 mt-1">
                            {card.value}
                          </p>
                          <p
                            className={`text-xs mt-2 ${
                              card.color === "red" && card.value > 0
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {card.change}
                          </p>
                        </div>
                        <div
                          className={`p-3 rounded-full bg-${card.color}-100 text-${card.color}-600`}
                        >
                          <FontAwesomeIcon icon={card.icon} size="lg" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {[...customerData, ...showroomData]
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )
                      .slice(0, 5)
                      .map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 hover:bg-gray-50 rounded-lg"
                        >
                          <div
                            className={`p-2 rounded-full mr-3 ${
                              item.isApproved === 0
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={item.email ? faUsers : faCar}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">
                              {item.name || item.showroomName || item.email}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.email
                                ? "New customer registered"
                                : "New showroom added"}
                            </p>
                          </div>
                          <span className="text-sm text-gray-400">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "customers" && (
              <Customers
                data={searchTerm ? filteredCustomers : customerData}
                onRefresh={fetchData}
              />
            )}

            {activeTab === "showrooms" && (
              <Showroom
                value={searchTerm ? filteredShowrooms : showroomData}
                refectch={fetchData} // Kept as is, but consider renaming to 'onRefresh' for consistency
                pendingCount={stats.pendingApprovals}
              />
            )}

            {activeTab === "analytics" && (
              <Analytics
                customerData={customerData}
                showroomData={showroomData}
                onRefresh={fetchData}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Adminpage;
