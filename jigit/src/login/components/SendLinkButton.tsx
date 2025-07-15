import { forgotPassword } from "../../services/login";

const SendLinkButton = ({ email }: { email: string }) => {
  const handleClick = async () => {
    try {
      await forgotPassword(email);
      alert("An email has been sent to you");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <button className="default-filled-button" onClick={handleClick}>
      Send Link
    </button>
  );
};

export default SendLinkButton;
