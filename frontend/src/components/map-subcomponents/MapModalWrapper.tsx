import { useTheme } from '@/context/theme-context';
import React from 'react';

const MapModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <div
      style={{ marginTop: 0 }}
      className={`fixed top-0 left-0 flex justify-center items-center bg-opacity-70 z-50 bg-black h-dvh w-dvw`}
    >
      <div
        className={`relative flex px-4 py-10 md:p-10 ${
          theme == 'dark' ? 'bg-black' : 'bg-white'
        } flex-col gap-2 w-[95%] h-1/2 md:h-8/12 md:w-10/12 lg:w-2/4 lg:h-3/4 border ${
          theme == 'dark' ? 'border-x-slate-200' : 'border-slate-900'
        } rounded-lg`}
      >
        {children}
      </div>
    </div>
  );
};

export default MapModalWrapper;
