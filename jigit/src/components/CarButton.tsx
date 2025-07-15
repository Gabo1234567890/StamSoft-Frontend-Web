import { useState, type Dispatch, type SetStateAction } from "react";

const CarButton = ({
  index,
  setIndex,
  selected,
}: {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  selected: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const showSelectedStyle = selected || isHovered;
  const icon = showSelectedStyle
    ? "/SelectedCarIcon.svg"
    : "/NotSelectedCarIcon.svg";
  const textColor = showSelectedStyle ? "text-base-0" : "text-primary1";

  return (
    <button
      onClick={() => setIndex(index)}
      className={selected ? "selected-car-button" : "not-selected-car-button"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={icon} alt="Car" />
      <p className={`text-body2 font-primary ${textColor}`}>{index + 1}</p>
    </button>
  );
};

export default CarButton;
