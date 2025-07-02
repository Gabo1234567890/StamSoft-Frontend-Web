interface User {
  id: string;
  email: string;
  password: string;
}

interface Window {
  google: any;
}

interface GoogleLoginResponse {
  token: string;
  user: User;
}

interface GoogleCredentialsResponse {
  credential: string;
}
