import { useState } from "react";
import TrashIcon from "./TrashIcon";

const DeleteButton = () => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="delete-button flex border-functional-error text-functional-error hover:text-base-0 hover:bg-functional-error"
    >
      Delete
      <TrashIcon color={hover ? "#FFFFFF" : "#EA3535"} />
    </button>
  );
};

export default DeleteButton;
