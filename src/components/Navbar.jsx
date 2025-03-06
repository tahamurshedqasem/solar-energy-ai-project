"use client";
import { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";
import { FiMenu, FiUser, FiLogOut } from "react-icons/fi";

export default function Navbar({ isSidebarOpen, toggleSidebar }) {
  const { isAuthenticated, logout, loading } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 p-4 shadow-md text-white flex justify-between items-center transition-all duration-300">
      {/* Left Section: Sidebar Toggle */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-white p-2 focus:outline-none"
        >
          <FiMenu size={24} />
        </button>
        <h1 className="text-xl font-bold ml-4">Solar Dashboard</h1>
      </div>

      {/* Center Section: Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <Link href="/" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/weather" className="hover:underline">
          Weather Data
        </Link>
        <Link href="/predictions" className="hover:underline">
          AI Predictions
        </Link>
        <Link href="/reports" className="hover:underline">
          Reports
        </Link>

        {/* Show Additional Tabs if Logged In */}
        {!loading && isAuthenticated && (
          <>
            <Link href="/notifications" className="hover:underline">
              Notifications
            </Link>
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
            <Link href="/settings" className="hover:underline">
              Settings
            </Link>
          </>
        )}
      </div>

      {/* Right Section: Authentication Buttons */}
      <div className="flex items-center space-x-4">
        {!loading &&
          (isAuthenticated ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition flex items-center space-x-2"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-md hover:bg-yellow-300 transition"
              >
                Sign Up
              </Link>
            </>
          ))}
      </div>
    </nav>
  );
}
