import React from 'react';
import OrdersLayoutWrapper from './OrdersLayoutWrapper';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyUser } from '@/utils/mutations/authMutations';
// import { ApiError } from '@/utils/apiCall';
// import Orders from '../admin/orders/page';

const OrdersRoot = async ({ children }: { children: React.ReactNode }) => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token');
  // console.log(token);
  if (!token?.value) return redirect('/auth/login');
  try {
    const data = await verifyUser(token.value);
    if (data?.data?.role === 'driver' || data?.data?.role === 'consignor') {
      return <OrdersLayoutWrapper>{children}</OrdersLayoutWrapper>;
    } else {
      //   (await cookies()).delete('token');
      return redirect('/auth/login');
    }
  } catch (error: any) {
    console.log(error?.message);
    // (await cookies()).delete('token');
    return redirect('/auth/login');
  }

  // return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
};

export default OrdersRoot;
