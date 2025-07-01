interface TextInputProps {
  type: string;
  placeholder: string;
  onChange: any;
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
