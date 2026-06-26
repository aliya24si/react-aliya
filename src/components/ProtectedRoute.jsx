import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";

export default function ProtectedRoute({ requiredRole, children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // Still loading auth state
  if (loading) {
    return <Loading />;
  }

  // Not authenticated — redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role check: if requiredRole is specified
  if (requiredRole === "admin" && !isAdmin) {
    return <Navigate to="/error-403" replace />;
  }

  // Render children or outlet
  return children || <Outlet />;
}
