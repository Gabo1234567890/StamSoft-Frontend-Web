import { useState } from "react";
import TextInput from "../components/TextInput";
import { useAuth } from "../context/AuthContext";
import GoogleLoginButton from "../components/GoogleLoginButton";
import FacebookLoginButton from "../components/FacebookLoginButton";
import { login } from "../services/login";
import { Link, useNavigate } from "react-router-dom";
import ForgottenPasswordButton from "./components/ForgottenPasswordButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { contextLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.includes("@") || !email.includes(".")) {
      alert("Invalid email");
    } else if (
      password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password)
    ) {
      alert("Invalid password");
    }
    try {
      const response = await login(email, password);
      const { accessToken, refreshToken, user } = response;
      contextLogin({ accessToken, refreshToken, userId: user.id });
      navigate("/");
    } catch (error: any) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      <h1>Login Page</h1>
      <TextInput type="email" placeholder="Email" onChange={setEmail} />
      <TextInput
        type="password"
        placeholder="Password"
        onChange={setPassword}
      />
      <button onClick={handleLogin}>Log In</button>
      <GoogleLoginButton />
      <FacebookLoginButton />
      <Link to={"/signup"}>Don't have an account? Sign Up</Link>
      <ForgottenPasswordButton email={email} />
    </>
  );
};

export default LoginPage;
