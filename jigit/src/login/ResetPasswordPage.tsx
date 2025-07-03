import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { resetPassword } from "../services/login";
import TextInput from "../components/TextInput";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const t = params.get("token");
    if (!t) {
      alert("No token provided");
      navigate("/login");
    } else {
      setToken(t);
    }
  }, [location.search]);

  const handleReset = async () => {
    if (
      newPassword.length < 8 ||
      !/[a-z]/.test(newPassword) ||
      !/[A-Z]/.test(newPassword)
    ) {
      alert("Invalid password");
    } else if (confirmPassword != newPassword) {
      alert("Passwords don't match");
    } else {
      try {
        await resetPassword(newPassword, token);
        alert("Successfully reset password");
        navigate("/login");
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };

  return (
    <>
      <h1>Reset Password</h1>
      <TextInput
        type="password"
        placeholder="New password"
        onChange={setNewPassword}
      />
      <TextInput
        type="password"
        placeholder="Confirm password"
        onChange={setConfirmPassword}
      />
      <button onClick={handleReset}>Confirm</button>
    </>
  );
};

export default ResetPasswordPage;
