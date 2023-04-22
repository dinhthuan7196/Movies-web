import { FC } from 'react';

interface InputProps {
  disabled?: boolean;
  value?: string;
  onChange?: (value?: string) => void;
  placeholder?: string;
}

const TextInput: FC<InputProps> = ({
  value,
  placeholder,
  disabled,
  onChange,
}) => (
  <input
    type="text"
    disabled={disabled}
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange && onChange(e.target.value)}
    className="bg-white border border-gray-300 text-gray-700 text-md rounded-lg block w-full h-11 p-2.5 my-2 disabled:opacity-50"
  />
);

export default TextInput;
