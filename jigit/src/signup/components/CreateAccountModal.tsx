import type { Dispatch, SetStateAction } from "react";

const CreateAccountModal = ({
  setVisibility,
  handleSignup,
}: {
  setVisibility: Dispatch<SetStateAction<boolean>>;
  handleSignup: () => void;
}) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="px-2 justify-end flex w-full">
          <button
            onClick={() => setVisibility(false)}
            className="cursor-pointer"
          >
            <img src="/CloseIcon.svg" alt="Close" />
          </button>
        </div>
        <div className="flex flex-col gap-3 justify-between items-center w-2/3">
          <p className="modal-heading">Add Your Car</p>
          <p className="modal-description">
            Add your car now or skip and do it later from your profile.
          </p>
        </div>
        <div className="py-2 px-4 gap-3 flex w-full justify-center items-center">
          <button
            onClick={() => setVisibility(false)}
            className="default-not-filled-button flex-1 px-4"
          >
            Add Now
          </button>
          <button
            onClick={handleSignup}
            className="default-filled-button flex-1 px-4 text-paragraph-medium2 py-3"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountModal;
