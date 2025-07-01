import UseAxios from "./UseAxios";

export const login = async (email, pass) => {
  const axiosInstance = UseAxios();
  axiosInstance.post("/login", { email, pass });
};
