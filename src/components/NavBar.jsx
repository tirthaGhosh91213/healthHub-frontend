import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSupportMenuOpen, setIsSupportMenuOpen] = useState(false);

  const profileMenuRef = useRef(null);
  const supportMenuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setIsProfileMenuOpen(false);
    navigate("/signup");
    console.log("User logged out");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
      if (
        supportMenuRef.current &&
        !supportMenuRef.current.contains(event.target)
      ) {
        setIsSupportMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-6 shadow-md sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-6 flex gap-4 justify-between items-center">
          <motion.h1
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            HealthHub
          </motion.h1>
          <nav className="flex space-x-6 text-lg">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link
                to="/"
                className="hover:underline p-2 hover:text-yellow-300"
              >
                Dashboard
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link
                to="/allMeal"
                className="hover:underline p-2 hover:text-yellow-300"
              >
                Meal Plans
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <a
                href="helthHub_frontend\\src\\components\\templates\\chat.html"
                className="hover:underline p-2 hover:text-yellow-300"
              >
                Health Guru
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link
                to="/generateMeal"
                className="hover:underline p-2 hover:text-yellow-300 cursor-pointer"
              >
                Generate Meal Plan
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link
                to="/articles"
                className="hover:underline p-2 hover:text-yellow-300 cursor-pointer"
              >
                Articles
              </Link>
            </motion.div>

            {isAuthenticated ? (
              <div className="relative" ref={profileMenuRef}>
                <motion.div
                  className="cursor-pointer hover:underline hover:text-yellow-300 flex items-center"
                  onClick={() => {
                    setIsProfileMenuOpen(!isProfileMenuOpen);
                    setIsSupportMenuOpen(false);
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <span>Profile</span>
                  <i className="fas fa-chevron-down ml-2"></i>
                </motion.div>
                {isProfileMenuOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-200"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  to="/signup"
                  className="hover:underline p-2 hover:text-yellow-300"
                >
                  Login
                </Link>
              </motion.div>
            )}

            <div className="relative" ref={supportMenuRef}>
              <motion.div
                className="cursor-pointer hover:underline hover:text-yellow-300 flex items-center"
                onClick={() => {
                  setIsSupportMenuOpen(!isSupportMenuOpen);
                  setIsProfileMenuOpen(false);
                }}
                whileHover={{ scale: 1.1 }}
              >
                <span>Support</span>
                <i className="fas fa-chevron-down ml-2"></i>
              </motion.div>
              {isSupportMenuOpen && (
                <motion.div
                  className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to="/ourContact"
                    className="block px-4 py-2 hover:bg-gray-200"
                    
                  >
                    Contact Us
                  </Link>
                  <Link 
                  to="/doctorApply"
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                    Doctor Apply
                  </Link>
                </motion.div>
              )}
            </div>
          </nav>
        </div>
      </header>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
