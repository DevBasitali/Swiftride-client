import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Toast from "../Toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Upload, User, Building, CreditCard, Phone, MapPin, Mail, Lock } from "lucide-react";
import Navbar from "./Navbar";

const Base_Url = import.meta.env.VITE_API_URL;

function ShowroomSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sname: "",
    owner: "",
    cnic: "",
    contact: "",
    address: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({
    sname: "",
    owner: "",
    cnic: "",
    contact: "",
    address: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [image, setImage] = useState(null);
  const [logo, setLogo] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        Toast("Please select an image file", "error");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        Toast("Image size should be less than 2MB", "error");
        return;
      }
      setImage(file);
      setLogo(URL.createObjectURL(file));
    }
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "sname":
        if (!value.trim()) error = "Showroom name is required";
        else if (!/^[a-zA-Z0-9\s&'-]+$/.test(value))
          error = "Showroom name can only contain letters, numbers, spaces, &, ', or -";
        else if (value.length < 3) error = "Showroom name must be at least 3 characters";
        break;
      case "owner":
        if (!value.trim()) error = "Owner name is required";
        else if (!/^[a-zA-Z\s]+$/.test(value))
          error = "Owner name can only contain letters and spaces";
        else if (value.length < 3) error = "Owner name must be at least 3 characters";
        break;
      case "cnic":
        if (!value.trim()) error = "CNIC is required";
        else if (!/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(value))
          error = "CNIC must be in format XXXXX-XXXXXXX-X";
        break;
      case "contact":
        if (!value.trim()) error = "Contact number is required";
        else if (!/^[0-9]{4}-[0-9]{7}$/.test(value))
          error = "Contact must be in format XXXX-XXXXXXX";
        break;
      case "address":
        if (!value.trim()) error = "Address is required";
        else if (value.length < 10)
          error = "Address must be at least 10 characters";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        )
          error = "Please enter a valid email address";
        break;
      case "password":
        if (!value.trim()) error = "Password is required";
        else if (value.length < 8)
          error = "Password must be at least 8 characters";
        else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
            value,
          )
        )
          error =
            "Password must contain uppercase, lowercase, numbers, and special characters";
        break;
      case "cpassword":
        if (!value.trim()) error = "Please confirm your password";
        else if (value !== formData.password) error = "Passwords do not match";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
    // Clear API error when user starts typing
    if (apiError) setApiError("");
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError("");
  
    // Validate all fields
    let isValid = true;
    Object.keys(formData).forEach((field) => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });
  
    if (!isValid) {
      Toast("Please fix the errors in the form", "error");
      setIsSubmitting(false);
      return;
    }
  
    if (!image) {
      Toast("Showroom logo/image is required", "error");
      setIsSubmitting(false);
      return;
    }
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("images", image);
      formDataToSend.append("ownerName", formData.owner);
      formDataToSend.append("showroomName", formData.sname);
      formDataToSend.append("cnic", formData.cnic);
      formDataToSend.append("contactNumber", formData.contact);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("role", "showroom");
  
      const response = await axios.post(
        `${Base_Url}/api/signup`,
        formDataToSend,
      );
  
      if (response.status === 201) {
        Toast("Showroom registered successfully!", "success", () =>
          navigate("/login"),
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.message || "Error occurred during registration";
      
      // Check for specific field errors
      if (error.response?.data?.errors) {
        const fieldErrors = error.response.data.errors;
        setErrors(prev => ({
          ...prev,
          ...fieldErrors
        }));
        
        // Highlight the problematic fields
        Object.keys(fieldErrors).forEach(field => {
          Toast(fieldErrors[field], "error");
        });
      } 
      // Handle specific error messages from the API
      else if (errorMessage.includes("Email already registered")) {
        setErrors(prev => ({ ...prev, email: "Email is already registered" }));
        Toast("Email is already registered", "error");
      } 
      else if (errorMessage.includes("CNIC already registered")) {
        setErrors(prev => ({ ...prev, cnic: "CNIC is already registered" }));
        Toast("CNIC is already registered", "error");
      } 
      else if (errorMessage.includes("Contact number already registered")) {
        setErrors(prev => ({ ...prev, contact: "Contact number is already registered" }));
        Toast("Contact number is already registered", "error");
      } 
      else {
        setApiError(errorMessage);
        Toast(errorMessage, "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen py-12 px-4 flex items-center justify-center bg-gray-50">
        <div className="absolute inset-0 bg-black/50 z-0">
          <img 
            src="/src/assets/background.png"
            alt="Car Showroom Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 w-full max-w-2xl p-8 bg-gray-300 backdrop-blur-lg bg-white/30 rounded-xl shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <img
              src="/src/assets/logo.png"
              className="h-24 object-contain mb-4"
              alt="Logo"
            />
            <h2 className="text-3xl font-bold text-[#00004b] text-center">
              Showroom Registration
            </h2>
            <p className="text-gray-900 mt-2 text-center">
              Create your account to start listing vehicles
            </p>
          </div>

          {/* API Error Display */}
          {apiError && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{apiError}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Logo Upload */}
                <div className="flex flex-col items-center">
                  <label className="relative cursor-pointer group">
                    <div className="w-32 h-32 rounded-full border-4 border-dashed border-gray-300 group-hover:border-[#C17D3C] transition-colors flex items-center justify-center overflow-hidden bg-gray-100">
                      {logo ? (
                        <img
                          src={logo}
                          alt="Showroom Logo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center text-gray-500">
                          <Upload size={28} className="mb-2" />
                          <span className="text-sm">Upload Logo</span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      name="images"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                      required
                    />
                  </label>
                  {!logo && (
                    <p className="mt-2 text-xs text-gray-900">
                      Recommended: Square image, 300x300px, max 2MB
                    </p>
                  )}
                </div>

                {/* Showroom Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-2 text-[#C17D3C]" />
                      Showroom Name
                    </div>
                  </label>
                  <input
                    name="sname"
                    value={formData.sname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Cars Club"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                      errors.sname ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.sname && (
                    <p className="mt-1 text-sm text-red-600">{errors.sname}</p>
                  )}
                </div>

                {/* Owner Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-[#C17D3C]" />
                      Owner Name
                    </div>
                  </label>
                  <input
                    name="owner"
                    type="text"
                    value={formData.owner}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                      errors.owner ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.owner && (
                    <p className="mt-1 text-sm text-red-600">{errors.owner}</p>
                  )}
                </div>

                {/* CNIC */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2 text-[#C17D3C]" />
                      Owner's CNIC
                    </div>
                  </label>
                  <input
                    name="cnic"
                    type="text"
                    value={formData.cnic}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="12345-6789012-3"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                      errors.cnic ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.cnic && (
                    <p className="mt-1 text-sm text-red-600">{errors.cnic}</p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Contact */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-[#C17D3C]" />
                      Contact Number
                    </div>
                  </label>
                  <input
                    name="contact"
                    type="tel"
                    value={formData.contact}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="0300-1234567"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                      errors.contact ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.contact && (
                    <p className="mt-1 text-sm text-red-600">{errors.contact}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-[#C17D3C]" />
                      Address
                    </div>
                  </label>
                  <input
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="1234 Main St, City"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-[#C17D3C]" />
                      Email
                    </div>
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email"
                    placeholder="name@example.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    <div className="flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-[#C17D3C]" />
                      Password
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C17D3C]"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-900">
                    Must be at least 8 characters with uppercase, lowercase, number & special character
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    <div className="flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-[#C17D3C]" />
                      Confirm Password
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      name="cpassword"
                      value={formData.cpassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:border-transparent ${
                        errors.cpassword ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C17D3C]"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.cpassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.cpassword}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-[#C17D3C] hover:bg-[#B06F35] text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#C17D3C] focus:ring-offset-2 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  "Register Showroom"
                )}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-900">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#00004b] hover:text-[#B06F35] hover:underline"
              >
                Log in here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ShowroomSignUp;
