import axiosInstance from "./Axios";

export const login = async (
  email: string,
  pass: string
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post(
      "/auth/login",
      { email, pass },
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
