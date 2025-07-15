import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onClick = () => {
    logout();
    navigate("/login");
  };
  return (
    <button
      onClick={onClick}
      className="flex gap-2.5 default-not-filled-button border-functional-error text-functional-error hover:bg-functional-error hover:text-base-0 font-secondary text-paragraph-medium1"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
