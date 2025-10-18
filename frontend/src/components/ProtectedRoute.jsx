import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRole) {
    const userRole = String(user.role || "").toLowerCase();
    const allowed = Array.isArray(allowedRole)
      ? allowedRole.map((r) => String(r).toLowerCase())
      : [String(allowedRole).toLowerCase()];

    if (!allowed.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
