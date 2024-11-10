'use client';
import { useTheme } from '@/context/themeContext';
import React from 'react';

const ThemedWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme === 'dark' ? 'text-white bg-[#0a0a0a]' : 'text-black bg-[#ffffff]'
      }`}
    >
      {children}
    </div>
  );
};

export default ThemedWrapper;
