import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

interface JwtPayload {
  sub: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const AdminGuard = () => {
  const { user, accessToken, loading } = useAuth();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!user || !accessToken) {
    return <Navigate to={"/login"} replace />;
  }
  try {
    const decoded = jwtDecode<JwtPayload>(accessToken);
    if (decoded.role !== "admin") {
      alert("You do not have admin permissions");
      return <Navigate to={"/"} replace />;
    }
  } catch (error) {
    console.log(error);
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
};

export default AdminGuard;
