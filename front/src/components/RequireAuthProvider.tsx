'use client';
import { useAppDispatch, useAppSelector } from '@/store';
import { getUser } from '@/store/features/auth-slice';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const RequireAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useRouter();
  const { user } = useAppSelector((store) => store.authSlice);
  const pathname = usePathname();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
    if (!user?.access_token) {
      navigate.push('/login?redirect_to=' + pathname);
    }
  }, [dispatch, user?.access_token, navigate, pathname]);

  return <>{children}</>;
};

export default RequireAuthProvider;
