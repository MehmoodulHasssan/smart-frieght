import { useTheme } from '@/context/myThemeContext';
import React from 'react';

const MapModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <div
      style={{ marginTop: 0 }}
      className={`fixed top-0 left-0 flex justify-center items-center bg-opacity-70 z-50 bg-black h-dvh w-dvw`}
    >
      <div
        className={`relative flex p-10 ${
          theme == 'dark' ? 'bg-black' : 'bg-white'
        } flex-col gap-2 w-2/4 h-3/4 border ${
          theme == 'dark' ? 'border-x-slate-200' : 'border-slate-900'
        } rounded-lg`}
      >
        {children}
      </div>
    </div>
  );
};

export default MapModalWrapper;
