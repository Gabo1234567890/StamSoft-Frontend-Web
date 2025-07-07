import { useEffect, useState } from "react";
import { addCar, deleteCarByID, patchCarByID } from "../services/cars";
import { useAuth } from "../context/AuthContext";
import TextInput from "./TextInput";

const CarsFunctionalDisplay = ({ cars }: { cars: Car[] }) => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const { setUser } = useAuth();

  useEffect(() => {
    cars.map((car) => {
      setBrand(car.brand);
      setModel(car.model);
      setLicensePlate(car.licensePlate);
    });
  }, []);

  const handleAddCar = async () => {
    try {
      if (!brand || !model || !licensePlate) {
        alert("Brand, model and license plate should not be empty");
      } else {
        const response = await addCar({ brand, model, licensePlate });
        setUser((prevUser) => {
          if (!prevUser) return prevUser;

          return {
            ...prevUser,
            cars: [...(prevUser.cars || []), response],
          };
        });
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      <TextInput placeholder="Brand" type="text" onChange={setBrand} />
      <TextInput placeholder="Model" type="text" onChange={setModel} />
      <TextInput
        placeholder="License Plate"
        type="text"
        onChange={setLicensePlate}
      />
      <button onClick={handleAddCar}>Add a Car</button>

      {cars?.map((car, index) => {
        const handlePatchCar = async () => {
          try {
            const carId = car.id;
            if (!carId) {
              throw new Error("No matching cars");
            } else {
              const response = await patchCarByID(carId, {
                model,
                brand,
                licensePlate,
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
          <div key={index}>
            <p>{car.brand}</p>
            <p>{car.model}</p>
            <p>{car.licensePlate}</p>
            <TextInput
              placeholder="Brand"
              type="text"
              onChange={setBrand}
              defaultVal={car.brand}
            />
            <TextInput
              placeholder="Model"
              type="text"
              onChange={setModel}
              defaultVal={car.model}
            />
            <TextInput
              placeholder="License Plate"
              type="text"
              onChange={setLicensePlate}
              defaultVal={car.licensePlate}
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
