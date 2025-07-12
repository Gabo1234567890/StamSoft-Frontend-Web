import { useAuth } from "../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

const AuthGuard = () => {
  const { user, accessToken, loading } = useAuth();
  const navigate = useNavigate();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!user || !accessToken) {
    navigate("/login");
    return;
  }
  return <Outlet />;
};

export default AuthGuard;
