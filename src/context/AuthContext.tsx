import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContextDef";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState(() => {
    // Initialize state from localStorage
    const savedAuth = localStorage.getItem("authState");
    return savedAuth
      ? JSON.parse(savedAuth)
      : {
          status: "not logged in",
          userId: null,
          username: null,
        };
  });

  // Save to localStorage whenever authState changes
  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  const login = (username: string, permissions: string, userId: string) => {
    setAuthState({
      permissions,
      status: "logged in",
      userId,
      username,
    });
  };

  const logout = (): void => {
    setAuthState({
      permissions: null,
      status: "not logged in",
      username: null,
      userId: null,
    });
  };

  const isLoggedIn = authState.status === "logged in";

  return (
    <AuthContext.Provider value={{ authState, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
