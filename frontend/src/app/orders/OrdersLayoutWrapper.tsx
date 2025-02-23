import Header from '@/components/Header';
import { cn } from '@/lib/utils';
import React from 'react';

const OrdersLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      id="content"
      className={cn(
        'max-w-full w-full ml-auto'
        // 'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
        // 'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
        // 'transition-[width] ease-linear duration-200',
        // 'h-svh flex flex-col',
        // 'group-data-[scroll-locked=1]/body:h-full',
        // 'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
      )}
    >
      <Header />
      {children}
    </div>
  );
};

export default OrdersLayoutWrapper;
