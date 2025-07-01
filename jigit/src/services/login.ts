import UseAxios from "./UseAxios";

export const login = async (email: string, pass: string) => {
  const axiosInstance = UseAxios();
  try {
    const response = await axiosInstance.post(
      "/login",
      { email, pass },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status != 200) {
      throw Error(`Failed to login: ${response.data}`);
    } else {
      return response.data;
    }
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
