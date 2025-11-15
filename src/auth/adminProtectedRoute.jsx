import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAdminAuthenticated } from "./auth";

const AdminProtectedLayout = () => {
  const isAuth = isAdminAuthenticated();
  console.log("Is Authenticated:", isAuth); // Debugging
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminProtectedLayout;
