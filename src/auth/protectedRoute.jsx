import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

const ProtectedLayout = () => {
  const isAuth = isAuthenticated();
  console.log("Is Authenticated:", isAuth); // Debugging
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedLayout;
