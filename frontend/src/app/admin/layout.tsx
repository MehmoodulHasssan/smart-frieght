import React from 'react';
import AdminLayoutWrapper from './AdminLayoutWrapper';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyUser } from '@/utils/mutations/authMutations';
import { ApiError } from '@/utils/apiCall';

const AdminRoot = async ({ children }: { children: React.ReactNode }) => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token');
  // console.log(token);
  if (!token?.value) return redirect('/auth/login');
  try {
    const data = await verifyUser(token.value);
    if (data?.data?.role === 'admin') {
      return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
    } else {
      if (data?.data?.role === 'driver') {
        return redirect('/');
      } else {
        if (data?.data?.role === 'customer') {
          return redirect('/');
        }
      }
    }
  } catch (error: any) {
    console.log(error?.message);
    return redirect('/auth/login');
  }

  // return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
};

export default AdminRoot;
