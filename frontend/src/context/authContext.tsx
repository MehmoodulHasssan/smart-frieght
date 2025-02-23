'use client';
import React, { createContext, useContext, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { verifyUser } from '@/utils/mutations/authMutations';
import { UserRoles } from '@/utils/queries';

interface AuthContextType {
  currentUser: {
    _id: string;
    email: string;
    role: UserRoles;
    full_name: string;
    phone_number: string;
    profile_picture?: string;
  } | null;
  setCurrentUser: React.Dispatch<
    React.SetStateAction<AuthContextType['currentUser'] | null>
  >;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { mutate } = useMutation({
    mutationKey: ['verifyUser'],
    mutationFn: verifyUser,
    onSuccess: (data) => {
      setCurrentUser(data.data);
    },
    onError: () => {
      setCurrentUser(null);
    },
  });
  const [currentUser, setCurrentUser] = React.useState<
    AuthContextType['currentUser'] | null
  >(null);

  useEffect(() => {
    if (!currentUser) {
      mutate('');
    }
  }, [currentUser, mutate]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthContextProvider');
  }
  return context;
};
