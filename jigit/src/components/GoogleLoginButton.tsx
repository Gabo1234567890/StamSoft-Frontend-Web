import { useEffect, useRef } from "react";
import { googleLogin } from "../services/login";
import { useAuth } from "../context/AuthContext";

const GoogleLoginButton = () => {
  const { setAuth } = useAuth();
  const handleGoogleLogin = async (googleToken: string) => {
    try {
      const response = await googleLogin(googleToken);
      setAuth(response.accessToken, response.user);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.google || !divRef.current) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: (response: GoogleCredentialsResponse) => {
        try {
          const token = response.credential;
          handleGoogleLogin(token);
        } catch (error) {
          console.log(error);
          alert(error);
        }
      },
    });

    window.google.accounts.id.renderButton(divRef.current, {
      theme: "outline",
      size: "large",
    });
  });

  return <div ref={divRef}></div>;
};

export default GoogleLoginButton;
