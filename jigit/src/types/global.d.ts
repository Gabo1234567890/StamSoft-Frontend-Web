interface User {
  id: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  cars?: Car[];
  reports?: Report[];
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
  id?: number;
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

interface Report {
  id: number;
  imageUrls: string[];
  videoUrl?: string | null;
  description: string;
  licensePlate: string[];
  latitude: number;
  longitude: number;
  createdAt: string;
}
