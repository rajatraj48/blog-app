import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { FiLogOut } from "react-icons/fi"; // Import logout icon
import ProfileDetails from "./ProfileDetails";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate(); 

  const [open, setOpen] = useState(false); // Mobile menu open/close state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state

  const btnRef = useRef(null); // Reference to the dropdown button
  const dropdownRef = useRef(null); // Reference to the dropdown menu

  useEffect(() => {
    const closeDropdown = (e) => {
      // If clicked outside the dropdown button or menu, close the dropdown
      if (
        btnRef.current && !btnRef.current.contains(e.target) && 
        dropdownRef.current && !dropdownRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
    }
    };

    document.body.addEventListener("click", closeDropdown);

    // Cleanup the event listener on component unmount
    return () => {
      document.body.removeEventListener("click", closeDropdown);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  const handleLoginClick = () => {
    if (!user) {
      navigate("/login"); // Navigate to login if the user is not logged in
    } else {
      setIsDropdownOpen((prev) => !prev); // Toggle dropdown for logged-in user
    }
  };

  const handleLogout = () => {
    setUser(null); // Clear user context (or implement your logout logic)
    navigate("/login");
    setIsDropdownOpen(false); // Close the dropdown on logout
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
<div className="w-full h-16 md:h-20 bg-[#DCD0FF] flex items-center justify-between px-6">
  {/* Logo Section */}
  <Link to="/" className="flex items-center gap-4 text-2xl font-bold text-indigo-900">
    <span>WordWeaver</span>
  </Link>

  {/* Mobile Menu */}
  <div className="md:hidden">
    <div
      className="cursor-pointer"
      onClick={() => setOpen((prev) => !prev)}
    >
      {open ? (
        <span className="text-xl font-bold text-indigo-900">X</span>
      ) : (
        <div className="space-y-1">
          <div className="w-6 h-0.5 bg-indigo-900"></div>
          <div className="w-6 h-0.5 bg-indigo-900"></div>
          <div className="w-6 h-0.5 bg-indigo-900"></div>
        </div>
      )}
    </div>
    <div
      className={`w-full h-screen bg-[#DCD0FF] flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-transform duration-300 ${
        open ? "right-0" : "-translate-x-full"
      }`}
    >
      <Link to="/" className="text-indigo-900 hover:text-indigo-700 transition">
        Home
      </Link>
      <Link to="/posts?sort=trending" className="text-indigo-900 hover:text-indigo-700 transition">
        Trending
      </Link>
      <Link to="/posts?sort=popular" className="text-indigo-900 hover:text-indigo-700 transition">
        Most Popular
      </Link>
      <Link to="/" className="text-indigo-900 hover:text-indigo-700 transition">
        About
      </Link>
      <button
        className="py-2 px-6 rounded-full bg-indigo-800 text-white hover:bg-indigo-700 transition"
        onClick={handleLoginClick}
      >
        {user ? `👋 ${user.username}` : "Login 👋"}
      </button>
    </div>
  </div>

  {/* Desktop Menu */}
  <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium text-indigo-900">
    <Link to="/" className="hover:text-indigo-700 transition">
      Home
    </Link>
    <Link to="/posts?sort=trending" className="hover:text-indigo-700 transition">
      Trending
    </Link>
    <Link to="/posts?sort=popular" className="hover:text-indigo-700 transition">
      Most Popular
    </Link>
    <Link to="/" className="hover:text-indigo-700 transition">
      About
    </Link>
    <div className="relative">
      <button
        className="py-2 px-6 rounded-full bg-indigo-800 text-white hover:bg-indigo-700 transition"
        onClick={handleLoginClick}
      >
        {user ? `👋 ${user.username}` : "Login 👋"}
      </button>
      {isDropdownOpen && user && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-200">
          <button
            className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-t-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Profile
          </button>
          <button
            className="block w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100 rounded-b-lg"
            onClick={handleLogout}
          >
            <FiLogOut className="inline mr-2" /> Logout
          </button>
        </div>
      )}
    </div>
  </div>

  {/* ProfileDetails Modal */}
  {isModalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-sm w-full relative">
        <button
          className="absolute top-4 right-4 text-xl font-bold"
          onClick={closeModal}
        >
          X
        </button>
        <ProfileDetails profile={user} closeModal={closeModal} />
      </div>
    </div>
  )}
</div>

  
  );
};

export default Navbar;
