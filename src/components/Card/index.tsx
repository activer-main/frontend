// components/Card/Default
import React, { useState, useEffect } from 'react';
import Tag, { TagType } from 'components/Tag';
import './index.scss';
import useWindowWidth from 'hooks/useWindowWidth';

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
  const [showTags, setShowTags] = useState(tags);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth > 768) {
      setShowTags(tags?.slice(0, 5));
    } else {
      setShowTags(tags?.slice(0, 2));
    }
  }, [windowWidth]);

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
            {showTags
              && showTags.map((tag) => (
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
