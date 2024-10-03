import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Logo from "../../assets/logo.png";
import DefaultAvatar from "../../assets/avatar/default-avatar.png";
import { FaCaretDown, FaShoppingCart } from "react-icons/fa";
import DarkMode from "./DarkMode";
import Popup from "../Popup/Popup";
import Cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "About us", link: "/aboutus" },
  { id: 3, name: "News", link: "/news" },
  { id: 4, name: "Policy", link: "/policy" },
  { id: 5, name: "Contact", link: "/contact" },
];

const DropdownLinks = [
  { id: 1, name: "Best Selling", link: "/bestselling" },
  { id: 2, name: "Top Rated", link: "/toprated" },
];

const Navbar = () => {
  const [loginPopup, setLoginPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState(DefaultAvatar);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLoginPopup = () => {
    setLoginPopup(!loginPopup);
  };

  const checkTokenValidity = () => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const isExpired = Date.now() >= decodedToken.exp * 1000;

      if (!isExpired) {
        setIsLoggedIn(true);
        setUserAvatar(decodedToken.avatar || DefaultAvatar);
      }
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    setUserAvatar(DefaultAvatar);
    navigate("/");
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <Link to="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={Logo} alt="Logo" className="w-10" />
              Japan Koi Shopee
            </Link>
          </div>

          {/* button login / avatar */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              {isLoggedIn ? (
                // Display avatar icon if logged in
                <div className="flex items-center gap-4">
                  <FaShoppingCart
                    className="text-xl cursor-pointer"
                    onClick={() => navigate("/cart")}
                  />
                  <Avatar
                    alt="User Avatar"
                    src={userAvatar}
                    sx={{ width: 40, height: 40 }}
                    onClick={() => setShowDropdown((prev) => !prev)} // Toggle dropdown on avatar click
                    style={{ cursor: "pointer" }}
                  />
                  {showDropdown && ( // Show dropdown if visible
                    <div className="absolute left-0 z-50 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg mt-40 ml-10">
                      <ul>
                        <li>
                          <Link
                            to="/user-profile" // Link to user profile
                            className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => setShowDropdown(false)} // Close dropdown on click
                          >
                            User Profile
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout} // Handle logout
                            className="block w-full text-left px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    border: "2px solid #000",
                    borderRadius: "16px",
                  }}
                  onClick={handleLoginPopup}
                >
                  Login
                </Button>
              )}
            </div>

            {/* Darkmode Switch */}
            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>

      {/* lower Navbar */}
      <div data-aos="zoom-in" className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {Menu.map((data) => (
            <li key={data.id}>
              <Link
                to={data.link}
                className="inline-block px-4 hover:text-primary duration-200"
              >
                {data.name}
              </Link>
            </li>
          ))}
          {/* Simple Dropdown and Links */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2">
              Best Fish
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <Link
                      to={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                    >
                      {data.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>

      {/* Popup Component */}
      <Popup loginPopup={loginPopup} setLoginPopup={setLoginPopup} />
    </div>
  );
};

export default Navbar;
