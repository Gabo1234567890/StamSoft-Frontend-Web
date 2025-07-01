import { useState } from "react";
import TextInput from "../components/TextInput";
import { login } from "../services/login";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.includes("@")) {
      alert("Invalid email");
    } else if (
      password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password)
    ) {
      alert("Invalid password");
    }
    try {
      await login(email, password);
    } catch (error: any) {
      console.log(error);
      throw error;
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
    </>
  );
};

export default LoginPage;
