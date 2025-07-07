import axiosInstance from "./Axios";

export const uploadReport = async ({
  imageUrls,
  videoUrl,
  description,
  licensePlate,
  latitude,
  longitude,
}: Report): Promise<void> => {
  try {
    const response = await axiosInstance.post(
      "/reports/upload",
      {
        imageUrls,
        videoUrl,
        description,
        licensePlate,
        latitude,
        longitude,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status != 200 && response.status != 201) {
      throw new Error("Failed to upload report");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMyCarsReports = async (): Promise<Report[]> => {
  try {
    const response = await axiosInstance.get("/reports/my-cars");
    if (response.status != 200 && response.status != 201) {
      throw new Error("Failed to fetch reports");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getLicensePlateReports = async (
  licensePlate: string
): Promise<Report[]> => {
  try {
    const response = await axiosInstance.get("/reports/search-by-plate", {
      params: { licensePlate },
      headers: { "Content-Type": "application/json" },
    });
    if (response.status != 200 && response.status != 201) {
      throw new Error("Failed to fetch reports");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRecentReports = async (): Promise<Report[]> => {
  try {
    const response = await axiosInstance.get("/reports/recent", {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status != 200 && response.status != 201) {
      throw new Error("Failed to fetch reports");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteReportByID = async (id: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/reports/${id}`, {
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
