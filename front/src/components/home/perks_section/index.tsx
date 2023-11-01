import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Award, CreditCard } from 'lucide-react';
import React from 'react';
type Perk = {
  title: string;
  icon: any;
  description: string;
};
const perks: Perk[] = [
  {
    title: 'Instant Delivery',
    icon: <Car size='92' fill='white' />,
    description: 'Start viewing the book instantly.',
  },
  {
    title: 'Secure Payment',
    icon: <CreditCard size='92' fill='white' />,
    description: `We don't store your credentials.`,
  },
  {
    title: 'Best Quality',
    icon: <Award size='92' fill='white' />,
    description: 'Our books are scanned with top software to ensure quality.',
  },
];
const PerksSection = () => {
  return (
    <div className=' flex flex-col items-center md:flex-row justify-evenly gap-4 flex-wrap py-7 px-2'>
      {perks.map((perk, index) => {
        return (
          <Card
            key={index}
            className='max-w-xs w-full shadow-lg h-[300px] bg-white'
          >
            <CardHeader>
              {perk.icon}
              <CardTitle className='py-2'>{perk.title}</CardTitle>
              <div className='border-orange-500 border-b-2 w-16'></div>
            </CardHeader>
            <CardContent className='text-gray-600'>
              <p className=''>{perk.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PerksSection;
