import { useEffect, useState } from "react";
import { getMyCarsReports } from "../services/reports";
import Report from "../components/Report";
import { useAuth } from "../context/AuthContext";
import UserDisplay from "../components/UserDisplay";
import TextInput from "../components/TextInput";
import { addCar } from "../services/cars";

const ProfilePage = () => {
  const [myReports, setMyReports] = useState<Report[]>([]);
  const { user, setUser } = useAuth();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  const fetchMyReports = async () => {
    try {
      const reports = await getMyCarsReports();
      setMyReports(reports);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleAddCar = async () => {
    try {
      if (!brand || !model || !licensePlate) {
        alert("Brand, model and license plate should not be empty");
      } else {
        await addCar({ brand, model, licensePlate });
        setUser((prevUser) => {
          if (!prevUser) return prevUser;

          return {
            ...prevUser,
            cars: [...(prevUser.cars || []), { brand, model, licensePlate }],
          };
        });
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    fetchMyReports();
  }, []);

  return (
    <>
      {user ? <UserDisplay user={user} setUser={setUser} /> : null}

      <TextInput placeholder="Brand" type="text" onChange={setBrand} />
      <TextInput placeholder="Model" type="text" onChange={setModel} />
      <TextInput
        placeholder="License Plate"
        type="text"
        onChange={setLicensePlate}
      />
      <button onClick={handleAddCar}>Add a Car</button>

      {myReports.map((report, index) => (
        <Report report={report} key={index} />
      ))}
    </>
  );
};

export default ProfilePage;
