'use client';
import { ThemeProvider } from '@/context/theme-context';
import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthContextProvider } from '@/context/authContext';
import { SocketProvider } from '@/context/socketContext';
import { Toaster } from './ui/toaster';
// import { MapProvider } from '@/context/mapContext';

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <SocketProvider>
          <ThemeProvider storageKey="smart-frieght-theme">
            {children}
            <Toaster />
          </ThemeProvider>
        </SocketProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default ContextWrapper;
