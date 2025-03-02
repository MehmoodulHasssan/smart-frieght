'use client';
import { useTheme } from '@/context/theme-context';
import Image from 'next/image';
import React from 'react';
import GradientButton from './GradientButton';
import ThemeToggleBtn from './ThemeToggleBtn';
import NavLink from './NavLink';
import { useRouter } from 'next/navigation';
import HamBurger from '@/components/HamBurger';
import { useAuthContext } from '@/context/authContext';
import { logoutUser } from '@/utils/mutations/authMutations';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import {
  consignorNavData,
  driverNavData,
  unregisteredNavData,
} from '@/utils/data';
import { UserRoles } from '@/utils/queries';
import { ProfileDropdown } from './profile-dropdown';
import { ThemeSwitch } from './theme-switch';
// import logo from '/vercel.svg';

const Header = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const { currentUser, setCurrentUser } = useAuthContext();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ['logoutUser'],
    mutationFn: logoutUser,
    onSuccess: () => {
      setCurrentUser(null);
      toast({
        title: 'Success',
        description: 'Logged out successfully',
      });
      router.push('/auth/login');
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: 'Error',
        description: 'Something went wrong',
      });
    },
  });

  const navData = currentUser
    ? currentUser?.role === UserRoles.CONSIGNOR
      ? consignorNavData
      : driverNavData
    : unregisteredNavData;

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
      <div className={`hidden lg:flex space-x-6`}>
        {navData.map((navItem) => (
          <NavLink
            key={navItem.title}
            title={navItem.title}
            href={navItem.href}
          />
        ))}
      </div>

      {/* Right side: Dark mode toggle and Login button */}
      <div className="flex items-center space-x-2 lg:space-x-4">
        {/* Dark mode toggle */}
        <ThemeSwitch />
        {currentUser ? (
          <ProfileDropdown />
        ) : (
          <>
            <GradientButton
              title={'Register'}
              onClick={() => router.push('/auth/register')}
            />
            <GradientButton
              title={'Log In'}
              onClick={() => router.push('/auth/login')}
            />
            <HamBurger />
          </>
        )}
        {/* Login button */}
      </div>
    </nav>
  );
};

export default Header;
