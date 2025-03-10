// "use client";
// import { createContext, useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; // Next.js navigation

// export const AuthContext = createContext();

// export default function AuthProvider({ children }) {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true); // Prevent flickering

//   // Load authentication state from localStorage on refresh
//   useEffect(() => {
//     const loggedIn = localStorage.getItem("isAuthenticated") === "true";
//     setIsAuthenticated(loggedIn);
//     setLoading(false);
//   }, []);

//   // Login function (Updates State Immediately)
//   const login = () => {
//     localStorage.setItem("isAuthenticated", "true");
//     setIsAuthenticated(true); // Immediately update UI
//     router.push("/"); // Redirect to home after login
//   };

//   // Logout function (Updates State Immediately)
//   const logout = () => {
//     localStorage.removeItem("isAuthenticated");
//     setIsAuthenticated(false); // Immediately update UI
//     router.push("/login"); // Redirect to login after logout
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
"use client";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Create Authentication Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
      // setUser(JSON.parse(localStorage.getItem("user")));
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    // localStorage.setItem("authToken", token);
    // localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser(null);
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
