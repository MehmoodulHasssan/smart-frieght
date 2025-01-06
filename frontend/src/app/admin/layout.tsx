import React from 'react';
import AdminLayoutWrapper from './AdminLayoutWrapper';

const AdminRoot = ({ children }: { children: React.ReactNode }) => {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
};

export default AdminRoot;
