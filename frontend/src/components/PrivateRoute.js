import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

// Protect routes with Authorization
// https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5 

const PrivateRoute = () => {
  const user = useAuth();
  if (!user.isAdmin) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;