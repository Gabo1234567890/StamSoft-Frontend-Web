import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import axiosInstance from "../services/Axios";
import { handleLogout } from "../services/logout";
import Cookies from "js-cookie";

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  setAuth: (accessToken: string, refreshToken: string, user: User) => void;
  clearAuth: () => void;
  refreshAuth: () => Promise<void>;
  contextLogin: ({
    accessToken,
    refreshToken,
    userId,
  }: {
    accessToken: string;
    refreshToken: string;
    userId: number;
  }) => void;
  logout: () => void;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    Cookies.get("accessToken") || null
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    Cookies.get("refreshToken") || null
  );
  const [loading, setLoading] = useState(true);

  const setAuth = (accessToken: string, refreshToken: string, user: User) => {
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
    Cookies.set("userId", user.id.toString());
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(user);
  };

  const clearAuth = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  const refreshAuth = async () => {
    const storedAcessToken = Cookies.get("accessToken");
    const storedRefreshToken = Cookies.get("refreshToken");
    if (!storedAcessToken || !storedRefreshToken) {
      clearAuth();
      return;
    }
    setAccessToken(storedAcessToken);
    setRefreshToken(storedRefreshToken);
    try {
      const response = await axiosInstance.get<User>("/user/profile");
      setUser(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  const contextLogin = ({
    accessToken,
    refreshToken,
    userId,
  }: {
    accessToken: string;
    refreshToken: string;
    userId: number;
  }) => {
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
    Cookies.set("userId", userId.toString());
    refreshAuth();
  };

  const logout = async () => {
    await handleLogout();
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("userId");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshAuth,
        contextLogin,
        logout,
        accessToken,
        refreshToken,
        setAuth,
        clearAuth,
        setUser,
      }}
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
