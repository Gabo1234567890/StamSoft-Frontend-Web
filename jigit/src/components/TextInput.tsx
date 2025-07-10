import type { Dispatch, SetStateAction } from "react";

interface TextInputProps {
  type: string;
  placeholder: string;
  onChange: Dispatch<SetStateAction<string>>;
  val?: string;
  errorMessage: string;
  focused: boolean;
  onFocus: (focus: boolean) => void;
}

const TextInput = ({
  type,
  placeholder,
  onChange,
  val,
  errorMessage,
  focused,
  onFocus,
}: TextInputProps) => {
  return (
    <div className="gap-2 max-h-[90px]">
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
      <div className="flex flex-col gap-1 h-[52px]">
        <input
          className={
            "h-full py-4 px-3 gap-2.5 " +
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
      </div>
      <div className="px-3 gap-2.5 place-items-start h-3">
        {errorMessage && <label>{errorMessage}</label>}
      </div>
    </div>
  );
};

export default TextInput;
