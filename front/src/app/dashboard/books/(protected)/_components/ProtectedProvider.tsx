'use client';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';
const allow = false;
const ProtectedProvider = ({ children }: { children: React.ReactNode }) => {
  // const router = useRouter();
  useEffect(() => {
    if (!allow) {
      toast.error('You are not authorized to be here!!!');
      redirect('/dashboard');
    }
  }, []);
  return <div>{children}</div>;
};

export default ProtectedProvider;
