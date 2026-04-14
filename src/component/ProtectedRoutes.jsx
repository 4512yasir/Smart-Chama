import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ roles }) {
  const token = localStorage.getItem("access");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}