import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ element, isLoginPage }) => {
  const token = localStorage.getItem('token');
  const getuser = localStorage.getItem('user');
  
  if (isLoginPage && token) {
    const roles = JSON.parse(getuser).roles;
    if(roles === "USER"){
      return <Navigate to="/user" replace />;
    } else if(roles === "INSTITUTION"){
      return <Navigate to="/admin/dashboard" replace />;
    } else if(roles === "SUPERADMIN"){
      return <Navigate to="/superadmin/dashboard" replace />;
    }
  }

  if (!isLoginPage && !token) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default PrivateRoute;
