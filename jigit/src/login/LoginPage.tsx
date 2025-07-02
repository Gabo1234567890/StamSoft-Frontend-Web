import { useState } from "react";
import TextInput from "../components/TextInput";
import { googleLogin, login } from "../services/login";
import { useAuth } from "../context/AuthContext";
import GoogleLoginButton from "../components/GoogleLoginButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();

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
      const { user, token } = await login(email, password);
      setAuth(token, user);
    } catch (error: any) {
      console.log(error);
      alert(error);
    }
  };

  const handleGoogleLogin = async (googleToken: string) => {
    try {
      const response = await googleLogin(googleToken);
      setAuth(response.token, response.user);
    } catch (error) {
      console.error(error);
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
      <GoogleLoginButton onTokenReceived={handleGoogleLogin} />
    </>
  );
};

export default LoginPage;
