import React from 'react';
import Card from 'components/Card';
import { ActivityDataType } from 'types/data';
import { parseArrayTagDataToTag } from 'utils/parseArrayTagDatatoTag';
import MainCardControl from '../MainCardContorl';
import './index.scss';

function MainCard({
  id, tags, title, images, branches, trend,
} : ActivityDataType) {
  return (
    <Card
      className="main-card"
      id={id.toString()}
      key={id.toString()}
      tags={tags ? parseArrayTagDataToTag(tags) : undefined}
      title={title}
      imgUrl={images ? images[0] : '/DefaultActivityImage.svg'}
      altText={title}
      detail={(
        <div className="main-card__detail">
          <ul>
            {
              branches.map(({ dateStart }) => (
                <li>
                  {dateStart
                    ? `${Object.keys(dateStart)[0]}: ${Object.values(dateStart)[0]}`
                    : '活動日期請看活動原始連結'}
                </li>
              ))
            }
          </ul>
        </div>
      )}
      control={<MainCardControl trend={trend} />}
    />

  );
}

export default MainCard;
