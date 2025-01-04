import { useTheme } from '@/context/themeContext';
import React from 'react';
import { IoClose } from 'react-icons/io5';

const CloseButton = (props: { onClick: () => void }) => {
  const { theme } = useTheme();
  return (
    <div
      onClick={props.onClick}
      className="absolute top-1 right-1 p-1 w-8 aspect-square flex items-center justify-center hover:cursor-pointer"
    >
      <IoClose fill={theme == 'dark' ? 'white' : 'black'} className="text-lg" />
    </div>
  );
};

export default CloseButton;
