import type { Dispatch, SetStateAction } from "react";

interface TextInputProps {
  type: string;
  placeholder: string;
  onChange: Dispatch<SetStateAction<string>>;
}

const TextInput = ({ type, placeholder, onChange }: TextInputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextInput;
