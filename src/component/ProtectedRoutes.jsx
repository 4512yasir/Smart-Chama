import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ roles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard/member" replace />;
  }

  return <Outlet />;
}