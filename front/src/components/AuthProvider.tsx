'use client';
import { useAppDispatch, useAppSelector } from '@/store';
import { getUser } from '@/store/features/auth-slice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useRouter();
  const { user } = useAppSelector((store) => store.authSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
    if (user?.access_token) {
      navigate.push('/home');
    }
  }, [dispatch, user?.access_token, navigate]);

  return <>{children}</>;
};

export default AuthProvider;
