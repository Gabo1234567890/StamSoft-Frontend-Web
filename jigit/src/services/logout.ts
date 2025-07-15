import axiosInstance from "./Axios";
import Cookies from "js-cookie";

export const handleLogout = async () => {
  const userId = Number(Cookies.get("userId"));
  try {
    await axiosInstance.post(
      "/auth/logout",
      { userId },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.log(error);
    alert(error);
  }
};
