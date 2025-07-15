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
        {cars.length === 0 && (
          <div className="flex flex-col gap-2 py-4 items-center">
            <img src="../../public/GreyCar.svg" alt="Car" />
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
