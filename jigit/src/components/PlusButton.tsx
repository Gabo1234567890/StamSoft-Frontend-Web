import { useState } from "react";
import PlusIcon from "./PlusIcon";

const PlusButton = ({ title }: { title: string }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex default-not-filled-button px-9 hover:bg-primary1 hover:text-base-0"
    >
      <p className="text-paragraph-medium1">{title}</p>
      <PlusIcon color={hover ? "#FFFFFF" : "#4110ea"} />
    </button>
  );
};

export default PlusButton;
