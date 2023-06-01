import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {
  Box, Skeleton,
} from '@mui/material';
import './index.scss';
import { Pagination, Navigation } from 'swiper';

import { Link } from 'react-router-dom';
import { useGetActivitiesQuery } from 'store/activity/activityService';
import { orderByUnion, sortByUnion } from 'types/request';
import _ from 'lodash';

export default function HeroSwiper() {
  const { data: trendData } = useGetActivitiesQuery({
    sortBy: sortByUnion.TREND,
    orderBy: orderByUnion.DESC,
    countPerPage: 10,
  });

  return (
    <Box className="hero-swiper" sx={{ height: 'fit-content' }}>
      <Swiper
        slidesPerView="auto"
        autoplay={{ delay: 6000 }}
        breakpoints={{
          768: {
            spaceBetween: 16,
          },
          992: {
            spaceBetween: 24,
          },
        }}
        centeredSlides
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        loop
        navigation
        modules={[Pagination, Navigation]}
      >
        {trendData
          ? trendData.searchData?.map((data) => (
            <SwiperSlide style={{ width: 798, marginRight: 16 }} key={`slide-${data.id}`}>
              <Link to={`/detail/${data.id}`}>
                <Box sx={{
                  position: 'relative', width: 798, overflow: 'hidden', borderRadius: '1.5em',
                }}
                >
                  <img style={{ objectFit: 'cover' }} src={data.images ? data.images[0] : '/DefaultActivityImage.svg'} alt={data.title} />
                </Box>
              </Link>
            </SwiperSlide>
          ))
          : _.times(3, (index) => (
            <SwiperSlide>
              <Box sx={{
                position: 'relative', width: 798, overflow: 'hidden', borderRadius: '1.5em',
              }}
              >
                <Skeleton sx={{ width: 798, height: 400, marginRight: 16 }} key={`slide-skeleton-${index}`} />
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
}
