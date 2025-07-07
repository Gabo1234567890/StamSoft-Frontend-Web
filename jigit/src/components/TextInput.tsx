import type { Dispatch, SetStateAction } from "react";

interface TextInputProps {
  type: string;
  placeholder: string;
  onChange: Dispatch<SetStateAction<string>>;
  defaultVal?: string;
}

const TextInput = ({
  type,
  placeholder,
  onChange,
  defaultVal,
}: TextInputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      defaultValue={defaultVal}
    />
  );
};

export default TextInput;
