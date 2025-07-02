import type { User } from "../types/User";
import axiosInstance from "./Axios";

export const login = async (
  email: string,
  pass: string
): Promise<{ token: string; user: User }> => {
  try {
    const response = await axiosInstance.post(
      "/auth/login",
      { email, pass },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status != 200 && response.status != 201) {
      throw Error(`Failed to login: ${response.data}`);
    } else {
      return response.data;
    }
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
