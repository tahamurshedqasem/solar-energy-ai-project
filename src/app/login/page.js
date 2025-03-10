// "use client";
// import { useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { AuthContext } from "../../context/AuthContext";
// import { FiMail, FiLock, FiLogIn } from "react-icons/fi";

// export default function Login() {
//   const { isAuthenticated, login } = useContext(AuthContext);
//   const router = useRouter();
//   const [loading, setLoading] = useState(true); // Prevent UI flicker

//   // Redirect before rendering the login page
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
//         <h2 className="text-2xl font-bold text-center">Login</h2>

//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             login(); // Call login function from context (updates UI instantly)
//             router.replace("/"); // Redirect immediately after login
//           }}
//           className="mt-6"
//         >
//           {/* Email */}
//           <div className="flex items-center border border-gray-300 p-2 rounded-md">
//             <FiMail className="text-gray-500 mr-2" />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full outline-none"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="flex items-center border border-gray-300 p-2 rounded-md mt-4">
//             <FiLock className="text-gray-500 mr-2" />
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full outline-none"
//               required
//             />
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-6 hover:bg-blue-600 transition flex items-center justify-center space-x-2"
//           >
//             <FiLogIn />
//             <span>Login</span>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";

export default function Login() {
  const { isAuthenticated, login } = useContext(AuthContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redirect authenticated users to home page
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/"); // Redirect if already logged in
    }
  }, [isAuthenticated, router]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed. Please check your credentials."
        );
      }

      // ✅ Store authentication token & user info
      localStorage.setItem("authToken", data.token);
      console.log(data.token);
      login(data.user); // Update Auth Context

      // Redirect to home page
      router.replace("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Prevent UI flicker while checking authentication
  if (isAuthenticated) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6">
          {/* Email */}
          <div className="flex items-center border border-gray-300 p-2 rounded-md">
            <FiMail className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full outline-none"
              value={formData.email}
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

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-6 hover:bg-blue-600 transition flex items-center justify-center space-x-2"
            disabled={loading}
          >
            <FiLogIn />
            <span>{loading ? "Logging in..." : "Login"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
