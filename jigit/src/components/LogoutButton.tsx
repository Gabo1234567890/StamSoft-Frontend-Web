import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onClick = () => {
    logout();
    navigate("/login");
  };
  return <button onClick={onClick}>Log Out</button>;
};

export default LogoutButton;
