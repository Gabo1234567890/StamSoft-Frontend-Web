import { useAuth } from "../context/AuthContext";
import { facebookLogin } from "../services/login";

const FacebookLoginButton = () => {
  const { setAuth } = useAuth();
  const handleFacebookLogin = async () => {
    try {
      const response = await facebookLogin();
      setAuth(response.token, response.user);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  const handleClick = () => {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/facebook`;
    handleFacebookLogin();
  };
  return <button onClick={handleClick}>Continue with Facebook</button>;
};

export default FacebookLoginButton;
