import React from 'react';
import PaymentWrapper from '../_components/PaymentWrapper';

const PaymentPage = async ({ params }: { params: { id: string } }) => {
  console.log(params['id']);
  return (
    <div className='h-screen p-3 max-w-7xl mx-auto flex items-center justify-center'>
      <PaymentWrapper />
    </div>
  );
};

export default PaymentPage;
