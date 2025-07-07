import { useEffect, useState } from "react";
import { addCar, deleteCarByID, patchCarByID } from "../services/cars";
import { useAuth } from "../context/AuthContext";
import TextInput from "./TextInput";

const CarsFunctionalDisplay = ({ cars }: { cars: Car[] }) => {
  const [carsInfo, setCarsInfo] = useState<Record<number, Car>>({});
  const [addBrand, setAddBrand] = useState("");
  const [addModel, setAddModel] = useState("");
  const [addLicensePlate, setAddLicensePlate] = useState("");
  const { setUser } = useAuth();

  useEffect(() => {
    const initialCarsInfo: Record<number, Car> = {};
    cars.forEach((car) => {
      if (!car.id) {
        console.log(`Car: ${car} does not have an id`);
      } else {
        initialCarsInfo[car.id] = {
          brand: car.brand,
          model: car.model,
          licensePlate: car.licensePlate,
        };
      }
    });
    setCarsInfo(initialCarsInfo);
  }, [cars]);

  const setInitialInputData = (
    carId: number,
    field: keyof Car,
    value: string
  ) => {
    setCarsInfo((prev) => ({
      ...prev,
      [carId]: { ...prev[carId], [field]: value },
    }));
  };

  const handleAddCar = async () => {
    try {
      if (!addBrand || !addModel || !addLicensePlate) {
        alert("Brand, model and license plate should not be empty");
      } else {
        const response = await addCar({
          brand: addBrand,
          model: addModel,
          licensePlate: addLicensePlate,
        });
        setUser((prevUser) => {
          if (!prevUser) return prevUser;

          return {
            ...prevUser,
            cars: [...(prevUser.cars || []), response],
          };
        });
        setAddBrand("");
        setAddModel("");
        setAddLicensePlate("");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      <TextInput
        placeholder="Brand"
        type="text"
        onChange={setAddBrand}
        val={addBrand}
      />
      <TextInput
        placeholder="Model"
        type="text"
        onChange={setAddModel}
        val={addModel}
      />
      <TextInput
        placeholder="License Plate"
        type="text"
        onChange={setAddLicensePlate}
        val={addLicensePlate}
      />
      <button onClick={handleAddCar}>Add a Car</button>

      {cars?.map((car) => {
        if (!car.id) {
          console.log("Failed to get car id");
          return;
        }

        const carId = car.id;

        if (!carsInfo[carId]) {
          return;
        }

        const handlePatchCar = async () => {
          try {
            if (!carId) {
              throw new Error("No matching cars");
            } else {
              const response = await patchCarByID(carId, {
                model: carsInfo[carId].model,
                brand: carsInfo[carId].brand,
                licensePlate: carsInfo[carId].licensePlate,
              });
              setUser((prevUser) => {
                if (!prevUser || !prevUser.cars) return prevUser;
                const index = prevUser.cars.indexOf(car);
                prevUser.cars[index] = response;
                return {
                  ...prevUser,
                  cars: [...(prevUser.cars || [])],
                };
              });
            }
          } catch (error) {
            console.log(error);
            alert(error);
          }
        };

        const handleDeleteCar = async () => {
          try {
            if (!car.id) {
              throw new Error("No matching car");
            } else {
              await deleteCarByID(car.id);
              setUser((prevUser) => {
                if (!prevUser || !prevUser.cars) return prevUser;
                prevUser.cars.splice(prevUser.cars.indexOf(car), 1);
                return {
                  ...prevUser,
                  cars: [...(prevUser.cars || [])],
                };
              });
            }
          } catch (error) {
            console.log(error);
            alert(error);
          }
        };
        return (
          <div key={car.id}>
            <p>{car.brand}</p>
            <p>{car.model}</p>
            <p>{car.licensePlate}</p>
            <TextInput
              placeholder="Brand"
              type="text"
              onChange={(val) =>
                setInitialInputData(carId, "brand", val.toString())
              }
              val={carsInfo[car.id].brand}
            />
            <TextInput
              placeholder="Model"
              type="text"
              onChange={(val) =>
                setInitialInputData(carId, "model", val.toString())
              }
              val={carsInfo[car.id].model}
            />
            <TextInput
              placeholder="License Plate"
              type="text"
              onChange={(val) =>
                setInitialInputData(carId, "licensePlate", val.toString())
              }
              val={carsInfo[car.id].licensePlate}
            />
            <button onClick={handlePatchCar}>Update car information</button>
            <button onClick={handleDeleteCar}>Delete car</button>
          </div>
        );
      })}
    </>
  );
};

export default CarsFunctionalDisplay;
