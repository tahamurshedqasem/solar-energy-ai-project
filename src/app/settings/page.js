"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Import Router
import axios from "axios";
import { FiBell, FiSun } from "react-icons/fi";

export default function Settings() {
  const router = useRouter(); // ✅ Initialize Router
  const [settings, setSettings] = useState({
    notification_preference: "email",
    solar_panel_orientation: "south-facing",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://127.0.0.1:8000/api/settings";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  // ✅ Check Authentication & Fetch Settings
  useEffect(() => {
    if (!token) {
      router.replace("/login"); // 🚀 Redirect to login page if not authenticated
      return;
    }

    const fetchSettings = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) {
          setSettings(response.data);
        }
      } catch (err) {
        setError("⚠️ Failed to fetch settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [token, router]);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  // ✅ Save Settings to Backend
  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      const response = await axios.post(API_URL, settings, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("✅ Settings updated successfully!");
      }
    } catch (err) {
      setError("⚠️ Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 w-full max-w-lg bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">Settings</h1>
        <p className="text-gray-600 text-center mb-6">
          Manage your preferences.
        </p>

        {loading ? (
          <p className="text-gray-500 text-center">Loading settings...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <>
            {/* ✅ Notification Settings */}
            <div className="bg-gray-100 p-4 rounded-md shadow-md mb-6">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <FiBell /> <span>Notification Preferences</span>
              </h2>

              <select
                name="notification_preference"
                value={settings.notification_preference}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-md w-full mt-4"
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="app">App Notifications</option>
              </select>
            </div>

            {/* ✅ Solar Panel Orientation */}
            <div className="bg-gray-100 p-4 rounded-md shadow-md">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <FiSun /> <span>Solar Panel Orientation</span>
              </h2>

              <input
                type="text"
                name="solar_panel_orientation"
                value={settings.solar_panel_orientation}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-md w-full mt-4"
                placeholder="Enter Orientation (e.g., south-facing)"
              />
            </div>

            {/* ✅ Save Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
