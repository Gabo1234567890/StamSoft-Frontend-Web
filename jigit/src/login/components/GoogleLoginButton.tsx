import { useEffect, useRef } from "react";

interface Props {
  onTokenReceived: (googleToken: string) => void;
}

const GoogleLoginButton = ({ onTokenReceived }: Props) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.google || !divRef.current) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: (response: GoogleCredentialsResponse) => {
        try {
          const token = response.credential;
          onTokenReceived(token);
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
  }, [onTokenReceived]);

  return <div ref={divRef}></div>;
};

export default GoogleLoginButton;
