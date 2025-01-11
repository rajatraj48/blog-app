import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { FiLogOut } from "react-icons/fi"; // Import logout icon
import ProfileDetails from "./ProfileDetails";
import Image from "./Image";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate(); 

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
<div className="w-full h-16 md:h-20 bg-[#F2E6FF] flex items-center justify-between px-6">
  {/* Logo Section */}
  <Link to="/" className="flex items-center gap-4 text-2xl font-bold text-indigo-900">
  <Image src="blog_app/logo.png" alt="Lama Logo" w={32} h={32} />
    <span>WordWeaver</span>
  </Link>

  {/* Mobile Menu */}
  <div className="md:hidden">
        {/* MOBILE BUTTON */}
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {/* Change Hamburger Icon */}
          {/* {open ? "X" : "☰"} */}
          <div className="flex flex-col gap-[5.4px]">
            <div
              className={`h-[3px] rounded-md w-6 bg-black origin-left transition-all ease-in-out ${
                open && "rotate-45"
              }`}
            ></div>
            <div
              className={`h-[3px] rounded-md w-6 bg-black transition-all ease-in-out ${
                open && "opacity-0"
              }`}
            ></div>
            <div
              className={`h-[3px] rounded-md w-6 bg-black origin-left transition-all ease-in-out ${
                open && "-rotate-45"
              }`}
            ></div>
          </div>
        </div>
        {/* MOBILE LINK LIST */}
        <div
          className={`w-full h-screen bg-[#e6e6ff] flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-all ease-in-out ${
            open ? "-right-0" : "-right-[100%]"
          }`}
        >
          <Link to="/" onClick={()=>setOpen(false)}>Home</Link>
          <Link to="/posts?sort=trending" onClick={()=>setOpen(false)}>Trending</Link>
          <Link to="/posts?sort=popular" onClick={()=>setOpen(false)}>Most Popular</Link>
          <Link to="/" onClick={()=>setOpen(false)}>About</Link>
          <Link to="/login" onClick={()=>setOpen(false)}>
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              Login 👋
            </button>
          </Link>
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
