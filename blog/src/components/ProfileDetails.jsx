import React, { useState } from "react";

const ProfileDetails = ({ profile, closeModal }) => {
  const { name, username, email, password } = profile;

  // State to handle changes in the input fields
  const [editedProfile, setEditedProfile] = useState({
    name: name || "John Doe",
    username: username || "johndoe",
    email: email || "email@example.com",
    password: password || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(editedProfile,"formdata")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg w-[900px] relative flex">
      {/* Profile Details Header with Vertical Line */}
      <div className="pr-4 border-r-2 border-gray-300 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-gray-700">Profile Details</h2>
      </div>

      {/* Modal Content */}
      <div className="flex-1 pl-4">
        {/* Close Modal Button */}
        <button
          className="absolute top-4 right-4 text-xl font-bold"
          onClick={closeModal}
        >
          X
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Input Fields */}
          <div>
            <div className="mb-4">
              <label className="text-sm text-gray-500 uppercase font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={editedProfile.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-500 uppercase font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={editedProfile.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                disabled
              />
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-500 uppercase font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={editedProfile.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-500 uppercase font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={editedProfile.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
              />
            </div>

            {/* Save Button */}
            <div className="text-center">
              <button
                type="submit"
                className="py-2 px-4 rounded-3xl bg-blue-800 text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default ProfileDetails;
