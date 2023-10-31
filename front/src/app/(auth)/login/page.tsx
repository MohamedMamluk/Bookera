import React, { Suspense } from 'react';
import AuthenticationPage from './_login_form_wrapper';

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
