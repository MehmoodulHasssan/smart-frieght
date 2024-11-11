'use client';
import { useTheme } from '@/context/themeContext';
import Image from 'next/image';
import React from 'react';
import GradientButton from './GradientButton';
import Link from 'next/link';
import ThemeToggleBtn from './ThemeToggleBtn';
import NavLink from './NavLink';
import { useRouter } from 'next/navigation';
import HamBurger from '@/components/HamBurger';
// import logo from '/vercel.svg';

const Header = () => {
  const { theme } = useTheme();
  const router = useRouter();

  // const scrollToSection = (sectionId: string) => {
  //   const element = document.getElementById(sectionId);
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md">
      {/* Left side: Logo and title */}
      <div className="flex items-center space-x-2">
        <Image
          src={`/images/${theme == 'dark' ? 'whiteLogo' : 'blackLogo'}.png`}
          alt="Logo"
          width={40}
          height={40}
          //   className="w-10 h-10"
          objectFit="contain"
          objectPosition="center"
        />
        {/* Replace with your logo path */}
        <span className="text-xl font-geist-bold">{'Smart Frieght'}</span>
      </div>

      {/* Middle: Navigation options */}
      <div
        className={`hidden lg:flex space-x-6 ${
          theme == 'dark' ? 'text-white' : 'text-black'
        }`}
      >
        {['Home', 'About', 'Services', 'Contact'].map((link, index) => (
          <NavLink key={index} link={link} />
        ))}
      </div>

      {/* Right side: Dark mode toggle and Login button */}
      <div className="flex items-center space-x-2 lg:space-x-4">
        {/* Dark mode toggle */}
        <ThemeToggleBtn />
        <GradientButton
          title="Log In"
          onClick={() => router.push('/auth/login')}
        />
        <HamBurger />
        {/* Login button */}
      </div>
    </nav>
  );
};

export default Header;
