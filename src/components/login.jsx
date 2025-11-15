import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Toast from "./Toast";

const Base_Url = import.meta.env.VITE_API_URL;

function Login() {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const response = await axios.post(
        `${Base_Url}/api/login`,
        { email: email, password: password },
        { withCredentials: true }
      );
      const userRole = response.data.role;
      if (userRole === "showroom" || userRole === "client") {
        const showroomStatus = response.data.status;
        if (showroomStatus === "banned") {
          Toast("Your are banned. Please contact support.", "error");
          return;
        }
      }
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("role", response.data.role);
      sessionStorage.setItem("showroomName", response.data?.showroomName);
      sessionStorage.setItem("logo", response.data?.logo);

      if (userRole === "admin") {
        Toast("Login Successful!", "success");
        navigator("/admin/dashboard");
      } else if (userRole === "client") {
        Toast("Login Successful!", "success");
        sessionStorage.setItem("name", response.data.name);
        navigator("/customer/dashboard");
      } else if (userRole === "showroom") {
        Toast("Welcome to Showroom!", "success");
        navigator("/showroom/dashboard");
      } else {
        Toast("Role not recognized.", "error");
        navigator("/login");
      }
    } catch (error) {
      setLoginError("The username or password you entered is incorrect.");
      Toast(error.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center background h-[calc(100vh-70px)]">
        <div className="w-screen max-w-md py-5 px-8 bg-gray-300 backdrop-blur-lg bg-white/30 border border-white/10 rounded-3xl shadow-lg">
          <div className="flex justify-center">
            <img
              src="/src/assets/logo.png"
              className="-ml-4 p w-[150px]"
              alt="Logo"
            />
          </div>
          <h2 className="pt-2 font-bold text-[35px] text-[#02073F] ml-5">
            Login
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
            <div className="mb-2 relative">
              <label
                className="block text-[#02073F] text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {isPasswordFocused || password.length > 0 ? (
                <span
                  className="absolute top-9 right-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              ) : null}
            </div>
            {loginError && (
              <div className="text-red-900 text-16px mb-4">{loginError}</div>
            )}
            <p className="text-xs py-2 font-bold hover:cursor-pointer hover:text-[#ffffff] text-[#02073F]">
              <Link to="/forgot-password">Forgot password?</Link>
            </p>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-[#C17D3C] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-[#02073F] text-xs">
            Don't have an account?&nbsp;
            <Link
              to="/signup"
              className="text-[#02073F] hover:text-[#ffffff] font-bold"
            >
              Register for free
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
