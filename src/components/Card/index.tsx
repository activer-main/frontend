// components/Card/Default
import React from 'react';
import Tag, { TagType } from 'components/Tag';
import './index.scss';

export interface CardType {
  id: string;
  imgUrl: string,
  title: string,
  altText: string,
  tags?: TagType[],
  detail?: string | null,
  control? : React.ReactNode;
}

function Card({
  id, imgUrl, title, tags, altText, detail, control,
}: CardType) {
  return (
    <div className="card">
      <div className="card__container">
        <div className="card__image">
          <img src={encodeURI(imgUrl)} alt={altText} />
        </div>
        <div className="card__content">
          {/* title */}
          <div className="card__title">{title}</div>

          {/* detail */}
          <div className="card__detail">
            {detail}
          </div>

          {/* tags */}
          <div className="card__tags">
            {tags
              && tags.map((tag) => (
                <Tag
                  key={`${id}-${tag.id}`}
                  type={tag.type}
                  text={tag.text}
                  icon={tag.icon}
                  id={`${id}-${tag.id}`}
                  link
                />
              ))}
          </div>

          {/* Contorls */}
          {control && <div className="card__control">{control}</div>}
        </div>
      </div>
    </div>

  );
}

export default Card;
