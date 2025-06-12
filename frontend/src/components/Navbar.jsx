import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
// import React, { useRef } from 'react'; // Import useRef at the top of App.js

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const displayName = localStorage.getItem("displayName");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getInitial = (name) => {
    if (!name) return "";
    const cleaned = name.includes("@") ? name.split("@")[0] : name;
    return cleaned.charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("displayName");
    navigate("/");
    window.location.reload();
  };

  // Close dropdown/sidebar when clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <nav className="relative z-50 backdrop-blur-lg bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-4 shadow-xl border-b border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-300 hover:text-white transition-all duration-300"
            >
              AI-Assistant
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex space-x-6">
              <Link to="/about" className="hover:text-blue-200 font-medium">
                About
              </Link>
              <button
  onClick={() => {
    if (!token) {
      // alert("Please log in to continue."); // Or toast
            toast.error("Please log in to access the editor!");
      
    } else {
      navigate("/write");
    }
  }}
  className="hover:text-blue-200 font-medium"
>
  Write
</button>

            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Hamburger for Mobile */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            {/* Login / Profile */}
            <div className="relative hidden md:block" ref={dropdownRef}>
              {!token ? (
                <Link
                  to="/login"
                  className="bg-white/20 px-6 py-2 rounded-full font-medium hover:bg-white/30 hover:shadow-md border border-white/20"
                >
                  Get Started
                </Link>
              ) : (
                <>
                  <div
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-10 h-10 cursor-pointer rounded-full bg-blue-400 text-white 
                              flex items-center justify-center font-bold text-xl hover:scale-105 
                              transition-all shadow-md hover:shadow-lg"
                    title={displayName}
                  >
                    {getInitial(displayName)}
                  </div>

                  {dropdownOpen && (
                    <div
                      className="absolute right-0 mt-3 w-52 bg-gradient-to-br from-blue-600/90 to-purple-700/90 
                      backdrop-blur-lg text-white rounded-xl shadow-2xl z-[100] py-3 px-4 border border-white/20"
                    >
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-3 py-2.5 hover:bg-white/10 rounded-lg 
                          transition-all duration-200 text-sm font-medium"
                      >
                        <LogOut size={18} className="mr-2 text-red-300" />
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
      {/* Sidebar with glass effect */}
<div className="relative w-72 h-full bg-white/10 backdrop-blur-md shadow-xl p-6 border-r border-white/20 rounded-r-xl">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-xl font-bold">AI-Assistant</h2>
    <button onClick={() => setSidebarOpen(false)}>
      <X size={24} />
    </button>
  </div>

  <div className="flex flex-col space-y-4">
    <Link
      to="/about"
      onClick={() => setSidebarOpen(false)}
      className="hover:text-blue-200"
    >
      About
    </Link>
<button
  onClick={() => {
    if (!token) {
      // alert("Please log in to continue."); // Or use your toast
            toast.error("Please log in to access the editor!");
      
    } else {
      navigate("/write");
      setSidebarOpen(false);
    }
  }}
  className="text-left hover:text-blue-200"
>
  Write
</button>

    {!token ? (
      <Link
        to="/login"
        onClick={() => setSidebarOpen(false)}
        className="hover:text-blue-200"
      >
        Get Started
      </Link>
    ) : (
      <button
        onClick={() => {
          handleLogout();
          setSidebarOpen(false);
        }}
        className="flex items-center space-x-2 text-left hover:text-red-300"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    )}
  </div>
</div>

      </div>
    </>
  );
}
