'use client';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SearchProvider } from '@/context/search-context';
import { cn } from '@/lib/utils';
import React from 'react';

const AdminLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={true}>
        {/* <SkipToMain /> */}
        <AppSidebar />
        <div
          id="content"
          className={cn(
            'max-w-full w-full ml-auto',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'transition-[width] ease-linear duration-200',
            'h-svh flex flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
          )}
        >
          {children}
        </div>
      </SidebarProvider>
    </SearchProvider>
  );
};

export default AdminLayoutWrapper;
