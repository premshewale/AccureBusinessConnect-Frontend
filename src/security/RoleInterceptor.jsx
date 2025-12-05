import React from "react";
import { useSelector } from "react-redux"; // Add Redux integration
import { Navigate } from "react-router-dom";

const RoleInterceptor = ({ allowedRoles, children }) => {
  // Prefer Redux state (reactive, avoids localStorage reads)
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Fallback to localStorage if Redux not initialized (e.g., initial render)
  let storedUser = user;
  let hasValidToken = isAuthenticated;

  if (!isAuthenticated) {
    // Check role-specific storage (mirror initializeAuth logic)
    const possibleRoles = ['admin', 'staff', 'subadmin'];
    for (const role of possibleRoles) {
      const accessTokenKey = `${role}AccessToken`;
      const userKey = `${role}User`;
      const token = localStorage.getItem(accessTokenKey);
      const userStr = localStorage.getItem(userKey);

      if (token && userStr) {
        storedUser = JSON.parse(userStr);
        hasValidToken = true;
        break; // Use first valid session
      }
    }
  }

  // If no token/user, redirect to login
  if (!hasValidToken || !storedUser) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check role permission (use uppercase roleName)
  if (!allowedRoles.includes(storedUser.roleName)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If using fallback, optionally dispatch initializeAuth here (but avoid in interceptor to prevent side-effects)
  return children;
};

export default RoleInterceptor;