import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { Role } from "../../types/auth";

export default function RoleRoute({ allowedRoles }: { allowedRoles: Role[] }) {
  const { isAuthenticated, isLoading, hasRole } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasRole(...allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
