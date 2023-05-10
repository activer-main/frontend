import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType, Pagination, Navigation } from 'swiper';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ActivityDataType } from 'types/data';
import { MainCard } from 'components/Card';
import { IconButton } from '@mui/material';

import 'swiper/css';
import 'swiper/css/pagination';

interface CardSlideType {
  data: ActivityDataType[]
}

function CardSlide({ data }: CardSlideType) {
  const swiperRef = React.useRef<SwiperType>();

  return (
    <Swiper
      loop
      slidesPerView={1}
      spaceBetween={20}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Navigation]}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
      style={{ paddingBottom: 50 }}
    >
      {
        data.map((activity) => (
          <SwiperSlide>
            <MainCard {...activity} />
          </SwiperSlide>
        ))
      }
      <IconButton
        onClick={() => swiperRef.current?.slidePrev()}
        sx={{
          position: 'absolute',
          top: '45%',
          zIndex: 1,
          fontSize: '0.6em',
          left: '1em',
        }}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      <IconButton
        sx={{
          position: 'absolute',
          top: '45%',
          zIndex: 1,
          fontSize: '0.6em',
          right: '1em',
        }}
        type="button"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </Swiper>

  );
}

export default CardSlide;
