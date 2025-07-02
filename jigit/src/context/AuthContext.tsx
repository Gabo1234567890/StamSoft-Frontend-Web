import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axiosInstance from "../services/Axios";
import type { User } from "../types/User";

interface AuthContextType {
  user: User | null;
  token: string | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const setAuth = (token: string, user: User) => {
    setToken(token);
    setUser(user);
  };

  const clearAuth = () => {
    setToken(null);
    setUser(null);
  };

  const refreshAuth = async () => {
    try {
      const response = await axiosInstance.get<{ token: string; user: User }>(
        "/me"
      );
      setAuth(response.data.token, response.data.user);
    } catch (error) {
      clearAuth();
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, setAuth, clearAuth, refreshAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Failed to get context");
  }
  return context;
};
