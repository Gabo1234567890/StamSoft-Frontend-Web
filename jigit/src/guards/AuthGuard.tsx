import { useAuth } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const AuthGuard = () => {
  const { user, accessToken } = useAuth();
  if (!user || !accessToken) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
};

export default AuthGuard;
