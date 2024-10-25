import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const { email } = decodedToken;
        setUser(email); // Set user from token
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const logIn = (userEmail, token) => {
    setUser(userEmail);
    localStorage.setItem("token", token);
  };

  const logOut = () => {
    setLoading(true);
    setUser(null);
    localStorage.removeItem("token");
    setLoading(false);
  };

  const authInfo = {
    user,
    loading,
    setLoading,
    logIn, // Added logIn function for use in Login component
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
