import axiosInstance from "./Axios";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post(
      "/auth/login",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status != 200 && response.status != 201) {
      throw new Error(`Failed to login: ${response.data}`);
    } else {
      return response.data;
    }
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const googleLogin = async (
  googleToken: string
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      "/auth/google",
      {
        idToken: googleToken,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status != 200 && response.status != 201) {
      throw new Error(`Google login failed: ${response.data}`);
    } else {
      return response.data;
    }
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const facebookLogin = async (): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.get<LoginResponse>(
      "/auth/facebook/callback",
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`Facebook login failed: ${response.statusText}`);
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const forgotPassword = async (email: string): Promise<void> => {
  try {
    const response = await axiosInstance.post(
      "/auth/forgot-password",
      {
        email,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`Failed to send reset email: ${response.statusText}`);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const resetPassword = async (
  password: string,
  token: string
): Promise<void> => {
  try {
    const response = await axiosInstance.post(
      "auth/reset-password",
      { token, password },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`Failed to send reset email: ${response.statusText}`);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const refresh = async (id: number, refreshToken: string) => {
  try {
    const response = await axiosInstance.post(
      "/auth/refresh",
      { id, refreshToken },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`Failed to refresh token: ${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
