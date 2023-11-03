import SwiperWrapper from '@/components/swiper/SwiperWrapper';
import React from 'react';

const ReleasesSection: React.FC<{
  sectionLabel: string;
  data: any[];
  children?: React.ReactNode;
}> = ({ sectionLabel, data, children }) => {
  return (
    <section className='py-12 '>
      <div className='container space-y-8'>
        <h2 className='scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0 dark:text-gray-800'>
          {sectionLabel}
        </h2>
        {children}
        <SwiperWrapper data={[1, 2, 3, 4, 5]} />
      </div>
    </section>
  );
};

export default ReleasesSection;
