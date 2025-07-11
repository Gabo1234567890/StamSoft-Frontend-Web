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
}: TextInputProps) => {
  return (
    <div className="gap-2 max-h-[92px] flex flex-col">
      <div className="px-3 place-items-start h-4">
        {(errorMessage || focused || val) && (
          <label
            className={
              "absolute " +
              (focused
                ? "text-primary1 text-paragraph-regular3 font-secondary"
                : errorMessage
                ? "text-functional-error text-paragraph-regular3 font-secondary"
                : "text-secondary2 text-paragraph-regular3 font-secondary")
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
              "h-full py-4 px-3 gap-2.5 w-full " +
              (focused
                ? "focus-input-field"
                : errorMessage
                ? "error-input-field"
                : val
                ? "filled-input-field"
                : "default-input-field")
            }
            type={type}
            placeholder={!errorMessage && !focused && !val ? placeholder : ""}
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
        <div className="px-3 gap-2.5 place-items-start h-3">
          {errorMessage && (
            <label className="text-functional-error font-secondary text-caption absolute">
              {errorMessage}
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextInput;
