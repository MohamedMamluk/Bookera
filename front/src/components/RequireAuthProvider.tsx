'use client';
import { store, useAppDispatch, useAppSelector } from '@/store';
import { verifyUserToken } from '@/store/features/auth-slice';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const RequireAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      const { meta } = await store.dispatch(verifyUserToken());
      if (meta.requestStatus == 'rejected') {
        navigate.push('/login?redirect_to=' + pathname);
        return;
      }
      navigate.push(pathname);
    })();
  }, [navigate, pathname]);

  return <>{children}</>;
};

export default RequireAuthProvider;
