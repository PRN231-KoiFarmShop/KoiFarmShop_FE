import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AuthService from "../Services/AuthService";
import Cookies from "js-cookie";

const Popup = ({ loginPopup, setLoginPopup }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
    });
    setError("");
    setSuccess("");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (activeTab === "login") {
        const loginData = {
          email: formData.email,
          password: formData.password,
        };
        const response = await AuthService.login(loginData);
        // Check response structure
        if (response && response.status === 200) {
          setSuccess("Login successful!");
          // Set token in cookie
          Cookies.set("token", response.data.token, { expires: 7 });
          console.log("User:", response.user);
          // wait 1 seconds and close popup then reload current page
          setTimeout(() => {
            setLoginPopup(false); // Close the popup
            window.location.reload(); // Reload the current page
          }, 1000);
        } else {
          setError(response.message || "Login failed!");
        }
      } else {
        // Validate password confirmation
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match!");
          return;
        }

        const signUpData = {
          email: formData.email,
          password: formData.password,
          role: 1, // Default role num
          phoneNumber: formData.phone,
          address: formData.address,
        };
        const response = await AuthService.signUp(signUpData);

        // Check response structure
        if (response && response.status === 200) {
          setSuccess("Signup successful! Please log in.");
          alert("Signup successful! Please log in.");
          handleTabSwitch("login"); // Switch to login tab after successful signup
        } else {
          setError(response.message || "Signup failed!");
        }
      }
    } catch (err) {
      setError(
        "An error occurred: " + (err.message || "Something went wrong!")
      );
    }
  };

  if (!loginPopup) return null;

  return (
    <div className="popup fixed inset-0 bg-black/50 z-50 backdrop-blur-sm flex items-center justify-center">
      <div className="p-6 shadow-md bg-white dark:bg-gray-900 rounded-md w-[350px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">
            {activeTab === "login" ? "Login" : "Signup"}
          </h1>
          <IoCloseOutline
            className="text-2xl cursor-pointer"
            onClick={() => setLoginPopup(false)}
          />
        </div>

        {/* Tabs */}
        <div className="flex justify-around mb-6">
          <button
            className={`py-2 px-4 rounded-lg font-semibold ${
              activeTab === "login"
                ? "bg-primary text-white"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
            onClick={() => handleTabSwitch("login")}
          >
            Login
          </button>
          <button
            className={`py-2 px-4 rounded-lg font-semibold ${
              activeTab === "signup"
                ? "bg-primary text-white"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
            onClick={() => handleTabSwitch("signup")}
          >
            Signup
          </button>
        </div>

        {/* Error and Success Messages */}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-500 mb-2">{success}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
            required
          />

          {/* Password field with hide/show icon */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 pr-10"
              required
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>

          {activeTab === "signup" && (
            <>
              {/* Confirm Password field with hide/show icon */}
              <div className="relative mb-4">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 pr-10"
                  required
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </div>
              </div>

              {/* Phone and Address fields */}
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                required
              />
            </>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-6 rounded-full"
            >
              {activeTab === "login" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
