import PencilIcon from "./PencilIcon";

const Initials = ({
  email,
  focused,
  onFocus,
  edit,
}: {
  email: string;
  focused?: boolean;
  onFocus?: (focus: boolean) => void;
  edit?: boolean;
}) => {
  const initials = (email: string) => {
    return email.slice(0, 2).toUpperCase();
  };
  return (
    <div className="flex items-center justify-center aspect-square h-full w-1/9 bg-primary2 rounded-2xl">
      <p
        className={`font-secondary lg:text-heading0 sm:text-heading3 ${
          focused ? "text-primary1" : "text-secondary2"
        }`}
      >
        {initials(email)}
      </p>
      {edit && (
        <button
          className="cursor-pointer aspect-square p-2 absolute border-5 border-base-0 bg-secondary2 rounded-3xl"
          style={{
            bottom: "-1rem",
            right: "-1rem",
          }}
          onClick={() => onFocus?.(!focused)}
        >
          <PencilIcon color="#FFFFFF" />
        </button>
      )}
    </div>
  );
};

export default Initials;
