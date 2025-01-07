import { useTheme } from '@/context/theme-context';
import React from 'react';

const Loader = () => {
  //   const { theme } = useTheme();
  return (
    <div className="h-full w-full flex items-center justify-center">
      <span className="css-loader"></span>;
    </div>
  );
};

export default Loader;
