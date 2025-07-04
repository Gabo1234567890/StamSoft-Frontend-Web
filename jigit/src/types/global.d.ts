interface User {
  id: number;
  email: string;
  password: string;
}

interface Window {
  google: any;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface GoogleCredentialsResponse {
  credential: string;
}

interface Car {
  brand: string;
  model: string;
  licensePlate: string;
}

interface SignupDetails {
  email: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
  car?: Car | null;
}
