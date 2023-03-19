import Button from 'components/Button';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { homeLoaderType } from 'types/loader';
import './index.scss';
import Card from 'components/Card';
import MainCardControl from 'components/Card/MainCardContorl';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { FcBookmark, FcFlashOn } from 'react-icons/fc';
import { parseArrayTagDataToTag } from 'utils/parseArrayTagDatatoTag';
import Hero from './Hero';

function Home() {
  const loaderData = useLoaderData() as homeLoaderType;

  return (
    <div className="home">
      {/* hero */}
      <Hero />

      {/* Trend activity */}
      <section className="trend-activity">
        <div className="home__title">
          <h2>
            <FcBookmark />
            熱門活動
          </h2>
          <Button text="更多熱門活動" color="white" iconAfter={<AiOutlineArrowRight />} />
        </div>
        <div className="home__cards">
          {
            loaderData.trendActivityResData.searchResultData.map((activity) => (
              <Card
                id={activity.id.toString()}
                key={activity.id.toString()}
                tags={activity.tags ? parseArrayTagDataToTag(activity.tags) : undefined}
                title={activity.title}
                imgUrl={activity.images ? activity.images[0] : '/DefaultActivityImage.svg'}
                altText="test"
                detail={activity.subTitle}
                control={<MainCardControl trend={activity.trend} />}
              />
            ))
          }
        </div>
      </section>

      <section className="newest-activity">
        {/* Newest activity */}
        <div className="home__title">
          <h2>
            <FcFlashOn />
            最新活動
          </h2>
          <Button text="更多最新活動" color="transparent" iconAfter={<AiOutlineArrowRight />} />

        </div>
        <div className="home__cards">
          {
            loaderData.newestActivityResData.searchResultData.map((activity) => (
              <Card
                id={activity.id.toString()}
                key={activity.id.toString()}
                tags={activity.tags ? parseArrayTagDataToTag(activity.tags) : undefined}
                title={activity.title}
                imgUrl={activity.images ? activity.images[0] : '/DefaultActivityImage.svg'}
                altText="test"
                detail={activity.subTitle}
                control={<MainCardControl trend={activity.trend} />}
              />
            ))
          }
        </div>
      </section>

    </div>
  );
}

export default Home;
