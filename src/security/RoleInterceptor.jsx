import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleInterceptor = ({ allowedRoles, children }) => {
  const { isAuthenticated, user, isInitialized } = useSelector(
    (state) => state.auth
  );

  // ⏳ Wait until auth is restored from localStorage
  if (!isInitialized) {
    return null; // or loader
  }

  // ❌ Not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  // ❌ Role not allowed
  if (!allowedRoles.includes(user.roleName)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleInterceptor;
