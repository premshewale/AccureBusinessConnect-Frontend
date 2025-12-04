//RoleInterseptor
import React from "react";
import { Navigate } from "react-router-dom";

const RoleInterceptor = ({ allowedRoles, children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken || !user) return <Navigate to="/admin/login" replace />;

  if (!allowedRoles.includes(user.roleName)) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default RoleInterceptor;
