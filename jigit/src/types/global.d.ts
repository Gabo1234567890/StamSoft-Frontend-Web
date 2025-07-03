interface User {
  id: string;
  email: string;
  password: string;
}

interface Window {
  google: any;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface GoogleCredentialsResponse {
  credential: string;
}
