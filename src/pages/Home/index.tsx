import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { homeLoaderType } from 'types/loader';
import './index.scss';
import Card from 'components/Card';
import MainCardControl from 'components/Card/MainCardContorl';

// import { parseArrayTagDataToTag } from 'utils/parseArrayTagDatatoTag';

function Home() {
  const loaderData = useLoaderData() as homeLoaderType;

  return (
    <div className="home">
      <h1>Home</h1>
      <div className="home__cards">
        {
          loaderData.trendActivityResData.searchResultData.map((activity) => (
            <Card
              id="2"
              key={activity.id.toString()}
              // id={activity.id.toString()}
              tags={[{ id: '1', text: 'test', type: 'area' }, { id: '10', text: 'test', type: 'area' }]}
              title={activity.title}
              imgUrl={activity.images ? activity.images[0] : '/DefaultActivityImage.svg'}
              altText="test"
              detail={activity.subTitle}
              control={<MainCardControl trend={20} />}

            />
          ))
        }

      </div>
    </div>
  );
}

export default Home;
