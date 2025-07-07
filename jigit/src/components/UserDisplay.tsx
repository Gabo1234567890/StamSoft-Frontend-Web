import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { deleteCarByID, patchCarByID } from "../services/cars";
import Report from "./Report";
import TextInput from "./TextInput";
const UserDisplay = ({
  user,
  setUser,
}: {
  user: User;
  setUser: Dispatch<SetStateAction<User | null>>;
}) => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  useEffect(() => {
    user.cars?.map((car) => {
      setBrand(car.brand);
      setModel(car.model);
      setLicensePlate(car.licensePlate);
    });
  }, []);

  const cars = user.cars;
  const reports = user.reports;
  return (
    <>
      <p>{user.email}</p>
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
      {cars?.map((car, index) => {
        const handlePatchCar = async () => {
          try {
            const carId = car.id;
            if (!carId) {
              throw new Error("No matching cars");
            } else {
              await patchCarByID(carId, { model, brand, licensePlate });
              setUser((prevUser) => {
                if (!prevUser || !prevUser.cars) return prevUser;
                let index = prevUser.cars.indexOf(car);
                prevUser.cars[index] = { model, brand, licensePlate };
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

      {reports?.map((report, index) => {
        return <Report report={report} key={index} />;
      })}
    </>
  );
};

export default UserDisplay;
