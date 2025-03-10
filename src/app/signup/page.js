// "use client";
// import { useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { AuthContext } from "../../context/AuthContext";
// import { FiUser, FiMail, FiLock, FiCheckCircle } from "react-icons/fi";

// export default function Signup() {
//   const { isAuthenticated } = useContext(AuthContext);
//   const router = useRouter();
//   const [loading, setLoading] = useState(true); // Prevent UI flicker

//   // Redirect before rendering the signup page
//   useEffect(() => {
//     if (isAuthenticated) {
//       router.replace("/"); // Redirect immediately
//     } else {
//       setLoading(false); // Allow page to render only if user is NOT logged in
//     }
//   }, [isAuthenticated, router]);

//   // If still checking authentication, render nothing
//   if (loading || isAuthenticated) return null;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center">Create an Account</h2>

//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             localStorage.setItem("isAuthenticated", "true"); // Persist login state
//             router.replace("/"); // Redirect immediately after signup
//           }}
//           className="mt-6"
//         >
//           {/* Name */}
//           <div className="flex items-center border border-gray-300 p-2 rounded-md">
//             <FiUser className="text-gray-500 mr-2" />
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               className="w-full outline-none"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="flex items-center border border-gray-300 p-2 rounded-md mt-4">
//             <FiMail className="text-gray-500 mr-2" />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               className="w-full outline-none"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="flex items-center border border-gray-300 p-2 rounded-md mt-4">
//             <FiLock className="text-gray-500 mr-2" />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               className="w-full outline-none"
//               required
//             />
//           </div>

//           {/* Confirm Password */}
//           <div className="flex items-center border border-gray-300 p-2 rounded-md mt-4">
//             <FiCheckCircle className="text-gray-500 mr-2" />
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               className="w-full outline-none"
//               required
//             />
//           </div>

//           {/* Signup Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-6 hover:bg-blue-600 transition"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiMail,
  FiLock,
  FiCheckCircle,
  FiMapPin,
} from "react-icons/fi";

export default function Signup() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          city: formData.city,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      // ✅ Show success message & Redirect to Login page
      setSuccessMessage(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        router.replace("/login"); // Redirect to Login page
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center mt-2">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          {/* Name */}
          <div className="flex items-center border border-gray-300 p-2 rounded-md">
            <FiUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full outline-none"
              value={formData.name}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* City */}
          <div className="flex items-center border border-gray-300 p-2 rounded-md mt-4">
            <FiMapPin className="text-gray-500 mr-2" />
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full outline-none"
              value={formData.city}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
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
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-6 hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
