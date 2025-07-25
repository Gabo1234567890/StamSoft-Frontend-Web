import axiosInstance from "./Axios";

export const addCar = async ({
  brand,
  model,
  licensePlate,
}: Car): Promise<Car> => {
  try {
    const response = await axiosInstance.post(
      "/car",
      { brand, model, licensePlate },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status != 200 && response.status != 201) {
      throw new Error("Car creation failed");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const patchCarByID = async (
  id: number,
  { model, brand, licensePlate }: Car
): Promise<Car> => {
  try {
    const response = await axiosInstance.patch(
      `/car/${id}`,
      { model, brand, licensePlate },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status != 200 && response.status != 201) {
      throw new Error("Car update failed");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteCarByID = async (id: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/car/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status != 200 && response.status != 201) {
      throw new Error("Car delete failed");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
