import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "./Toast";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Base_Url = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${Base_Url}/api/forgot-password`, {
        email,
      });
      console.log("response", response.data.url);
      if (response.status === 200) {
        Toast("Password reset email sent!", "success");
        navigate("/reset-confirmation", { state: { email } });
      }
    } catch (error) {
      Toast(error.response?.data?.message || "Enter the correct email address!", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center background h-[calc(100vh-70px)]">
        <div className="w-screen max-w-md py-5 px-8 bg-gray-300 backdrop-blur-lg bg-white/30 border border-white/10 rounded-3xl shadow-lg">
          <div className="flex justify-center">
            <img src="/src/assets/logo.png" className="-ml-4 p w-[150px]" />
          </div>
          <h2 className="pt-2 font-bold text-[35px] text-[#02073F] ml-5">
            Forgot Password
          </h2>
          <form className="mt-8 rounded mb-4 ml-5" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                className="block text-[#02073F] text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="you@example.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-[#C17D3C] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending Link..." : "Send Reset Link"}
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-[#02073F] text-xs">
            Remember your password?&nbsp;
            <Link
              to="/login"
              className="text-[#02073F] hover:text-[#ffffff] font-bold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
