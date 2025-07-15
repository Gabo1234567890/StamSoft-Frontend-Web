import { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import { useAuth } from "../context/AuthContext";
import GoogleLoginButton from "../components/GoogleLoginButton";
// import FacebookLoginButton from "../components/FacebookLoginButton";
import { login } from "../services/login";
import { Link, useNavigate } from "react-router-dom";
import background from "../assets/AuthBackground.jpg";
import HiddenTextInput from "../components/HiddenTextInput";
import VisibleTextInput from "../components/VisibleTextInput";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const { contextLogin } = useAuth();
  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    if (!email.includes("@") || !email.includes(".")) {
      setErrorMessageEmail("Email must have @ and .");
      setValidEmail(false);
    } else {
      setValidEmail(true);
      setErrorMessageEmail("");
    }
  };

  const isValidPassword = (password: string) => {
    if (
      password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password)
    ) {
      setErrorMessagePassword("Password must be 8, upper and lower");
      setValidPassword(false);
    } else {
      setErrorMessagePassword("");
      setValidPassword(true);
    }
  };

  useEffect(() => {
    isValidEmail(email);
    isValidPassword(password);
  }, [email, password]);

  const handleLogin = async () => {
    if (validEmail && validPassword) {
      try {
        const response = await login(email, password);
        const { accessToken, refreshToken, user } = response;
        contextLogin({ accessToken, refreshToken, userId: user.id });
        navigate("/");
      } catch (error: any) {
        console.log(error);
        alert(error);
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="login-container">
        <div className="login-form">
          <div className="flex flex-col gap-12">
            <div className="place-items-center gap-2 flex flex-col">
              <img src="/LoginLogo.svg" />
              <h1 className="text-heading1 font-primary text-primary1 text-center">
                Log In
              </h1>
            </div>
            <div className="py-1 flex flex-col gap-2">
              <TextInput
                type="email"
                placeholder="Email"
                onChange={setEmail}
                val={email}
                errorMessage={errorMessageEmail}
                focused={focusedEmail}
                onFocus={(focus) => {
                  setFocusedEmail(focus);
                }}
              />
              <TextInput
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={setPassword}
                val={password}
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
                            : password
                            ? "#250d77"
                            : "#666666"
                        }
                      />
                    ) : (
                      <HiddenTextInput
                        color={
                          focusedPassword
                            ? "#4110ea"
                            : password
                            ? "#250d77"
                            : "#666666"
                        }
                      />
                    )}
                  </button>
                }
                forgotPassword={
                  <Link to={"/forgot-password"} className="forgotten-password">
                    Forgot Password?
                  </Link>
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <button
                onClick={handleLogin}
                className={
                  !validEmail || !validPassword
                    ? "disabled-filled-button"
                    : "default-filled-button"
                }
              >
                Log In
              </button>
              <div className="flex gap-2 justify-center">
                <p className="text-paragraph-regular2 font-secondary">
                  Don't have an account?
                </p>
                <Link to={"/signup"} className="text-link">
                  Create Account
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between gap-3 items-center">
                <hr className="w-1/2 border-t border-base-90" />
                <p className="text-paragraph-regular2 text-base-90 font-secondary">
                  or
                </p>
                <hr className="border-base-90 border-t w-1/2" />
              </div>
              <GoogleLoginButton />
            </div>
            {/*<FacebookLoginButton />*/}
          </div>
        </div>
        <div className="flex px-6 gap-4 justify-center">
          <Link to={"/terms-and-conditions"} className="terms-policy">
            Terms And Conditions
          </Link>
          <Link to={"/privacy-policy"} className="terms-policy">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
