import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      try {
        const decodedToken = JSON.parse(atob(savedToken.split(".")[1]));
        const { email } = decodedToken;
        setUser(email);
        setToken(savedToken);
      } catch (error) {
        console.error(error);
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    } else {
      setUser(null);
      setToken(null);
      setLoading(false);
    }
  }, []);

  const logIn = (userEmail, token) => {
    setUser(userEmail);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logOut = () => {
    setLoading(true);
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    setLoading(false);
  };

  const authInfo = {
    user,
    token,
    loading,
    setLoading,
    logIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export default AuthProvider;
