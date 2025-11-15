import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Toast from "./Toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Eye, EyeOff } from "lucide-react";

const Base_Url = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&.*()_+])[A-Za-z\d!@#$.%^&*()_+]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate password
    if (name === "password") {
      if (!value) {
        setErrors(prev => ({ ...prev, password: "Password is required" }));
      } else if (!validatePassword(value)) {
        setErrors(prev => ({ ...prev, password: "Password must contain letters, numbers, and special characters" }));
      } else {
        setErrors(prev => ({ ...prev, password: "" }));
      }
    }
    
    // Validate password confirmation
    if (name === "confirmPassword") {
      if (!value) {
        setErrors(prev => ({ ...prev, confirmPassword: "Please confirm your password" }));
      } else if (value !== formData.password) {
        setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation before submission
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must contain letters, numbers, and special characters";
      isValid = false;
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    
    setErrors(newErrors);
    
    if (!isValid) {
      Toast("Password must contain letters, numbers, and special characters", "error");
      return;
    }

    try {
      const response = await axios.post(
        `${Base_Url}/api/reset-password/${token}`,
        { password: formData.password }
      );
      
      if (response.status === 200) {
        Toast("Password reset successfully!", "success");
        navigate("/login");
      }
    } catch (error) {
      Toast(error.response?.data?.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center background h-[calc(100vh-70px)]">
        <div className="w-screen max-w-md py-5 px-8 bg-gray-300 backdrop-blur-lg bg-white/30 border border-white/10 rounded-3xl shadow-lg">
          <div className="flex justify-center">
            <img src="/src/assets/logo.png" className="-ml-4 p w-[150px]" alt="Logo" />
          </div>
          <h2 className="pt-2 font-bold text-[35px] text-[#02073F] ml-5">
            Reset Password
          </h2>
          <form className="mt-8 rounded mb-4 ml-5" onSubmit={handleSubmit}>
            {/* New Password Field */}
            <div className="mb-3">
              <label className="block text-[#02073F] text-sm font-bold mb-2" htmlFor="password">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  id="password"
                  placeholder="New Password"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline ${
                    errors.password ? "border-red-900" : ""
                  }`}
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-900 text-xs mt-1">{errors.password}</p>
              )}
              {/* <p className="text-xs text-gray-600 mt-1">
                Password must contain letters, numbers, and special characters
              </p> */}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-3">
              <label className="block text-[#02073F] text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-900 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-[#C17D3C] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full hover:bg-[#B06F35] transition-colors"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
