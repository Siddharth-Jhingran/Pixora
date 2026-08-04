import { useState, createContext, useEffect } from "react";
import { register, login, getMe } from "./services/auth.api";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(false);

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
  return (
    <AuthContext.Provider
      value={{ user, loading, handleLogin, handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
}
