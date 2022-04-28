import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth-context";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  if (!auth.user?.token) {
    return <Navigate to="/auth" state={{ path: location.pathname }} />;
  }
  return children;
};
