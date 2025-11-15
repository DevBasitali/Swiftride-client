import { User, Calendar, LogOut, House, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Base_Url = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [firstLetter, setFirstLetter] = useState("");
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();

  const callLogoutApi = async () => {
    try {
      await axios.post(
        `${Base_Url}/api/logout`,
        {},
        { withCredentials: true }
      );
      sessionStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const fetchUserData = () => {
      try {
        const userData = sessionStorage.getItem("name");
        if (userData) {
          setName(userData);
          setFirstLetter(userData.charAt(0).toUpperCase());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
    setActiveLink(window.location.pathname);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const navLinks = [
    { path: "/customer/cars", label: "Cars" },
    { path: "/customer/showrooms", label: "Showrooms" },
    { path: "/customer/bookings", label: "Bookings" },
    { path: "/customer/invoice", label: "Invoices" }
  ];

  const dropdownItems = [
    { icon: House, path: "/customer/dashboard", label: "Home" },
    { icon: User, path: "/customer/profile", label: "Profile" },
    { icon: Calendar, path: "/customer/bookings", label: "My Bookings" },
    { icon: FileText, path: "/customer/invoice", label: "Invoices" }
  ];

  return (
    <nav className="bg-white/90 shadow-sm sticky top-0 z-30 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link to="/customer/dashboard" className="flex items-center">
            <img
              src="/src/assets/logo.png"
              alt="RentRush Logo"
              className="h-16 mr-3 transition-all hover:rotate-[-5deg] hover:scale-105"
            />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C17D3C] to-[#D4A76A] bg-clip-text text-transparent leading-tight">
              RentRush
            </h1>
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <motion.div
              key={link.path}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={link.path}
                className={`relative px-1 py-2 transition-colors font-medium group ${
                  activeLink.startsWith(link.path) 
                    ? "text-blue-600 font-semibold" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {link.label}
                {activeLink.startsWith(link.path) && (
                  <motion.span 
                    className="absolute left-0 bottom-0 h-0.5 w-full bg-blue-600"
                    layoutId="navUnderline"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {!activeLink.startsWith(link.path) && (
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <motion.div
            onClick={toggleDropdown}
            className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm font-semibold">
              {firstLetter}
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-gray-700 font-medium">{name}</span>
              <span className="text-xs text-gray-400">Customer</span>
            </div>
            {isDropdownOpen ? (
              <ChevronUp className="text-gray-500" size={18} />
            ) : (
              <ChevronDown className="text-gray-500" size={18} />
            )}
          </motion.div>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-gray-200 focus:outline-none z-50 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{name}</p>
                  <p className="text-xs text-gray-500">Customer Account</p>
                </div>
                
                <div className="py-1">
                  {dropdownItems.map((item) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center px-4 py-2.5 transition-colors ${
                          activeLink === item.path
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <item.icon className="mr-3" size={18} />
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                <div className="border-t border-gray-100 py-1">
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <button
                      onClick={callLogoutApi}
                      className="flex w-full items-center px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <LogOut className="mr-3" size={18} />
                      <span>Sign out</span>
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
