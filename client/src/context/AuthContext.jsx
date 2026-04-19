import { createContext, useContext, useEffect, useState } from "react";
import { getToken, setToken, removeToken } from "../utils/token";
import { jwtDecode } from "jwt-decode";
import { loginRequest } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true); // 🔥 IMPORTANTE

  useEffect(() => {
    const token = getToken();

    if (token && isTokenValid(token)) {
      const decoded = jwtDecode(token);

      setUser({
        id: decoded.sub,
        email: decoded.email,
        rol: decoded.rol,
        token
      });

      setIsAuthenticated(true);
    } else {
      removeToken();
    }

    setLoading(false); 
  }, []);

  const login = async (data) => {
    try {
      setErrors([]);

      const res = await loginRequest(data);

      const token = res.data.token;
      setToken(token);

      const decoded = jwtDecode(token);

      setUser({
        id: decoded.sub,
        email: decoded.email,
        rol: decoded.rol,
        token
      });

      setIsAuthenticated(true);

      return true;

    } catch (error) {
      setErrors([error.response?.data?.mensaje || "Error en login"]);
      return false;
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        errors,
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};