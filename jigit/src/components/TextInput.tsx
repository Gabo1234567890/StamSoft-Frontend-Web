import type { Dispatch, SetStateAction } from "react";
interface TextInputProps {
  type: string;
  placeholder: string;
  onChange: Dispatch<SetStateAction<string>>;
  val?: string;
  errorMessage: string;
  focused: boolean;
  onFocus: (focus: boolean) => void;
  rightIcon?: React.ReactNode;
  forgotPassword?: React.ReactNode;
}

const TextInput = ({
  type,
  placeholder,
  onChange,
  val,
  errorMessage,
  focused,
  onFocus,
  rightIcon,
  forgotPassword,
}: TextInputProps) => {
  console.log(errorMessage);
  return (
    <div className="gap-2 flex flex-col">
      <div className="px-3 place-items-start">
        {((errorMessage && val) || focused || val) && (
          <label
            className={
              focused
                ? "text-primary1 text-paragraph-regular3 font-secondary"
                : errorMessage && val
                ? "text-functional-error text-paragraph-regular3 font-secondary"
                : "text-secondary2 text-paragraph-regular3 font-secondary"
            }
          >
            {placeholder}
          </label>
        )}
      </div>
      <div className="gap-1 flex flex-col">
        <div className="relative flex gap-1 h-[52px]">
          <input
            className={
              "h-full py-4 px-3 gap-2.5 w-full relative " +
              (focused
                ? "focus-input-field"
                : errorMessage && val
                ? "error-input-field"
                : val
                ? "filled-input-field"
                : "default-input-field")
            }
            type={type}
            placeholder={!focused && !val ? placeholder : ""}
            onChange={(e) => onChange(e.target.value)}
            value={val}
            onFocus={() => onFocus(true)}
            onBlur={() => onFocus(false)}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-2/5">
              {rightIcon}
            </div>
          )}
        </div>
        <div className="flex justify-between w-full items-center">
          <div className="px-3 leading-0 mb-auto">
            {!focused && errorMessage && val && (
              <span className="text-functional-error font-secondary text-caption">
                {errorMessage}
              </span>
            )}
          </div>
          {forgotPassword && forgotPassword}
        </div>
      </div>
    </div>
  );
};

export default TextInput;
