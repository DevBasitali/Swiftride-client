import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ShowroomNavbar() {
  const navItems = [
    { label: "Home", to: "/showroom/dashboard" },
    { label: "Inventory", to: "/showroom/inventory" },
    { label: "Maintenance", to: "/showroom/maintenance" },
    { label: "Payments", to: "/showroom/payments" },
    { label: "Invoices", to: "/showroom/invoices" },
  ];
  const showroomLogoUrl = `${
    import.meta.env.VITE_API_URL
  }/uploads/${sessionStorage.getItem("logo")}`;
  const showroomName = sessionStorage.getItem("showroomName");

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-5 md:px-8">
      <div className="max-w-screen-4xl mx-auto flex items-center justify-between h-20">
        {/* Left: RentRush Logo + Name */}
        <div className="flex items-center gap-3">
          <Link to="/showroom/dashboard" className="flex items-center">
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              className="-my-3 h-[100px] mr-2"
            />
            <div className="flex flex-col">
              <h1 className="list-none cursor-pointer font-bold text-[28px]  text-[#C17D3C] leading-tight">
                RentRush
              </h1>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden lg:flex items-center gap-12">
          {navItems.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className={`relative text-lg font-medium transition-colors ${
                location.pathname === to
                  ? "text-[#C17D3C]"
                  : "text-gray-600 hover:text-[#C17D3C]"
              }`}
            >
              {label}
              {location.pathname === to && (
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#C17D3C]"
                  layoutId="underline"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right: Showroom Details + Logout */}
        <div className="flex items-center gap-6">
          {/* Logout Button */}
          <Link
            to="/login"
            onClick={() => {
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("role");
              sessionStorage.removeItem("showroomName");
              sessionStorage.removeItem("logo");
              sessionStorage.removeItem("name");
            }}
            className="bg-[#C17D3C] hover:bg-[#a96a33] text-white text-base font-semibold px-5 py-2.5 rounded-lg transition-all"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default ShowroomNavbar;
