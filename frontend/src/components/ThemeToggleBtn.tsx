import { useTheme } from '@/context/theme-context';
import React from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';

const ThemeToggleBtn = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={`w-10 aspect-square flex items-center justify-center p-1 rounded-lg ${
        theme === 'light'
          ? ' hover:bg-gray-300 active:bg-gray-300'
          : ' hover:bg-gray-700 active:bg-gray-700'
      }`}
      aria-label="Toggle dark mode"
    >
      {theme == 'light' ? <LuSun size={20} /> : <LuMoon size={20} />}
    </button>
  );
};

export default ThemeToggleBtn;
