"use client";
import { useEffect, useState } from "react";
// import Layout from "../app/layout";
import {
  FiBell,
  FiSun,
  FiCloudRain,
  FiWind,
  FiAlertTriangle,
} from "react-icons/fi";

// Mock API (Replace with actual backend API)
const fetchNotifications = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          type: "Weather Alert",
          message:
            "High temperatures detected. Consider cooling strategies for solar panels.",
          icon: <FiSun className="text-red-500" />,
          time: "10 minutes ago",
        },
        {
          id: 2,
          type: "Energy Efficiency Tip",
          message:
            "AI recommends adjusting solar panel angle for optimal performance.",
          icon: <FiAlertTriangle className="text-yellow-500" />,
          time: "30 minutes ago",
        },
        {
          id: 3,
          type: "Weather Alert",
          message:
            "Strong winds detected. Secure solar panels to prevent damage.",
          icon: <FiWind className="text-blue-500" />,
          time: "1 hour ago",
        },
        {
          id: 4,
          type: "Cloud Cover Update",
          message: "Heavy cloud cover expected. Solar efficiency may decrease.",
          icon: <FiCloudRain className="text-gray-500" />,
          time: "2 hours ago",
        },
      ]);
    }, 1000);
  });
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getNotifications() {
      const data = await fetchNotifications();
      setNotifications(data);
      setLoading(false);
    }
    getNotifications();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold">Notifications</h1>
      <p className="text-gray-600">
        Stay updated with real-time alerts and AI recommendations.
      </p>

      {/* Notifications List */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <FiBell /> <span>Recent Alerts</span>
        </h2>

        {loading ? (
          <p className="mt-4 text-gray-500">Loading notifications...</p>
        ) : notifications.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="flex items-center space-x-4 p-4 border rounded-md shadow-sm"
              >
                {notification.icon}
                <div>
                  <h3 className="text-lg font-semibold">{notification.type}</h3>
                  <p className="text-gray-600">{notification.message}</p>
                  <p className="text-sm text-gray-400">{notification.time}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-gray-500">No new notifications.</p>
        )}
      </div>
   </>
  );
}
