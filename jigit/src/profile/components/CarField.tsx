import { useState } from "react";
import InformationField from "./InformationField";
import EditButton from "../../components/EditButton";
import TextInput from "../../components/TextInput";
import PencilIcon from "../../components/PencilIcon";
import LogoutButton from "../../components/LogoutButton";
import DeleteButton from "../../components/DeleteButton";

const CarField = ({ car }: { car: Car }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleSection = () => setExpanded(!expanded);
  const [edit, setEdit] = useState(false);

  const [brand, setBrand] = useState(car.brand);
  const [focusedBrand, setFocusedBrand] = useState(false);

  const [model, setModel] = useState(car.model);
  const [focusedModel, setFocusedModel] = useState(false);

  const [licensePlate, setLicensePlate] = useState(car.licensePlate);
  const [focusedLicensePlate, setFocusedLicensePlate] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between w-full py-4 border-b-[1px] border-b-base-30">
        <div className="flex gap-5 items-center">
          <img src="./NotSelectedCarIcon.svg" alt="Car" />
          <p className="font-secondary text-heading3light text-secondary2">
            {car.licensePlate}
          </p>
        </div>
        <button onClick={toggleSection} className="cursor-pointer">
          <img
            src="./BackArrow.svg"
            alt="RightArrow"
            className={`transition-transform duration-100 ${
              expanded ? "rotate-270" : "rotate-180"
            }`}
          />
        </button>
      </div>
      {expanded && (
        <div className="flex items-end justify-between transition-transform duration-300">
          {edit ? (
            <div className="flex justify-between w-full items-end">
              <div className="w-1/5">
                <TextInput
                  type="text"
                  placeholder="Brand"
                  onChange={setBrand}
                  val={brand}
                  focused={focusedBrand}
                  onFocus={() => setFocusedBrand(!focusedBrand)}
                  rightIcon={
                    <PencilIcon color={focusedBrand ? "#4110EA" : "#250D77"} />
                  }
                />
              </div>

              <div className="w-1/5">
                <TextInput
                  type="text"
                  placeholder="Model"
                  onChange={setModel}
                  val={model}
                  focused={focusedModel}
                  onFocus={() => setFocusedModel(!focusedModel)}
                  rightIcon={
                    <PencilIcon color={focusedModel ? "#4110EA" : "#250D77"} />
                  }
                />
              </div>

              <div className="w-1/5">
                <TextInput
                  type="text"
                  placeholder="License Plate"
                  onChange={setLicensePlate}
                  val={licensePlate}
                  focused={focusedLicensePlate}
                  onFocus={() => setFocusedLicensePlate(!focusedLicensePlate)}
                  rightIcon={
                    <PencilIcon
                      color={focusedLicensePlate ? "#4110EA" : "#250D77"}
                    />
                  }
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-8 items-end pb-1">
                <DeleteButton />
                <EditButton
                  className="h-10 px-5 py-0.5"
                  onClick={() => setEdit(false)}
                  editing={true}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-between w-full items-end">
              <div className="flex px-3 w-2/3 justify-between">
                <InformationField title="Brand" value={car.brand} type="text" />
                <InformationField title="Model" value={car.model} type="text" />
                <InformationField
                  title="License Plate"
                  value={car.licensePlate}
                  type="text"
                />
              </div>
              <EditButton
                className="h-10 px-5 py-0.5"
                onClick={() => setEdit(true)}
                editing={false}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CarField;
