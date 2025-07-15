import axiosInstance from "./Axios";

export const getAllUsers = async (page: number, limit: number) => {
  try {
    const response = await axiosInstance.get("/user/admin", {
      params: { page, limit },
      headers: { "Content-Type": "application/json" },
    });

    if (response.status != 200 && response.status != 201) {
      throw new Error("Failed to get all users");
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/user/admin/${id}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status != 200 && response.status != 201) {
      throw new Error("Failed to delete user");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllReports = async (page: number, limit: number) => {
  try {
    const response = await axiosInstance.get("/reports/admin/paginated", {
      params: { page, limit },
      headers: { "Content-Type": "application/json" },
    });

    if (response.status != 200 && response.status != 201) {
      throw new Error("Failed to get all reports");
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteReport = async (id: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/reports/admin/${id}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status != 200 && response.status != 201) {
      throw new Error("Failed to delete report");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
