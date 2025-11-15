import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-8">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo & Tagline */}
        <div>
          <h1 className="text-2xl font-semibold text-blue-400 flex items-center">
            <img
              src="/src/assets/logo2.png"
              className="-ml-4 p w-[150px]"
              alt=""
            />
            <span className="mr-2">Rent</span>
            <span className="text-white">Rush</span>
          </h1>
          <p className="text-gray-400 text-sm">
            It's a never-ending battle of making your cars better and also
            trying to be better yourself.
          </p>
          {/* <br></br> */}
          {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            <a href="/showroom/signup" className="text-sm hover:underline">
              Register
            </a>
          </button> */}
        </div>

        {/* Account Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Account</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#Home" className="hover:text-blue-500">
                Home
              </a>
            </li>{" "}
            <Link to="/#HOME"></Link>
            <li>
              <a href="#steps" className="hover:text-blue-500">
                How It Works
              </a>
            </li>{" "}
            <Link to="/#steps"></Link>
            <li>
              <a href="#requirements" className="hover:text-blue-500">
              Documents
              </a>
            </li>
            <li>
              <a href="#detail" className="hover:text-blue-500">
                Why Choose Us
              </a>
            </li>
            <li>
              <a href="#rent" className="hover:text-blue-500">
                Testimonials
              </a>
            </li>
          </ul>
        </div>

        {/* Features Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Features</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-blue-500">
                iOS & Android Website
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Bookings
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Locations
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400">rentrush26@gmail.com</p>
          <p className="text-gray-400">+92 336 1841504</p>
          <p className="text-gray-400">RentRush</p>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500 mt-8">
        <p>&copy; 2025 RentRush. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-blue-400">
            Terms
          </a>
          <span className="text-gray-600">•</span>
          <a href="#" className="hover:text-blue-400">
            Privacy Policy
          </a>
          <span className="text-gray-600">•</span>
          <a href="#" className="hover:text-blue-400">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
