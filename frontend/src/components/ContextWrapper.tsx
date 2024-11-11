'use client';
import { ThemeProvider } from '@/context/themeContext';
import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthContextProvider } from '@/context/authContext';

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default ContextWrapper;
