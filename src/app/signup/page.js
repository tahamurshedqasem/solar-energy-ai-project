"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";
import { FiUser, FiMail, FiLock, FiCheckCircle } from "react-icons/fi";

export default function Signup() {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Prevent UI flicker

  // Redirect before rendering the signup page
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/"); // Redirect immediately
    } else {
      setLoading(false); // Allow page to render only if user is NOT logged in
    }
  }, [isAuthenticated, router]);

  // If still checking authentication, render nothing
  if (loading || isAuthenticated) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem("isAuthenticated", "true"); // Persist login state
            router.replace("/"); // Redirect immediately after signup
          }}
          className="mt-6"
        >
          {/* Name */}
          <div className="flex items-center border border-gray-300 p-2 rounded-md">
            <FiUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-300 p-2 rounded-md mt-4">
            <FiMail className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 p-2 rounded-md mt-4">
            <FiLock className="text-gray-500 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full outline-none"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border border-gray-300 p-2 rounded-md mt-4">
            <FiCheckCircle className="text-gray-500 mr-2" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full outline-none"
              required
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-6 hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
