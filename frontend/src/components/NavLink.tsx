import React, { useEffect } from 'react';
import Link, { LinkProps } from 'next/link';
import { useTheme } from '@/context/themeContext';
import { usePathname } from 'next/navigation';

interface Props extends LinkProps {
  title: string;
}
const NavLink = ({ title, ...props }: Props) => {
  const { theme } = useTheme();
  const pathname = usePathname();

  const gradientColors =
    theme === 'dark'
      ? 'from-purple-400 via-violet-400 to-pink-400' // Dark mode gradient
      : 'from-purple-500 via-violet-500 to-pink-500'; // Light mode gradient

  return (
    <Link
      {...props}
      // ${theme === 'dark' ? 'hover:text-slate-200' :'hover:text-gray-700'}
      className={`font-geist-semibold hover:cursor-pointer ${
        pathname == props.href
          ? `bg-gradient-to-r ${gradientColors} text-transparent bg-clip-text`
          : ''
      }`}
    >
      {title}
    </Link>
  );
};

export default NavLink;
