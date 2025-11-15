import React, {useState, useEffect} from "react";
import Navbar from "./Navbar.jsx";
import Steps from "./Steps.jsx";
import Details from "./Detail.jsx";
import Reason from "./Reason.jsx";
import Variety from "./Variety.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <Navbar />
      <div id="Home">
        {/* Hero Section with Background Image - Added darker overlay */}
        <div
          className="relative w-full h-screen flex items-center justify-center px-6 sm:px-12 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('/src/assets/background.png')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="relative z-10 max-w-4xl text-center animate-fadeIn">
            <div className="text-center mb-10">
              <h1 className="font-extrabold text-5xl sm:text-7xl lg:text-8xl xl:text-[90px] text-white font-poppins mb-2 leading-tight tracking-tighter">
                <span className="block text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  FAST AND EASY WAY
                </span>
                <span className="block mt-2 sm:mt-6">
                  TO{" "}
                  <span className="text-[#FF9E4D] drop-shadow-[0_2px_10px_rgba(255,158,77,0.5)]">
                    RENT A CAR
                  </span>
                </span>
              </h1>
            </div>

            <p className="text-md sm:text-lg lg:text-xl font-poppins text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Our <span className="font-semibold text-[#FF9E4D]">RentRush</span>{" "}
              online booking system is designed to meet the specific needs of
              car rental business owners. This easy-to-use car rental software
              will revolutionize how you manage your fleet.
            </p>

            <div className="buttons flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                to="/login"
                className="relative bg-gradient-to-r from-[#FF9E4D] to-[#FF7B25] rounded-full py-4 px-8 text-white font-poppins text-lg font-semibold hover:from-[#FF7B25] hover:to-[#FF9E4D] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.03] active:scale-95 overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  LOGIN
                </span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 transition-opacity duration-300 rounded-full"></span>
              </Link>

              <Link
                to="/signup"
                className="relative bg-transparent border-2 border-white rounded-full py-4 px-8 text-white font-poppins text-lg font-semibold hover:bg-white hover:text-[#FF7B25] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.03] active:scale-95 overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  REGISTER
                </span>
                <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full"></span>
              </Link>
            </div>
          </div>
        </div>

        {/* Car Brands Showcase */}
        <div className="hidden md:flex justify-evenly items-center py-10 bg-white/90 backdrop-blur-sm shadow-lg">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="hover:scale-110 transition-transform duration-300"
            >
              <img
                src={`/src/assets/cars/car${index + 1}.png`}
                className="w-20 h-20 object-contain grayscale hover:grayscale-0 transition-all duration-500"
                alt="Car brand"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Other Sections */}
        <Steps />
        <Details />
        <Reason />
        <Variety />
        <Footer />
      </div>

      {/* Add these to your global CSS or as a style tag */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export default LandingPage;
