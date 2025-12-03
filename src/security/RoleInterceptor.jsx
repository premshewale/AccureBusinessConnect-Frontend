import React from "react";
import { Navigate } from "react-router-dom";

const RoleInterceptor = ({ allowedRoles, children }) => {
  const user = JSON.parse(localStorage.getItem("user")); 
  const token = localStorage.getItem("token");

  // If user not logged in
  if (!token || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Role not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleInterceptor;
