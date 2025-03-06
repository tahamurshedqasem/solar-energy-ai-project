"use client";
import { useState } from "react";
import Layout from "../../app/layout";
import { FiUser, FiMail, FiMapPin, FiEdit, FiCamera } from "react-icons/fi";

export default function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    location: "Riyadh, Saudi Arabia",
    profilePicture: "/default-profile.png", // Default profile image
  });

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newLocation, setNewLocation] = useState(user.location);
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  // Handle Profile Update
  const handleSaveChanges = () => {
    setUser({
      ...user,
      name: newName,
      email: newEmail,
      location: newLocation,
      profilePicture: newProfilePicture || user.profilePicture,
    });
    setEditing(false);
  };

  // Handle Profile Picture Upload (Mocked)
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setNewProfilePicture(imageURL);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold">User Profile</h1>
      <p className="text-gray-600">Manage your personal information.</p>

      {/* Profile Card */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        {/* Profile Picture */}
        <div className="relative">
          <img
            src={newProfilePicture || user.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
          />
          <label className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full cursor-pointer">
            <FiCamera />
            <input
              type="file"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
          </label>
        </div>

        {/* Profile Info */}
        <div className="mt-4 w-full max-w-md">
          <div className="flex items-center space-x-3">
            <FiUser className="text-blue-600" />
            {editing ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            ) : (
              <p className="text-lg">{user.name}</p>
            )}
          </div>

          <div className="flex items-center space-x-3 mt-4">
            <FiMail className="text-blue-600" />
            {editing ? (
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            ) : (
              <p className="text-lg">{user.email}</p>
            )}
          </div>

          <div className="flex items-center space-x-3 mt-4">
            <FiMapPin className="text-blue-600" />
            {editing ? (
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            ) : (
              <p className="text-lg">{user.location}</p>
            )}
          </div>

          {/* Edit / Save Button */}
          <div className="mt-6 flex justify-center">
            {editing ? (
              <button
                onClick={handleSaveChanges}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600 transition"
              >
                <FiEdit /> <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>
   </>
  );
}
