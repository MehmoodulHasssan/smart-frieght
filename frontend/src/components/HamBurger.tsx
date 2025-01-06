import { useTheme } from '@/context/myThemeContext';
import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useRouter } from 'next/navigation';

const HamBurger = () => {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    // <button
    //   className={`flex lg:hidden w-10 aspect-square items-center justify-center p-1 rounded-lg ${
    //     theme === 'light' ? ' active:bg-gray-300' : ' active:bg-gray-700'
    //   }`}
    //   aria-label="Toggle dark mode"
    // >
    //   {<RxHamburgerMenu size={20} />}
    // </button>
    <div
      className={`flex lg:hidden w-10 aspect-square items-center justify-center p-1 rounded-lg ${
        theme === 'light' ? ' active:bg-gray-300' : ' active:bg-gray-700'
      }`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger>
          {<RxHamburgerMenu size={20} />}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel
            onClick={() => router.push('/auth/login')}
            className="active:opacity-70"
          >
            {'Login'}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/')}>
            Home
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/')}>
            Book a truck
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/')}>
            Contact us
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/')}>
            About
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HamBurger;
