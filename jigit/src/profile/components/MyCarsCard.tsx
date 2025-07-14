import { Children } from "react";
import EditButton from "../../components/EditButton";
import CardHeader from "./CardHeader";
import PlusButton from "../../components/PlusButton";
import CarField from "./CarField";

const MyCarsCard = ({ cars }: { cars: Car[] }) => {
  return (
    <div className="profile-cards-container">
      <CardHeader title="My Cars">
        <PlusButton title="Add Car" />
      </CardHeader>
      <div className="flex flex-col gap-7">
        {cars.map((car) => (
          <CarField car={car} key={car.id} />
        ))}
      </div>
    </div>
  );
};

export default MyCarsCard;
