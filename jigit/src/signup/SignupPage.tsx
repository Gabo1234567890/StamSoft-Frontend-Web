import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { signup } from "../services/signup";
import TextInput from "../components/TextInput";
import GoogleLoginButton from "../components/GoogleLoginButton";
import FacebookLoginButton from "../components/FacebookLoginButton";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const { setAuth } = useAuth();

  const handleSignup = async () => {
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
      const payload: SignupDetails = { email, password };
      if (firstName) {
        payload.firstName = firstName;
      }
      if (lastName) {
        payload.lastName = lastName;
      }
      if (brand && model && licensePlate) {
        payload.car = {
          brand: brand,
          model: model,
          licensePlate: licensePlate,
        };
      }
      const { accessToken, user } = await signup(payload);
      console.log(accessToken, user);
      setAuth(accessToken, user);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      <h1>Signup Page</h1>
      <TextInput type="email" placeholder="Email" onChange={setEmail} />
      <TextInput
        type="password"
        placeholder="Password"
        onChange={setPassword}
      />
      <TextInput type="text" placeholder="First Name" onChange={setFirstName} />
      <TextInput type="text" placeholder="Last Name" onChange={setLastName} />
      <TextInput type="text" placeholder="Car Brand" onChange={setBrand} />
      <TextInput type="text" placeholder="Car Model" onChange={setModel} />
      <TextInput
        type="text"
        placeholder="License Plate"
        onChange={setLicensePlate}
      />
      <button onClick={handleSignup}>Sign Up</button>
      <GoogleLoginButton />
      <FacebookLoginButton />
      <Link to={"/login"}>Already have an account? Log In</Link>
    </>
  );
};

export default SignupPage;
