'use client';
import { store, useAppDispatch } from '@/store';
import { logout, verifyUserToken } from '@/store/features/auth-slice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const { meta } = await dispatch(verifyUserToken());
      if (meta.requestStatus == 'rejected') {
        dispatch(logout());
        navigate.push('/home');
      }
    })();
  }, [dispatch, navigate]);

  return <>{children}</>;
};

export default AuthProvider;
