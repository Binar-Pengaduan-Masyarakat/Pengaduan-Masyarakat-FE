/** @format */

import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ element, isLoginPage }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const roles = user.roles || "";

  if (isLoginPage && token) {
    switch (roles) {
      case "USER":
      case "INSTITUTION":
        return <Navigate to="/" replace />;
      case "SUPERADMIN":
        return <Navigate to="/superadmin/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  if (!isLoginPage && !token) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default PrivateRoute;
