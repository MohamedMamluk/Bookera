import React from 'react';
import ProtectedProvider from './_components/ProtectedProvider';

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default ProtectedRoutes;
