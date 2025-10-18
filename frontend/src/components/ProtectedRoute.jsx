import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole)
    return <h2>Access Denied ❌ (Recruiters Only)</h2>;

  return children;
};

export default ProtectedRoute;
