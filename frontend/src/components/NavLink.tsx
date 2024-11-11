import React, { useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/themeContext';
const NavLink = ({ link }: { link: string }) => {
  const { theme } = useTheme();
  useEffect(() => {
    const currentRoute = window.location.pathname;
    if (currentRoute === `/${link.toLowerCase()}`) {
      //gradient link
    }
  }, []);

  return (
    <Link
      href={`#${link.toLowerCase()}`}
      className={`font-geist-semibold hover:cursor-pointer  ${
        theme == 'dark' ? 'hover:text-slate-200' : 'hover:text-gray-700'
      }`}
    >
      {link}
    </Link>
  );
};

export default NavLink;
