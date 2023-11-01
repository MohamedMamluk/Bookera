'use client';
import React from 'react';
import { Navigation } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import SwiperCard from './SwiperCard';

const SwiperWrapper: React.FC<{ data: any[] }> = ({ data }) => {
  console.log(data);
  return (
    <Swiper
      modules={[Navigation]}
      navigation={true}
      spaceBetween={30}
      breakpoints={{
        // when window width is >= 768px
        425: {
          width: 425,
          slidesPerView: 1.5,
        },
        768: {
          width: 768,
          slidesPerView: 1.7,
        },
        1024: {
          width: 1024,
          slidesPerView: 2.1,
        },
      }}
      slidesPerView={1.2}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data.map((_, index) => {
        return (
          <SwiperSlide
            key={index}
            className='select-none bg-white shadow-lg rounded-lg p-3 items-center !flex flex-col md:flex-row !justify-center md:justify-start gap-2 cursor-grab'
          >
            <SwiperCard />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SwiperWrapper;
