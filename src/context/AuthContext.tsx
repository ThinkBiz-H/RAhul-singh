import React, { createContext, useContext, useState, useCallback } from "react";
import { loadJSON, saveJSON, STORAGE_KEYS } from "../utils/storage";

// Simple hardcoded admin credentials — stored directly in code, no auth server.
// Change these values to set your own admin password.
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Only the logged-in/out session flag is persisted; the credentials themselves
  // always come from the constants above, never from storage.
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    loadJSON(STORAGE_KEYS.AUTH, false)
  );

  const login = useCallback((username: string, password: string) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      saveJSON(STORAGE_KEYS.AUTH, true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    saveJSON(STORAGE_KEYS.AUTH, false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
