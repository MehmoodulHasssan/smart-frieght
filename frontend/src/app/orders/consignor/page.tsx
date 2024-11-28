'use client';
import Header from '@/components/Header';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Page = () => {
  const { data } = useQuery({
    queryKey: ['consignor-orders'],
    queryFn: () => {},
  });
  return (
    <>
      <Header />
      <div>Consignor</div>
    </>
  );
};

export default Page;
