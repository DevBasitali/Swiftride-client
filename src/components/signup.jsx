import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Toast from "./Toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Eye, EyeOff, User, CreditCard, Phone, MapPin, Mail, Lock } from "lucide-react";

const Base_Url = import.meta.env.VITE_API_URL;

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    cnic: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    contact: '',
    cnic: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (!/^[a-zA-Z\s]+$/.test(value))
          error = 'Name should contain only letters';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
          error = 'Please enter a valid email address';
        break;
      case 'cnic':
        if (!value.trim()) error = 'CNIC is required';
        else if (!/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(value))
          error = 'CNIC must be in format XXXXX-XXXXXXX-X';
        break;
      case 'contact':
        if (!value.trim()) error = 'Contact number is required';
        else if (!/^[0-9]{4}-[0-9]{7}$/.test(value))
          error = 'Contact must be in format XXXX-XXXXXXX';
        break;
      case 'password':
        if (!value.trim()) error = 'Password is required';
        else if (value.length < 8)
          error = 'Password must be at least 8 characters';
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(value))
          error = 'Password must contain uppercase, lowercase, numbers, and special characters';
        break;
      case 'confirmPassword':
        if (!value.trim()) error = 'Please confirm your password';
        else if (value !== formData.password) error = 'Passwords do not match';
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    let isValid = true;
    Object.keys(formData).forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    if (!isValid) {
      Toast('Please fix the errors in the form', 'error');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(`${Base_Url}/api/signup`, {
        ownerName: formData.name,
        cnic: formData.cnic,
        contactNumber: formData.contact,
        address: formData.address,
        email: formData.email,
        password: formData.password,
        role: "client",
      });

      if (response.status === 201) {
        Toast(response.data, 'success', () => navigate('/login'));
      }
    } catch (error) {
      Toast(error.response?.data || 'An error occurred', 'error');
      console.error('Signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen py-16 background">
        <div className="w-screen h-fit max-w-lg p-5 bg-gray-300 backdrop-blur-lg bg-white/30 border border-white/10 rounded-3xl shadow-lg">
          <div className="flex justify-center">
            <img
              src="/src/assets/logo.png"
              className="-ml-4 w-[100px]"
              alt="Logo"
            />
          </div>
          <h2 className="text-2xl font-bold text-[#02073F] text-center mb-4">
            Register Account
          </h2>

          <form onSubmit={handleSignup} className="rounded mb-4">
            {/* Form Table */}
            <table className="w-full text-sm text-left">
              <tbody>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Full Name</td>
                  <td className="py-4">
                    <div className="relative">
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        placeholder="John Doe"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
                          errors.name ? "border-red-900" : ""
                        }`}
                      />
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                    {errors.name && (
                      <p className="text-red-900 text-xs mt-1">
                        {errors.name}
                      </p>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Email</td>
                  <td className="py-4">
                    <div className="relative">
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="email"
                        placeholder="name@example.com"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
                          errors.email ? "border-red-900" : ""
                        }`}
                      />
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                    {errors.email && (
                      <p className="text-red-900 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">CNIC</td>
                  <td className="py-4">
                    <div className="relative">
                      <input
                        name="cnic"
                        type="text"
                        value={formData.cnic}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="12345-6789012-3"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
                          errors.cnic ? "border-red-900" : ""
                        }`}
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                    {errors.cnic && (
                      <p className="text-red-900 text-xs mt-1">{errors.cnic}</p>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Contact Number</td>
                  <td className="py-4">
                    <div className="relative">
                      <input
                        name="contact"
                        type="tel"
                        value={formData.contact}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="0300-1234567"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
                          errors.contact ? "border-red-900" : ""
                        }`}
                      />
                      <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                    {errors.contact && (
                      <p className="text-red-900 text-xs mt-1">
                        {errors.contact}
                      </p>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Address</td>
                  <td className="py-4">
                    <div className="relative">
                      <input
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="1234 Main St, City"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
                          errors.address ? "border-red-900" : ""
                        }`}
                      />
                      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                    {errors.address && (
                      <p className="text-red-900 text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
                  </td>
                </tr>
                {/* Password Field */}
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Password</td>
                  <td className="py-4">
                    <div className="relative">
                      <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
                          errors.password ? "border-red-900" : ""
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
                      <p className="text-red-900 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                    <p className="text-xs text-gray-900 mt-1">
                      Must contain uppercase, lowercase, number & special char
                    </p>
                  </td>
                </tr>

                {/* Confirm Password Field */}
                <tr className="border-b">
                  <td className="py-4 font-bold w-1/3">Confirm Password</td>
                  <td className="py-4">
                    <div className="relative">
                      <input
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="********"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C17D3C] ${
                          errors.confirmPassword ? "border-red-900" : ""
                        }`}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C17D3C]"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-900 text-xs mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Sign Up Button */}
            <div className="flex items-center justify-center mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#C17D3C] hover:bg-[#B06F35] text-white font-bold py-2 px-4 rounded focus:outline-none w-full transition-colors ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : 'Sign Up'}
              </button>
            </div>
          </form>

          {/* Redirect to Login */}
          <p className="mt-4 text-center text-[#02073F] text-xs">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#02073F] font-bold hover:text-[#ffffff]"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;
