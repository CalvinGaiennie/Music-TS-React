import { createContext, useContext } from "react";

interface AuthState {
  permissions: string | null;
  status: "logged in" | "not logged in";
  username: string | null;
  userId: string | null;
}

interface AuthContextType {
  authState: AuthState;
  login: (username: string, permissions: string, userId: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export type { AuthState, AuthContextType };

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
