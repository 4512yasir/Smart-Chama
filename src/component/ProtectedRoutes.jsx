import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ roles }) {
  // Get token from localStorage
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // decode saved user

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role not allowed
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Render nested routes
}
