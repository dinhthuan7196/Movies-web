import { FC, useState } from 'react';
import classNames from 'classnames';

import Button from '../button';
import { ArrowDown } from '../icons';

export type Option = {
  label: string;
  value?: string;
};

type Item = {
  selected?: boolean;
  item: Option;
  onClick: (selected?: string) => void;
};

interface DropdownProps {
  options?: Option[];
  value?: string;
  disabled?: boolean;
  onChange?: (value?: string) => void;
}

const MenuItem: FC<Item> = ({ item, selected, onClick }) => (
  <span
    className={classNames(
      'cursor-pointer text-gray-700 block px-4 py-2 text-sm hover:bg-stone-100',
      { 'bg-stone-300': selected }
    )}
    onClick={() => onClick(item.value)}
  >
    {item.label}
  </span>
);

const Dropdown: FC<DropdownProps> = ({
  options,
  value,
  disabled,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen((prev) => !prev);

  const handleChange = (selected?: string) => onChange && onChange(selected);

  const handleClose = () => setIsOpen(false);

  return (
    <div className="relative inline-block text-left">
      <Button disabled={disabled} onClick={handleOpen}>
        {value ?? ''} <ArrowDown />
      </Button>

      {isOpen && !!options && (
        <div className="absolute left-0 right-0 z-10 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="none">
            {options?.map((item) => (
              <MenuItem
                key={item.value}
                item={item}
                selected={item.value === value}
                onClick={(selected) => {
                  handleChange(selected);
                  handleClose();
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
