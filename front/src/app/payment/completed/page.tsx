import React, { useEffect } from 'react';
import Congratulations from './_components/Congratulations';
const paymentStatus = (pay_status: string) => {
  const status = (pay_status === 'succeeded' && 'COMPLETED') || 'CANCELED';
  return status;
};
const PaymentCompleted = ({
  searchParams,
}: {
  searchParams: Record<'payment_intent' | 'redirect_status', string>;
}) => {
  // const payment = await completePayment(searchParams);
  return (
    <div className='bg-white h-screen flex items-center justify-center'>
      <Congratulations
        paymentId={searchParams.payment_intent}
        status={paymentStatus(searchParams.redirect_status)}
      />
    </div>
  );
};

export default PaymentCompleted;
