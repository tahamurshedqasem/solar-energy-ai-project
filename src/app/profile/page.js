"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiEdit,
  FiCamera,
  FiSave,
} from "react-icons/fi";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else {
      fetchUserProfile();
    }
  }, [token]);

  // ✅ Fetch User Profile from API
  const fetchUserProfile = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const result = await res.json();
      setUser(result.user);
      setNewName(result.user.name);
      setNewEmail(result.user.email);
      setNewLocation(result.user.location);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Profile Update
  const handleSaveChanges = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          location: newLocation,
        }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const result = await res.json();
      setUser(result.user);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Handle Profile Picture Upload
  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      const res = await fetch(`${API_BASE_URL}/user/upload-profile-picture`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload profile picture");

      const result = await res.json();
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: result.profilePicture,
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading)
    return (
      <p className="text-center text-lg text-gray-500">Loading profile...</p>
    );
  if (error)
    return <p className="text-center text-red-500 text-lg">⚠️ {error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
        <p className="text-gray-500 mb-6">Manage your personal information.</p>

        {/* Profile Picture */}
        <div className="relative w-32 h-32 mx-auto">
          <img
            src={user?.profilePicture || "/default-profile.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
          />
          <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-500 transition">
            <FiCamera size={18} />
            <input
              type="file"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
          </label>
        </div>

        {/* Profile Info */}
        <div className="mt-6 space-y-4 text-left">
          <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-md">
            <FiUser className="text-blue-600" />
            {editing ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="bg-transparent w-full outline-none"
              />
            ) : (
              <p className="text-lg">{user?.name}</p>
            )}
          </div>

          <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-md">
            <FiMail className="text-blue-600" />
            {editing ? (
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="bg-transparent w-full outline-none"
              />
            ) : (
              <p className="text-lg">{user?.email}</p>
            )}
          </div>

          <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-md">
            <FiMapPin className="text-blue-600" />
            {editing ? (
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="bg-transparent w-full outline-none"
              />
            ) : (
              <p className="text-lg">{user?.location || "Not provided"}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6">
          {editing ? (
            <button
              onClick={handleSaveChanges}
              className="w-full bg-green-500 text-white py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-green-600 transition"
            >
              <FiSave />
              <span>Save Changes</span>
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-blue-600 transition"
            >
              <FiEdit />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
