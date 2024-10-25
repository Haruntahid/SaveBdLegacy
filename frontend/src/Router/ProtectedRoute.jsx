/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useUser from "../hooks/useUser";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);
  const { role, loading } = useUser();

  // If still loading user role data, show a loading spinner or message
  if (loading) {
    return <p>Loading...</p>;
  }

  // If no user or role doesn't match allowed roles, redirect to home or login page
  if (!user || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
