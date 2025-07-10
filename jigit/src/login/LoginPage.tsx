import { useState } from "react";
import TextInput from "../components/TextInput";
import { useAuth } from "../context/AuthContext";
import GoogleLoginButton from "../components/GoogleLoginButton";
// import FacebookLoginButton from "../components/FacebookLoginButton";
import { login } from "../services/login";
import { Link, useNavigate } from "react-router-dom";
import ForgottenPasswordButton from "./components/ForgottenPasswordButton";
import background from "../assets/LoginBackground.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const { contextLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    let valid = true;
    if (!email.includes("@") || !email.includes(".")) {
      setErrorMessageEmail("Invalid email");
      valid = false;
    }
    if (
      password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password)
    ) {
      setErrorMessagePassword(
        "Password must contain both uppercase and lowercase letters"
      );
      valid = false;
    }
    if (valid) {
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
                  setErrorMessageEmail("");
                }}
              />
              <TextInput
                type="password"
                placeholder="Password"
                onChange={setPassword}
                val={password}
                errorMessage={errorMessagePassword}
                focused={focusedPassword}
                onFocus={(focus) => {
                  setFocusedPassword(focus);
                  setErrorMessagePassword("");
                }}
              />
              <ForgottenPasswordButton email={email} />
            </div>
          </div>
          <button onClick={handleLogin}>Log In</button>
          <GoogleLoginButton />
          {/*<FacebookLoginButton />*/}
          <Link to={"/signup"}>Don't have an account? Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
