import { FC, ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, disabled, onClick }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className="inline-flex w-fit justify-center items-center gap-x-1.5 rounded bg-white px-3 py-2 m-2 text-sm h-11
        text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
  >
    {children || ''}
  </button>
);

export default Button;
