export const isAuthenticated = () => {
  const token = sessionStorage.getItem("token");
  return !!token;
};

export const isAdminAuthenticated = () => {
  const token = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("role");
  return !!token && userRole === "admin";
};
