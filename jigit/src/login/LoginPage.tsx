import { useState } from "react";
import TextInput from "../components/TextInput";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h1>Login Page</h1>
      <TextInput type="email" placeholder="Email" onChange={setEmail} />
      <TextInput
        type="password"
        placeholder="Password"
        onChange={setPassword}
      />
      <p>{email}</p>
      <p>{password}</p>
    </>
  );
};

export default LoginPage;
