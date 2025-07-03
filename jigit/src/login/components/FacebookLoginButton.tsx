interface Props {
  handleLogin: () => void;
}

const FacebookLoginButton = ({ handleLogin }: Props) => {
  const handleClick = () => {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/facebook`;
    handleLogin();
  };
  return <button onClick={handleClick}>Continue with Facebook</button>;
};

export default FacebookLoginButton;
