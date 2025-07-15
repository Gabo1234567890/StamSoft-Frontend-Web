import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { resetPassword } from "../services/login";
import TextInput from "../components/TextInput";
import background from "../assets/AuthBackground.jpg";
import VisibleTextInput from "../components/VisibleTextInput";
import HiddenTextInput from "../components/HiddenTextInput";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [focusedConfirmPassword, setFocusedConfirmPassword] = useState(false);
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [errorMessageConfirmPassword, setErrorMessageConfirmPassword] =
    useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validNewPassword, setValidNewPassword] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);

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

  const isValidNewPassword = () => {
    if (
      newPassword.length < 8 ||
      !/[a-z]/.test(newPassword) ||
      !/[A-Z]/.test(newPassword)
    ) {
      setErrorMessagePassword("Password must be 8, upper and lower");
      setValidNewPassword(false);
    } else {
      setErrorMessagePassword("");
      setValidNewPassword(true);
    }
  };

  const isValidConfirmPassword = () => {
    if (confirmPassword != newPassword) {
      setErrorMessageConfirmPassword("Passwords do not match");
      setValidConfirmPassword(false);
    } else {
      setErrorMessageConfirmPassword("");
      setValidConfirmPassword(true);
    }
  };

  const handleReset = async () => {
    if (validNewPassword && validConfirmPassword) {
      try {
        await resetPassword(newPassword, token);
        navigate("/reset-password-result?state=success");
      } catch (error) {
        console.log(error);
        alert(error);
        navigate("/reset-password-result?state=fail");
      }
    }
  };

  useEffect(() => {
    isValidNewPassword();
  }, [newPassword]);

  useEffect(() => {
    isValidConfirmPassword();
  }, [confirmPassword]);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="login-form max-w-md min-w-[412px] w-1/4">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-2 place-items-center">
            <img src="/LoginLogo.svg" />
            <h1 className="text-heading2 text-primary1 font-primary text-center">
              Reset Password
            </h1>
            <p className="text-paragraph-medium2 text-primary1 font-secondary text-center px-14">
              Enter your new password
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <TextInput
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                onChange={setNewPassword}
                val={newPassword}
                errorMessage={errorMessagePassword}
                focused={focusedPassword}
                onFocus={(focus) => {
                  setFocusedPassword(focus);
                }}
                rightIcon={
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  >
                    {showPassword ? (
                      <VisibleTextInput
                        color={
                          focusedPassword
                            ? "#4110ea"
                            : newPassword
                            ? "#250d77"
                            : "#666666"
                        }
                      />
                    ) : (
                      <HiddenTextInput
                        color={
                          focusedPassword
                            ? "#4110ea"
                            : newPassword
                            ? "#250d77"
                            : "#666666"
                        }
                      />
                    )}
                  </button>
                }
              />
              <TextInput
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                onChange={setConfirmPassword}
                val={confirmPassword}
                errorMessage={errorMessageConfirmPassword}
                focused={focusedConfirmPassword}
                onFocus={(focus) => {
                  setFocusedConfirmPassword(focus);
                }}
                rightIcon={
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <VisibleTextInput
                        color={
                          focusedConfirmPassword
                            ? "#4110ea"
                            : confirmPassword
                            ? "#250d77"
                            : "#666666"
                        }
                      />
                    ) : (
                      <HiddenTextInput
                        color={
                          focusedConfirmPassword
                            ? "#4110ea"
                            : confirmPassword
                            ? "#250d77"
                            : "#666666"
                        }
                      />
                    )}
                  </button>
                }
              />
            </div>
            <button onClick={handleReset} className="default-filled-button">
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
