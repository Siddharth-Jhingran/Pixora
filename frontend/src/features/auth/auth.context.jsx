import { useState, createContext, useEffect } from "react";
import { register, login, getMe, logout } from "./services/auth.api";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    async function restoreSession() {
      try {
        const response = await getMe();
        setuser(response.user);
      } catch {
        setuser(null);
      }
    }

    restoreSession();
  }, []);

  async function handleRegister(userName, email, password) {
    setloading(true);
    try {
      const response = await register(userName, email, password);
      setuser(response.user);
    } catch (err) {
      throw err;
    } finally {
      setloading(false);
    }
  }
  async function handleLogin(userName, password) {
    setloading(true);
    try {
      const response = await login(userName, password);
      setuser(response.user);
      console.log(response.user)
    } catch (err) {
      throw err;
    } finally {
      setloading(false);
    }
  }

  async function handleLogout() {
    await logout();
    setuser(null);
  }
  return (
    <AuthContext.Provider
      value={{ user, loading, handleLogin, handleRegister, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
