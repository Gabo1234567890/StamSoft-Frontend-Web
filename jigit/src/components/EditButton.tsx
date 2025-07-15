import { useState } from "react";
import PencilIcon from "./PencilIcon";

const EditButton = ({
  className,
  onClick,
  editing,
}: {
  className?: string;
  onClick?: () => void;
  editing?: boolean;
}) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      className={`flex default-not-filled-button hover:bg-primary1 hover:text-base-0 ${
        className || ""
      }`}
    >
      <p className="text-paragraph-medium1">{editing ? "Done" : "Edit"}</p>
      <PencilIcon color={hover ? "#FFFFFF" : "#4110ea"} />
    </button>
  );
};

export default EditButton;
