import { useAuth } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const AuthGuard = () => {
  const { user, token } = useAuth();
  if (!user || !token) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
};

export default AuthGuard;
