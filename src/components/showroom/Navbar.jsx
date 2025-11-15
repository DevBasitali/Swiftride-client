import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { id: "Home", text: "Home", path: "/" },
    { id: "steps", text: "How It Works", path: "/#steps" },
    { id: "Documents", text: "Rental Details", path: null },
    { id: "detail", text: "Why Choose Us", path: null },
    { id: "rent", text: "Testimonials", path: null },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left-aligned Logo and Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group transform transition duration-300 hover:scale-105"
            >
              <img
                src="/src/assets/logo.png"
                alt="RentRush Logo"
                className="h-[100px] w-auto"
              />
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-[#C17D3C] leading-tight">RentRush</span>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-5 mx-10">
            <div className="flex space-x-2 bg-gray-50 rounded-full px-2 py-1 shadow-inner">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-4 py-2 rounded-full text-20l font-medium text-gray-700 hover:text-[#00004b] hover:bg-white transition-all duration-200 ${
                    link.path ? "" : "cursor-pointer"
                  }`}
                >
                  {link.path ? <Link to={link.path}>{link.text}</Link> : link.text}
                </button>
              ))}
            </div>
          </div>

          {/* Right-aligned Actions */}
          <div className="flex items-center space-x-4">
            {/* Register Dropdown */}
            <div className="relative group hidden md:block">
              <button className="flex items-center space-x-1 px-4 py-2 rounded-full text-5l font-medium text-[#00004b] bg-white border border-gray-200 hover:border-[#C17D3C] hover:text-[#C17D3C] transition-all duration-200 shadow-sm">
                <span>Register</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 origin-top-right scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 bg-white shadow-lg rounded-md py-1 z-10 transition-all duration-200 transform border border-gray-100">
                <Link
                  to="/showroom/signup"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#C17D3C] hover:text-white transition-colors duration-150"
                >
                  Showroom
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#C17D3C] hover:text-white transition-colors duration-150"
                >
                  Customer
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <Link
              to="/login"
              className="px-5 py-2 rounded-full bg-[#C17D3C] text-white text-5l font-medium shadow-md hover:bg-[#b67435] transition-colors duration-200"
            >
              Login
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
