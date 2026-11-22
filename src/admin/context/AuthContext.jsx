import { createContext, useContext, useEffect, useState } from "react";
import { authApi, refreshSession, setAccessToken } from "../api/adminApi";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On page load, try to restore the session from the refresh cookie
  useEffect(() => {
    refreshSession()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await authApi.login({ email, password });
    setUser(data.user);
    return data.user;
  };

  const verifySignup = async (email, otp) => {
    const data = await authApi.verifySignup({ email, otp });
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, verifySignup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
