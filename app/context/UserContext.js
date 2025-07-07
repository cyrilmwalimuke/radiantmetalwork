"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Create context
const UserContext = createContext();

// Export hook
export const useUser = () => useContext(UserContext);

// Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user to localStorage on change
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Log in (accepts user object from backend response)
  const login = (userData) => {
    setUser(userData);
  };

  // Log out
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    document.cookie = "access_token=; Max-Age=0; path=/"; // clear JWT cookie
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
