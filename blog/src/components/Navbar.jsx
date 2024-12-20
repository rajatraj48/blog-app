import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { FiLogOut } from "react-icons/fi"; // Import logout icon
import ProfileDetails from "./ProfileDetails";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext); // Access user from context
  const navigate = useNavigate(); // Initialize navigate

  const [open, setOpen] = useState(false); // Mobile menu open/close state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown menu state
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
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <span>WordWeaver</span>
      </Link>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div
          className="cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <span className="text-xl font-bold">X</span>
          ) : (
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </div>
          )}
        </div>
        <div
          className={`w-full h-screen bg-[#DCD0FF] flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-all ease-in-out ${open ? "-right-0" : "-right-[100%]"}`}
        >
          <Link to="/">Home</Link>
          <Link to="/posts?sort=trending">Trending</Link>
          <Link to="/posts?sort=popular">Most Popular</Link>
          <Link to="/">About</Link>
          <button
            className="py-2 px-4 rounded-3xl bg-blue-800 text-white"
            onClick={handleLoginClick}
          >
            {user ? `👋 ${user.username}` : "Login 👋"}
          </button>
          {isDropdownOpen && user && (
            <div className="bg-white rounded shadow p-2 mt-2">
              <button
                className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                onClick={() => setIsModalOpen(true)}
              >
                Profile
              </button>
              <button
                className="block px-4 py-2 text-left w-full text-red-500 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <FiLogOut className="inline mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/posts?sort=trending">Trending</Link>
        <Link to="/posts?sort=popular">Most Popular</Link>
        <Link to="/">About</Link>

        <div className="relative" ref={btnRef}>
          <button
            className="py-2 px-4 rounded-3xl bg-blue-800 text-white hover:bg-blue-700 transition-colors"
            onClick={handleLoginClick}
          >
            {user ? `👋 ${user.username}` : "Login 👋"}
          </button>

          {isDropdownOpen && user && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
              <button
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors rounded-t-lg"
                onClick={() => setIsModalOpen(true)}
              >
                Profile
              </button>
              <button
                className="block w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100 transition-colors rounded-b-lg"
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
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full relative">
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
