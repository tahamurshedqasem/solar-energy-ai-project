"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";

export default function Login() {
  const { isAuthenticated, login } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Prevent UI flicker

  // Redirect before rendering the login page
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
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(); // Call login function from context (updates UI instantly)
            router.replace("/"); // Redirect immediately after login
          }}
          className="mt-6"
        >
          {/* Email */}
          <div className="flex items-center border border-gray-300 p-2 rounded-md">
            <FiMail className="text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 p-2 rounded-md mt-4">
            <FiLock className="text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-6 hover:bg-blue-600 transition flex items-center justify-center space-x-2"
          >
            <FiLogIn />
            <span>Login</span>
          </button>
        </form>
      </div>
    </div>
  );
}
