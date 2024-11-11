'use client';
import { useTheme } from '@/context/themeContext';
import React from 'react';

const Hero = () => {
  const { theme } = useTheme();

  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  const gradientColors =
    theme === 'dark'
      ? 'from-purple-400 via-violet-400 to-pink-400' // Dark mode gradient
      : 'from-purple-500 via-violet-500 to-pink-500'; // Light mode gradient

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] md:text-4xl lg:text-7xl font-bold text-center font-sans tracking-tight">
      <h2
        className={`text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center font-sans tracking-tight ${textColor}`}
      >
        Optimize Every Load {/* <h2> */}
      </h2>
      <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
        <div
          className={`relative left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 ${gradientColors} [text-shadow:0_0_rgba(0,0,0,0.1)]`}
        >
          <span>Maximize Every Mile.</span>
        </div>
        {/* <div
          className={`relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r py-4 ${gradientColors}`}
        >
          <span>Mile.</span>
        </div> */}
      </div>
      {/* </h2> */}
    </div>
  );
};

export default Hero;
