// components/ProtectedAdminRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

const ProtectedAdminRoute = ({ children }: { children: JSX.Element }) => {
  const { state } = useAuth();

  if (!state.isAuthenticated || !state.user?.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedAdminRoute;
