"use client";
import { useState } from "react";
// import Layout from "../app/layout";
import { FiUser, FiMail, FiBell, FiLock, FiMoon, FiSun } from "react-icons/fi";

export default function Settings() {
  const [settings, setSettings] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "",
    notifications: true,
    darkMode: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  // Toggle notification preference
  const toggleNotifications = () => {
    setSettings({ ...settings, notifications: !settings.notifications });
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setSettings({ ...settings, darkMode: !settings.darkMode });
  };

  // Save Settings (Mocked)
  const handleSaveSettings = () => {
    console.log("Saved Settings:", settings);
    alert("Settings saved successfully!");
  };

  return (
  <>
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-gray-600">Manage your account and preferences.</p>

      {/* Account Settings */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <FiUser /> <span>Account Settings</span>
        </h2>

        <div className="mt-4 space-y-4">
          <div className="flex items-center space-x-3">
            <FiUser className="text-blue-600" />
            <input
              type="text"
              name="name"
              value={settings.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>

          <div className="flex items-center space-x-3">
            <FiMail className="text-blue-600" />
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>

          <div className="flex items-center space-x-3">
            <FiLock className="text-blue-600" />
            <input
              type="password"
              name="password"
              placeholder="New Password"
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <FiBell /> <span>Notification Preferences</span>
        </h2>

        <div className="mt-4 flex items-center justify-between">
          <span>Enable Notifications</span>
          <button
            onClick={toggleNotifications}
            className={`px-4 py-2 rounded-md text-white transition ${
              settings.notifications
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {settings.notifications ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          {settings.darkMode ? <FiMoon /> : <FiSun />}{" "}
          <span>Theme Settings</span>
        </h2>

        <div className="mt-4 flex items-center justify-between">
          <span>{settings.darkMode ? "Dark Mode" : "Light Mode"}</span>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-md text-white transition ${
              settings.darkMode
                ? "bg-gray-900 hover:bg-gray-800"
                : "bg-yellow-500 hover:bg-yellow-400"
            }`}
          >
            {settings.darkMode ? "Dark" : "Light"}
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSaveSettings}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </div>
    </>
  );
}
