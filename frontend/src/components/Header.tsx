'use client';
import { useTheme } from '@/context/themeContext';
import Image from 'next/image';
import React from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';
import GradientButton from './GradientButton';
import Link from 'next/link';
// import logo from '/vercel.svg';

const Header = () => {
  const { toggleTheme, theme } = useTheme();

  const toggleDarkMode = () => {
    toggleTheme();
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md">
      {/* Left side: Logo and title */}
      <div className="flex items-center space-x-2">
        <div
          style={{ width: '40px', height: '40px' }}
          className="relative flex w-full h-full"
        >
          <Image
            src={`/images/${theme == 'dark' ? 'whiteLogo' : 'blackLogo'}.png`}
            alt="Logo"
            fill
            className="w-10 h-10"
            objectFit="contain"
            objectPosition="center"
          />
        </div>
        {/* Replace with your logo path */}
        <span className="text-xl font-geist-bold">{'Smart Frieght'}</span>
      </div>

      {/* Middle: Navigation options */}
      <div
        className={`hidden md:flex space-x-6 ${
          theme == 'dark' ? 'text-white' : 'text-black'
        }`}
      >
        {['Home', 'About', 'Services', 'Contact'].map((item, index) => (
          <Link
            key={index}
            href={`#${item.toLowerCase()}`}
            className={`font-geist-semibold hover:cursor-pointer  ${
              theme == 'dark' ? 'hover:text-slate-200' : 'hover:text-gray-700'
            }`}
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Right side: Dark mode toggle and Login button */}
      <div className="flex items-center space-x-4">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          style={{ height: '100%', aspectRatio: '1/1' }}
          className={`p-2 rounded-lg ${
            theme === 'light'
              ? 'bg-gray-200 hover:bg-gray-300'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
          aria-label="Toggle dark mode"
        >
          {theme == 'light' ? <LuSun /> : <LuMoon />}
        </button>
        <GradientButton>Log In</GradientButton>

        {/* Login button */}
      </div>
    </nav>
  );
};

export default Header;
