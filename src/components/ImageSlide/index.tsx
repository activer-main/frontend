import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Swiper as SwiperType, Pagination, Navigation } from 'swiper';
import 'swiper/css/pagination';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './index.scss';
import { IconButton } from '@mui/material';

interface DetailImagesType {
  images?: string[] | null;
  altText: string
}

function DetailImage({ images, altText }: DetailImagesType) {
  const swiperRef = React.useRef<SwiperType>();
  const imgErrorHandler:React.ReactEventHandler<HTMLImageElement> = ({ currentTarget }) => {
    /* eslint-disable no-param-reassign */
    currentTarget.onerror = null; // prevents looping
    currentTarget.src = '/DefaultActivityImage.svg';
    /* eslint-enable no-param-reassign */
  };
  return (
    <div className="image-slide">
      {
        images ? (
          <Swiper
            loop
            modules={[Pagination, Navigation]}
            pagination={{
              clickable: true,
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {images.map((image) => (
              <SwiperSlide key={`slide-${image}`}>
                <img
                  className="image-slide__background"
                  src={encodeURI(image)}
                  onError={imgErrorHandler}
                  alt={altText}
                />
                <img
                  className="image-slide__content"
                  src={encodeURI(image)}
                  onError={imgErrorHandler}
                  alt={altText}
                />

              </SwiperSlide>
            ))}

            <IconButton
              className="swiper__navigation swiper__navigation__prev"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton
              className="swiper__navigation swiper__navigation__next"
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <KeyboardArrowRightIcon />
            </IconButton>

          </Swiper>
        ) : (
          <>
            <img className="image-slide__content" src="/DefaultActivityImage.svg" alt={altText} />
            <img className="image-slide__background" src="/DefaultActivityImage.svg" alt={altText} />
          </>
        )

      }
    </div>
  );
}

export default DetailImage;
