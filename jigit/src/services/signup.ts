import axiosInstance from "./Axios";

export const signup = async ({
  email,
  password,
  firstName,
  lastName,
  car,
}: SignupDetails): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post(
      "/auth/signup",
      {
        email,
        password,
        firstName,
        lastName,
        car,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status != 200 && response.status != 201) {
      throw new Error(`Failed to signup: ${response.data}`);
    } else {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
