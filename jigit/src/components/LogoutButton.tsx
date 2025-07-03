import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../services/Axios";

const LogoutButton = () => {
  const { user, clearAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post(
        "/auth/logout",
        { user },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      clearAuth();
      navigate("/login");
    }
  };
  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;
