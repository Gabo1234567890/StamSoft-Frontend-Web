import CardHeader from "./CardHeader";
import PlusButton from "../../components/PlusButton";
import CarField from "./CarField";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { addCar } from "../../services/cars";

const MyCarsCard = ({ cars }: { cars: Car[] }) => {
  const { setUser } = useAuth();
  const [showFields, setShowFields] = useState(false);
  const [addBrand, setAddBrand] = useState("");
  const [focusedBrand, setFocusedBrand] = useState(false);
  const [addModel, setAddModel] = useState("");
  const [focusedModel, setFocusedModel] = useState(false);
  const [addLicensePlate, setAddLicensePlate] = useState("");
  const [focusedLicensePlate, setFocusedLicensePlate] = useState(false);

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
    <div className="profile-cards-container">
      <CardHeader title="My Cars">
        {showFields && (
          <div className="flex gap-4">
            <input
              value={addBrand}
              onChange={(e) => setAddBrand(e.target.value)}
              onFocus={() => setFocusedBrand(true)}
              onBlur={() => setFocusedBrand(false)}
              placeholder="Brand"
              type="text"
              className={`border rounded-sm px-2 ${
                focusedBrand
                  ? "border-primary1 caret-primary1 text-primary1"
                  : "border-secondary2 text-secondary2"
              }`}
            />
            <input
              value={addModel}
              onChange={(e) => setAddModel(e.target.value)}
              onFocus={() => setFocusedModel(true)}
              onBlur={() => setFocusedModel(false)}
              placeholder="Model"
              type="text"
              className={`border rounded-sm px-2 ${
                focusedModel
                  ? "border-primary1 caret-primary1 text-primary1"
                  : "border-secondary2 text-secondary2"
              }`}
            />
            <input
              value={addLicensePlate}
              onChange={(e) => setAddLicensePlate(e.target.value)}
              onFocus={() => setFocusedLicensePlate(true)}
              onBlur={() => setFocusedLicensePlate(false)}
              placeholder="License Plate"
              type="text"
              className={`border rounded-sm px-2 ${
                focusedLicensePlate
                  ? "border-primary1 caret-primary1 text-primary1"
                  : "border-secondary2 text-secondary2"
              }`}
            />
          </div>
        )}
        <PlusButton
          title="Add Car"
          onClick={() => {
            if (!showFields) {
              setShowFields(true);
            } else {
              setShowFields(false);
              handleAddCar();
            }
          }}
        />
      </CardHeader>
      <div className="flex flex-col gap-7">
        {cars.length === 0 && (
          <div className="flex flex-col gap-2 py-4 items-center">
            <img src="/GreyCar.svg" alt="Car" />
            <p className="font-secondary text-body1 text-base-40">
              No cars available
            </p>
          </div>
        )}
        {cars.map((car) => (
          <CarField car={car} key={car.id} />
        ))}
      </div>
    </div>
  );
};

export default MyCarsCard;
