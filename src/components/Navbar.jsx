import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  const navLinks = [
    { id: "Home", text: "Home", path: "/" },
    { id: "howitwork", text: "How It Works" },
    { id: "rentaldetail", text: "Rental Details" },
    { id: "why-choose", text: "Why Choose Us" },
    { id: "testimonials", text: "Testimonials" },
  ];

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.id);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-lg shadow-2xl py-2" 
          : "bg-white shadow-md py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo and Brand */}
            <div className={`flex-shrink-0 transition-all duration-500 ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              <Link
                to="/"
                className="flex items-center space-x-3 group"
              >
                {/* Animated Logo Container */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <img
                    src="/src/assets/logo.png"
                    alt="RentRush Logo"
                    className={`relative transition-all duration-500 ${
                      scrolled ? 'h-[50px] md:h-[60px]' : 'h-[60px] md:h-[80px]'
                    } w-auto group-hover:scale-110`}
                  />
                </div>
                
                {/* Brand Name with Gradient */}
                <div className="flex flex-col">
                  <span className={`font-bold bg-gradient-to-r from-[#C17D3C] to-[#FF9E4D] bg-clip-text text-transparent transition-all duration-500 ${
                    scrolled ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'
                  }`}>
                    RentRush
                  </span>
                  <span className="text-xs text-gray-500 hidden md:block">
                    Drive Your Dreams
                  </span>
                </div>
              </Link>
            </div>

            {/* Center Navigation - Desktop */}
            <div className={`hidden lg:flex items-center justify-center flex-1 mx-10 transition-all duration-500 ${
              isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
            }`}>
              <div className="relative flex items-center">
                {/* Active Indicator Background */}
                <div className="absolute inset-0 bg-gray-50 rounded-full"></div>
                
                {navLinks.map((link, index) => (
                  <div key={link.id} className="relative">
                    <button
                      onClick={() => link.path ? null : scrollToSection(link.id)}
                      className={`relative px-5 py-2.5 mx-1 rounded-full text-sm font-semibold transition-all duration-300 ${
                        activeSection === link.id
                          ? 'text-white bg-gradient-to-r from-[#C17D3C] to-[#FF9E4D] shadow-lg scale-105'
                          : 'text-gray-700 hover:text-[#C17D3C] hover:bg-white'
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      {link.path ? (
                        <Link to={link.path}>
                          {link.text}
                        </Link>
                      ) : (
                        <span>{link.text}</span>
                      )}
                      
                      {/* Active Indicator Dot */}
                      {activeSection === link.id && (
                        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Actions */}
            <div className={`flex items-center space-x-4 transition-all duration-500 ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              {/* Register Dropdown - Enhanced */}
              <div className="relative group hidden md:block">
                <button className="flex items-center space-x-2 px-5 py-2.5 rounded-full text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:border-[#C17D3C] hover:text-[#C17D3C] hover:shadow-lg transition-all duration-300 group">
                  <span>Register</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>

                {/* Dropdown Menu with Animation */}
                <div className="absolute right-0 mt-3 w-64 origin-top-right scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible bg-white shadow-2xl rounded-2xl py-3 z-20 transition-all duration-200 transform border border-gray-100">
                  <div className="px-5 py-3 border-b border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Choose Account Type</p>
                  </div>
                  
                  <Link
                    to="/showroom/signup"
                    className="block px-5 py-4 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-200 group/item"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 group-hover/item:text-[#C17D3C]">Showroom Owner</p>
                        <p className="text-xs text-gray-500 mt-1">List and manage your vehicles</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover/item:text-[#C17D3C] transform group-hover/item:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </Link>
                  
                  <Link
                    to="/signup"
                    className="block px-5 py-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group/item"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 group-hover/item:text-blue-600">Customer</p>
                        <p className="text-xs text-gray-500 mt-1">Rent your perfect vehicle</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover/item:text-blue-600 transform group-hover/item:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Login Button - Enhanced */}
              <Link
                to="/login"
                className="hidden md:block relative overflow-hidden px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C17D3C] to-[#FF9E4D] text-white text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF9E4D] to-[#C17D3C] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>

              {/* Mobile Menu Button - Enhanced */}
              <button
                className="md:hidden relative w-10 h-10 text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                      isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                    }`}
                  />
                  <span
                    className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                      isMobileMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                      isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu - Enhanced */}
          <div
            className={`md:hidden transition-all duration-500 ease-in-out ${
              isMobileMenuOpen 
                ? 'max-h-screen opacity-100 visible mt-4' 
                : 'max-h-0 opacity-0 invisible overflow-hidden'
            }`}
          >
            <div className="pb-6 space-y-1 bg-gray-50 rounded-2xl p-4">
              {/* Mobile Navigation Links */}
              {navLinks.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => link.path ? null : scrollToSection(link.id)}
                  className={`block w-full text-left px-5 py-3.5 text-base font-medium rounded-xl transition-all duration-300 ${
                    activeSection === link.id
                      ? 'bg-gradient-to-r from-[#C17D3C] to-[#FF9E4D] text-white shadow-md'
                      : 'text-gray-700 hover:bg-white hover:text-[#C17D3C]'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  {link.path ? (
                    <Link to={link.path} className="block">
                      {link.text}
                    </Link>
                  ) : (
                    <span>{link.text}</span>
                  )}
                </button>
              ))}

              {/* Divider */}
              <div className="my-4 border-t border-gray-200"></div>

              {/* Mobile Register Options */}
              <div className="space-y-2 px-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold px-3 py-2">Register As</p>
                
                <Link
                  to="/showroom/signup"
                  className="block px-4 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <p className="font-semibold text-gray-900">Showroom Owner</p>
                  <p className="text-xs text-gray-500 mt-1">List and manage your vehicles</p>
                </Link>
                
                <Link
                  to="/signup"
                  className="block px-4 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <p className="font-semibold text-gray-900">Customer</p>
                  <p className="text-xs text-gray-500 mt-1">Rent your perfect vehicle</p>
                </Link>
              </div>

              {/* Mobile Login Button */}
              <div className="px-2 pt-4">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#C17D3C] to-[#FF9E4D] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Login to Your Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;