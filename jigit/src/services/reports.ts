import axiosInstance from "./Axios";

export const uploadReport = async ({
  description,
  licensePlates,
  latitude,
  longitude,
  images,
  video,
}: {
  description: string;
  licensePlates: string[];
  latitude: string;
  longitude: string;
  images: File[];
  video: File | null;
}): Promise<Report> => {
  const formData = new FormData();

  formData.append("description", description);
  licensePlates.forEach((plate) => formData.append("licensePlate", plate));
  formData.append("latitude", latitude.toString());
  formData.append("longitude", longitude.toString());
  images.forEach((file) => formData.append("files", file));
  if (video) formData.append("files", video);
  try {
    const response = await axiosInstance.post("/reports/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status != 200 && response.status != 201) {
      throw new Error("Failed to upload report");
    }
    return response.data;
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

export const getTokenForSharedReport = async (id: number): Promise<string> => {
  try {
    const response = await axiosInstance.post(
      `/reports/${id}/share`,
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status != 200 && response.status != 201) {
      throw new Error("Failed to get token for report");
    }

    return response.data.token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getReportByToken = async (token: string): Promise<Report> => {
  try {
    const response = await axiosInstance.get(`/reports/shared/${token}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status != 200 && response.status != 201) {
      throw new Error("Failed to get report");
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
