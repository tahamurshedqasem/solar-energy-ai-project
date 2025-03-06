"use client";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js navigation

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Prevent flickering

  // Load authentication state from localStorage on refresh
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(loggedIn);
    setLoading(false);
  }, []);

  // Login function (Updates State Immediately)
  const login = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true); // Immediately update UI
    router.push("/"); // Redirect to home after login
  };

  // Logout function (Updates State Immediately)
  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false); // Immediately update UI
    router.push("/login"); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
