import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Swiper as SwiperType, Pagination, Navigation } from 'swiper';
import 'swiper/css/pagination';
import './index.scss';
import Button from 'components/Button';

interface DetailImagesType {
  images: string[] | null;
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

            <Button
              className="swiper__navigation swiper__navigation__prev"
              color="white"
              variant={{ round: true }}
              text="<"
              onClick={() => swiperRef.current?.slidePrev()}
            />
            <Button
              className="swiper__navigation swiper__navigation__next"
              color="white"
              variant={{ round: true }}
              text=">"
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
            />

          </Swiper>
        ) : <img src="/DefaultActivityImage.svg" alt={altText} />

      }
    </div>
  );
}

export default DetailImage;
