import React, { Suspense } from 'react';
import AuthenticationPage from './_login_form_wrapper';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Login',
  description: 'Login with your account to access more features.',
};
const LoginPage = () => {
  return (
    <div className='h-screen'>
      <Suspense>
        <AuthenticationPage />
      </Suspense>
    </div>
  );
};

export default LoginPage;
