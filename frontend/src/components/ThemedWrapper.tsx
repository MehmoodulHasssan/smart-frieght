'use client';
import { useTheme } from '@/context/themeContext';
import React from 'react';
import { Toaster } from '@/components/ui/toaster';

const ThemedWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'text-white bg-[#0a0a0a]' : 'text-black bg-[#ffffff]'
      }`}
    >
      {children}
      <Toaster />
    </div>
  );
};

export default ThemedWrapper;
