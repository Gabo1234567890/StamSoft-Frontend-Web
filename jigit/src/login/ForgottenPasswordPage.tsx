import { useNavigate } from "react-router";
import background from "../assets/AuthBackground.jpg";
import { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import SendLinkButton from "./components/SendLinkButton";

const ForgottenPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    if (!email.includes("@") || !email.includes(".")) {
      setErrorMessage("Email must have @ and .");
    } else {
      setErrorMessage("");
    }
  };

  useEffect(() => {
    isValidEmail(email);
  }, [email]);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="login-form max-w-md min-w-[412px] w-1/4">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-2 place-items-center">
            <img src="/LoginLogo.svg" />
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => navigate("/login")}
                className="cursor-pointer"
              >
                <img src="/BackArrow.svg" alt="Back" />
              </button>
              <h1 className="text-heading2 text-primary1 font-primary text-center">
                Forgot Password
              </h1>
              <div className="w-1/14"></div>
            </div>
            <p className="text-paragraph-medium2 text-primary1 font-secondary text-center px-14">
              Enter your email so we can send you a link to reset your password
            </p>
          </div>
          <TextInput
            type="email"
            placeholder="Email"
            onChange={setEmail}
            val={email}
            errorMessage={errorMessage}
            focused={focusedEmail}
            onFocus={(focus) => {
              setFocusedEmail(focus);
            }}
          />
        </div>
        <SendLinkButton email={email} />
      </div>
    </div>
  );
};

export default ForgottenPasswordPage;
