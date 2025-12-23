import { Navigate, Outlet } from "react-router-dom";

// roles: array of allowed roles e.g., ["chairperson"]
export default function ProtectedRoute({ user, roles }) {
  if (!user) {
    // not logged in
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    // role not authorized
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
