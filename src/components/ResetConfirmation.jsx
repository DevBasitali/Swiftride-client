import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ResetConfirmation = () => {
  const location = useLocation();
  const email = location.state?.email || "your email";

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center background h-[calc(100vh-70px)]">
        <div className="w-screen max-w-md py-5 px-8 bg-gray-300 backdrop-blur-lg bg-white/30 border border-white/10 rounded-3xl shadow-lg">
          <div className="flex justify-center">
            <img src="/src/assets/logo.png" className="-ml-4 p w-[150px]" />
          </div>
          <h2 className="pt-2 font-bold text-[35px] text-[#02073F] ml-5">
            Password Reset Email Sent
          </h2>
          <p className="mt-4 text-center text-[#02073F] text-sm">
            We have sent an email to {email} with a link to reset your password.
          </p>
          <p className="mt-4 text-center text-[#02073F] text-xs">
            {/* <Link
              to="/reset-password"
              className="text-[#02073F] hover:text-[#ffffff] font-bold"
            >
              Return to Reset Password Page
            </Link> */}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetConfirmation;
