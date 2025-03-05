import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({ ...user });

  if (!user) {
    return <div>Please login to view your profile</div>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    updateUser(formData); // Call the update function (assumes context provides it)
    alert("Profile updated successfully!");
  };

  return (
    <div className="flex p-6 bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-6 rounded-2xl shadow-lg">
        <img
          src={formData.profileImage || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto"
        />
        <h2 className="text-center text-xl font-bold mt-4">{formData.fullName}</h2>
      </div>

      {/* Account Settings */}
      <div className="w-3/4 ml-6 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold">Account Settings</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
                    <div>
            <label className="font-medium text-gray-700">Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">Account Type</label>
            <p className="mt-1 capitalize">{formData.userType}</p>
          </div>
        </div>
        <button
          onClick={handleUpdate}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Profile;
