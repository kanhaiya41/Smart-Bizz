import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // 1. Agar token nahi hai (User logged out hai), toh Login page par bhejo
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 2. Agar role match nahi karta (e.g. Owner trying to access Admin page)
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Aap chaho toh alert dikha sakte ho ya 404 page par bhej sakte ho
    // Filhal hum wapas Login ya Home par bhej rahe hain
    alert("Access Denied: You don't have permission for this page.");
    return <Navigate to="/" replace />;
  }

  // 3. Agar sab sahi hai, toh page dikhao
  return <Outlet />;
};

export default ProtectedRoute;