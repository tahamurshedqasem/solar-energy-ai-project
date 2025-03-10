"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const { isAuthenticated, logout, loading } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ✅ Full-Width Navbar - Fixed at the Top */}
      <nav className="bg-blue-600 w-full fixed top-0 left-0 p-4 px-8 shadow-md text-white flex justify-between items-center transition-all duration-300 z-50">
        {/* Left Section: Logo */}
        <h1 className="text-2xl font-semibold tracking-wide">
          Solar Dashboard
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-lg">
          
          {!loading && isAuthenticated && (
            <>
              <Link
                href="/"
                className="hover:text-gray-200 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/reports"
                className="hover:text-gray-200 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Reports
              </Link>
              <Link
                href="/notifications"
                className="hover:text-gray-200 transition duration-200"
              >
                Notifications
              </Link>
              <Link
                href="/profile"
                className="hover:text-gray-200 transition duration-200"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="hover:text-gray-200 transition duration-200"
              >
                Settings
              </Link>
            </>
          )}
        </div>

        {/* Authentication Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {!loading &&
            (isAuthenticated ? (
              <button
                onClick={logout}
                className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition duration-300 flex items-center space-x-2 shadow-lg"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-white text-blue-600 px-5 py-2 rounded-full hover:bg-gray-200 transition duration-300 shadow-md"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-yellow-400 text-blue-900 px-5 py-2 rounded-full hover:bg-yellow-300 transition duration-300 shadow-md"
                >
                  Sign Up
                </Link>
              </>
            ))}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-white p-2 focus:outline-none z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <FiX size={28} className="text-white" />
          ) : (
            <FiMenu size={28} />
          )}
        </button>
      </nav>

      {/* ✅ Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 w-72 h-screen bg-blue-700 text-white shadow-lg transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(false)}
        >
          <FiX size={28} />
        </button>

        {/* Mobile Links */}
        <div className="flex flex-col items-center mt-16 space-y-6 text-lg">
          {!loading && isAuthenticated && (
            <>
              <Link
                href="/"
                className="hover:text-gray-200 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/reports"
                className="hover:text-gray-200 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Reports
              </Link>
              <Link
                href="/notifications"
                className="hover:text-gray-200 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Notifications
              </Link>
              <Link
                href="/profile"
                className="hover:text-gray-200 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="hover:text-gray-200 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 mt-4 rounded-full hover:bg-red-600 transition duration-300 flex items-center space-x-2"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </>
          )}

          {!loading && !isAuthenticated && (
            <>
              <Link
                href="/login"
                className="bg-white text-blue-600 px-4 py-2 mt-4 rounded-full hover:bg-gray-200 transition duration-300"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-yellow-400 text-blue-900 px-4 py-2 mt-4 rounded-full hover:bg-yellow-300 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ✅ Add Padding Below Navbar So Content is Not Hidden */}
      <div className="pt-20"></div>
    </>
  );
}
