import type { Dispatch, SetStateAction } from "react";

interface TextInputProps {
  type: string;
  placeholder: string;
  onChange: Dispatch<SetStateAction<string>>;
  val?: string;
}

const TextInput = ({ type, placeholder, onChange, val }: TextInputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      value={val}
    />
  );
};

export default TextInput;
