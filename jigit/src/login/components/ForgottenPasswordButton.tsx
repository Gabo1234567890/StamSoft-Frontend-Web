import { forgotPassword } from "../../services/login";

const ForgottenPasswordButton = ({ email }: { email: string }) => {
  const handleClick = async () => {
    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }
    try {
      await forgotPassword(email);
      alert("An email has been sent to you");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <button className="forgotten-password" onClick={handleClick}>
      Forgot Password?
    </button>
  );
};

export default ForgottenPasswordButton;
